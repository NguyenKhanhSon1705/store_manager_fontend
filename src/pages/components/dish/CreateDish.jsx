import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Tag,
} from "antd";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { FiDelete } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";

import dishAction from "../../../store/actions/dishAction";
import { getAllNameMenuGroup } from "../../../store/actions/menuGroupAction";
import images from "../../../assets/images";
import { validatePriceVND } from "~/utils/validatePriceVND";
import dishService from "~/services/dishService";
const { Option } = Select;

const { confirm } = Modal;
function CreateDish({ items }) {
  const { data } = useSelector((state) => state.menuGroup);
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [priceDish, setPriceDish] = useState(null);

  const [selectedImage, setSelectedImage] = useState(images.img_default);
  const [valueInput, setValueInput] = useState({
    id: null,
    Dish_Name: null,
    Unit_Name: null,
    Origin_Price: null,
    Selling_Price: null,
    Order: null,
    Status: null,
    Is_Hot: null,
    Image_C: null,
    arr_Menu_Group_Id: [],
  });
  const isUpdate = options && Object?.keys(options)?.length !== 0;
  const dispatch = useDispatch();

  useEffect(() => {
    if (items) {
      setOptions(items.list_price);
      setPriceDish(null);
      setSelectedImage(items.image || images.img_default);
      setValueInput((prev) => ({ ...prev, id: items.id, Image_C: null }));

      form.setFieldsValue({
        ...items,
        arr_Menu_Group_Id:
          items.arr_Menu_Group &&
          items.arr_Menu_Group.map((item) => ({
            label: item.name,
            value: item.id,
          })),
      });
    }
  }, [form, items]);

  const handleGetValueMenuGroup = () => {
    dispatch(getAllNameMenuGroup());
  };
  // Liên quan đến upload ảnh

  const handleSubmitCreate = () => {
    if (isUpdate) {
      confirm({
        title: "Cập nhật món ăn",
        content: "Bạn có chắc muốn cập nhật món ăn?",
        onOk: () => {
          valueInput.Selling_Price = priceDish;
          console.log(valueInput);
          
          dispatch(dishAction.updateDish(valueInput));
        },
      });
    } else {
      confirm({
        title: "Thêm món ăn",
        content: "Bạn có chắc muốn thêm món ăn?",
        onOk: () => {
          dispatch(dishAction.createDish(valueInput));
        },
      });
    }
  };
  const handleChooseImage = () => {
    fileInputRef.current.click();
  };
  const formatter = (value) => {
    if (!value) return value;
    // Thêm dấu phân cách hàng nghìn
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Hàm phân tích số khi nhập vào (xóa dấu phân cách)
  const parser = (value) => {
    return value.replace(/\$\s?|(,*)/g, "");
  };

  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValueInput((prev) => ({ ...prev, Image_C: file }));
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCleanForm = () => {
    form.resetFields();
    setValueInput({})
    setOptions({});
    setSelectedImage(images.img_default);
  };
  const handleSelectChange = (value) => {
    setPriceDish(value);
  };

  const handleAddPrice = () => {
    if (inputValue) {
      confirm({
        title: "Thêm giá mới",
        content: "Bạn có chắc muốn thêm giá mới?",
        onOk: async () => {
          const payload = {
            dish_id: valueInput.id,
            new_price: inputValue,
          };
          const res = await dishService.apiAddPriceDish(payload);
          if (res.isSuccess) {
            const newPrice = {
              selling_price: inputValue,
              status: false,
            };
            setOptions([...options, newPrice]);
            setInputValue("");
          }
        },
      });
    }
  };
  const handleDeletePrice = (e, item) => {
    e.stopPropagation();
    confirm({
      title: "Xóa giá",
      content: "Bạn có chắc muốn xóa giá này?",
      onOk: async () => {
        try {
          const res = await dishService.apiDeletePriceDish(item.price_id); // Đợi kết quả từ API
          if (res.isSuccess) {
            setOptions((prevOptions) =>
              prevOptions.filter((price) => price.price_id !== item.price_id)
            );
            console.log("Xóa giá thành công", res);
          } else {
            console.error(
              "Xóa giá thất bại",
              res.message || "Lỗi không xác định"
            );
          }
        } catch (error) {
          console.error("Đã xảy ra lỗi khi xóa giá:", error);
        }
      },
    });
  };
  return (
    <Form
      form={form}
      onFinish={handleSubmitCreate}
      onFinishFailed={() => toast.error("Vui lòng nhập đầy đủ thông tin")}
      className="border p-2 rounded-md mb-2"
    >
      <div className="grid grid-cols-4 grid-rows-4 gap-6 mb-10">
        <div className="row-span-4 flex items-center  justify-center flex-col">
          <Image
            width={250}
            height={180}
            objectfit="cover"
            className="rounded-lg"
            src={selectedImage || images.img_default}
            alt="..."
          />
          <button
            type="button"
            onClick={handleChooseImage}
            className="mt-2 p-1 bg-[var(--primary)] text-white rounded text-[15px]"
          >
            Chọn ảnh
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="col-span-3">
          <Form.Item
            name="arr_Menu_Group_Id"
            rules={[
              {
                required: true,
                message: "Yêu cầu chọn nhóm món ăn!",
              },
            ]}
          >
            <Select
              onFocus={handleGetValueMenuGroup}
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Yêu cầu chọn nhóm món ăn"
              onChange={(value) =>
                setValueInput((prev) => ({ ...prev, arr_Menu_Group_Id: value }))
              }
              options={
                Array.isArray(data) && data.length > 0
                  ? data.map((item) => ({ label: item?.name, value: item?.id }))
                  : []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </div>
        <div className="col-span-3 col-start-2 row-start-2">
          <Form.Item
            label="Tên món ăn"
            name="dish_Name"
            layout="vertical"
            rules={[
              {
                required: true,
                message: "Yêu cầu nhập Tên món ăn!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setValueInput((prev) => ({
                  ...prev,
                  Dish_Name: e.target.value,
                }))
              }
            />
          </Form.Item>
        </div>
        <div className="col-start-2 row-start-3">
          <Form.Item
            label="Đơn vị"
            name="unit_Name"
            layout="vertical"
            rules={[
              {
                required: true,
                message: "Yêu cầu nhâp đơn vị!",
              },
            ]}
          >
            <Input
              value={valueInput.Unit_Name}
              onChange={(e) =>
                setValueInput((prev) => ({
                  ...prev,
                  Unit_Name: e.target.value,
                }))
              }
            />
          </Form.Item>
        </div>
        <div className="col-start-3 row-start-3">
          {isUpdate ? (
            <Form.Item
              label="Giá bán"
              // name="selling_Price"
              layout="vertical"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá bán!",
                },
              ]}
            >
              <Select
                placeholder="Chọn giá hoặc nhập mới"
                onChange={handleSelectChange}
                value={
                  priceDish ||
                  items.list_price.find((price) => price.status === true)
                    ?.selling_price ||
                  null
                }
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                      }}
                    >
                      <InputNumber
                        style={{ flex: 1 }}
                        value={inputValue}
                        placeholder="Nhập giá mới"
                        formatter={formatter} // Áp dụng formatter để hiển thị dấu phân cách
                        parser={parser} // Xóa dấu phân cách khi nhập
                        min={0} // Giá trị tối thiểu là 0
                        step={1000} // Bước nhảy 1000 mỗi lần
                        precision={0} // Làm tròn giá trị
                        onChange={(e) => setInputValue(e)}
                      />
                      <a
                        style={{ flexShrink: 0, marginLeft: 8 }}
                        onClick={handleAddPrice}
                      >
                        + Thêm
                      </a>
                    </div>
                  </>
                )}
              >
                {Array.isArray(options) &&
                  options.map((price) => (
                    <Option key={price.price_id} value={price.selling_price}>
                      <div className="flex justify-between">
                        <span>
                          {validatePriceVND("" + price.selling_price)} đ {""}
                          {price.status && <Tag color="green">Hiện tại</Tag>}
                        </span>
                        {!price.status && (
                          <Tag
                            onClick={(e) => handleDeletePrice(e, price)}
                            color="red"
                          >
                            Xóa giá
                          </Tag>
                        )}
                      </div>
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              label="Giá bán"
              name="selling_Price"
              layout="vertical"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá bán!",
                },
              ]}
            >
              <InputNumber
                value={valueInput}
                onChange={(value) =>
                  setValueInput((prev) => ({
                    ...prev,
                    Selling_Price: value,
                  }))
                }
                style={{ width: "100%" }}
                formatter={formatter} // Áp dụng formatter để hiển thị dấu phân cách
                parser={parser} // Xóa dấu phân cách khi nhập
                min={0} // Giá trị tối thiểu là 0
                step={1000} // Bước nhảy 1000 mỗi lần
                precision={0} // Làm tròn giá trị
              />
            </Form.Item>
          )}
        </div>
        <div className="col-start-4 row-start-3">
          <Form.Item label="Giá gốc" name="origin_Price" layout="vertical">
            <InputNumber
              value={valueInput}
              onChange={(value) =>
                setValueInput((prev) => ({
                  ...prev,
                  Origin_Price: value,
                }))
              }
              style={{ width: "100%" }}
              formatter={formatter}
              parser={parser}
              min={0}
              step={1000}
              precision={0}
            />
          </Form.Item>
        </div>
        <div className="col-start-2 row-start-4">
          <Form.Item label="Thứ tự hiển thị" name="order" layout="vertical">
            <InputNumber
              value={valueInput}
              onChange={(value) =>
                setValueInput((prev) => ({
                  ...prev,
                  Order: value,
                }))
              }
              style={{ width: "100%" }}
              min={0}
              precision={0}
            />
          </Form.Item>
        </div>
        <div className="col-start-3 row-start-4 flex items-end">
          <Form.Item
            label="Thứ tự hiển thị"
            layout="vertical"
            name="status"
            valuePropName="checked"
          >
            <Checkbox
              // checked={items ?? items.status}
              onChange={(e) =>
                setValueInput((prev) => ({
                  ...prev,
                  Status: e.target.checked,
                }))
              }
            >
              Hiển thị
            </Checkbox>
          </Form.Item>
        </div>
        <div className="col-start-4 row-start-4 flex items-end">
          <Form.Item
            label="Sản phẩm bán chạy"
            name="is_Hot"
            layout="vertical"
            valuePropName="checked"
          >
            <Checkbox
              checked={false}
              onChange={(e) =>
                setValueInput((prev) => ({
                  ...prev,
                  Status: e.target.checked,
                }))
              }
            >
              Sản phẩm bán chạy
            </Checkbox>
          </Form.Item>
        </div>
      </div>
      <Form.Item className="flex justify-end mr-4 ">
        <Button
          className="p-4 bg-[var(--bg-btn-delete)] text-[var(--textlight)] mr-10"
          onClick={handleCleanForm}
        >
          <FiDelete />
        </Button>
        <Button
          className="p-4 bg-[var(--primary)] text-[var(--textlight)]"
          htmlType="submit"
        >
          <MdAddCircleOutline />
          {isUpdate ? "Cập nhật" : "Thêm món ăn"}
        </Button>
      </Form.Item>
    </Form>
  );
}

CreateDish.propTypes = {
  items: PropTypes.object,
};
export default memo(CreateDish);
