import { memo, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Upload,
  Button,
  message,
  Space,
  Tag,
  Divider,
  Typography
} from "antd";
import { PlusOutlined, LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getAllNameMenuGroup } from "../../../store/actions/menuGroupAction";
import dishAction from "../../../store/actions/dishAction";
import dishService from "~/services/dishService";
import images from "../../../assets/images";
import { validatePriceVND } from "~/utils/validatePriceVND";

const { Option } = Select;
const { Text, Title } = Typography;

function CreateDish({ open, onCancel, item }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data: menuGroups } = useSelector((state) => state.menuGroup);

  const [imageUrl, setImageUrl] = useState(images.img_default);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceOptions, setPriceOptions] = useState([]);

  // Fetch menu groups on mount
  useEffect(() => {
    dispatch(getAllNameMenuGroup());
  }, [dispatch]);

  // Reset/Populate form when modal opens or item changes
  useEffect(() => {
    if (open) {
      if (item) {
        // Edit Mode
        form.setFieldsValue({
          ...item,
          dish_Name: item.dish_Name,
          unit_Name: item.unit_Name,
          origin_Price: item.origin_Price,
          order: item.order,
          status: item.status,
          is_Hot: item.is_Hot,
          arr_Menu_Group_Id: item.arr_Menu_Group?.map(g => g.id),
          // Set initial selling price to the active one
          selling_Price: item.list_price?.find(p => p.status)?.selling_price || item.list_price?.[0]?.selling_price
        });
        setImageUrl(item.image || images.img_default);
        setPriceOptions(item.list_price || []);
      } else {
        // Create Mode
        form.resetFields();
        setImageUrl(images.img_default);
        setPriceOptions([]);

        // Set default values
        form.setFieldsValue({
          status: true,
          is_Hot: false,
          order: 1
        });
      }
      setFileList([]);
    }
  }, [open, item, form]);

  // --- Image Upload Handlers ---
  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      setImageUrl(item?.image || images.img_default);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Hình ảnh phải nhỏ hơn 2MB!');
    }
    return false; // Prevent auto upload
  };

  // --- Price Handlers ---
  const handleAddPrice = (newItem) => {
    // In a real scenario, adding a price might require an API call if editing, 
    // or just local state manipulation if creating. 
    // Based on original code, it calls API immediately.
    // We will keep it simple for now or follow the pattern.
    // Original code: await dishService.apiAddPriceDish(payload);
  };

  // Custom dropdown for Price Select to allow adding new prices
  const [newPriceInput, setNewPriceInput] = useState("");
  const addItem = async (e) => {
    e.preventDefault();
    if (!newPriceInput) return;

    // Only call API if we are in Edit mode (have an ID)
    if (item?.id) {
      try {
        const payload = { dish_id: item.id, new_price: newPriceInput };
        const res = await dishService.apiAddPriceDish(payload);
        if (res.isSuccess) {
          const newPriceObj = { selling_price: parseInt(newPriceInput), status: false, price_id: Date.now() }; // Mock ID if API doesn't return one immediately or refresh
          // Ideally we should refresh the item data, but let's update local state
          setPriceOptions([...priceOptions, newPriceObj]);
          setNewPriceInput("");
          message.success("Thêm giá thành công!");
        }
      } catch (error) {
        message.error("Lỗi thêm giá");
      }
    } else {
      // Create mode: just add to options, logic might be different for backend
      // For now, let's assume create mode only takes one price from the main input
      message.info("Vui lòng tạo món ăn trước khi thêm nhiều mức giá");
    }
  };

  const handleDeletePrice = async (e, priceItem) => {
    e.stopPropagation();
    if (item?.id) {
      try {
        const res = await dishService.apiDeletePriceDish(priceItem.price_id);
        if (res.isSuccess) {
          setPriceOptions(prev => prev.filter(p => p.price_id !== priceItem.price_id));
          message.success("Xóa giá thành công");
        }
      } catch (err) {
        message.error("Lỗi xóa giá");
      }
    }
  }

  // --- Submit Handler ---
  const onFinish = (values) => {
    const submitData = {
      ...values,
      id: item?.id,
      Image_C: fileList.length > 0 ? fileList[0].originFileObj : undefined,
      // Map fields to match API expectations if they differ from Form names
      // Original: Dish_Name, Unit_Name, etc.
      // It seems the action expects PascalCase or specific keys.
      Dish_Name: values.dish_Name,
      Unit_Name: values.unit_Name,
      Origin_Price: values.origin_Price,
      Selling_Price: values.selling_Price,
      Order: values.order,
      Status: values.status,
      Is_Hot: values.is_Hot,
      arr_Menu_Group_Id: values.arr_Menu_Group_Id
    };

    if (item?.id) {
      dispatch(dishAction.updateDish(submitData));
    } else {
      dispatch(dishAction.createDish(submitData));
    }
    onCancel();
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải ảnh</div>
    </div>
  );

  return (
    <Modal
      title={<Title level={4} style={{ margin: 0 }}>{item ? "Cập nhật món ăn" : "Thêm món ăn mới"}</Title>}
      open={open}
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel} size="large">Hủy</Button>,
        <Button key="submit" type="primary" size="large" onClick={form.submit} className="bg-orange-600 hover:bg-orange-500 border-none shadow-orange-200 shadow-md">
          {item ? "Cập nhật" : "Thêm mới"}
        </Button>
      ]}
      style={{ top: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-4"
      >
        <div className="flex gap-6">
          {/* Left Column: Image Upload */}
          <div className="flex flex-col items-center w-48 shrink-0">
            <div className="mb-2 font-medium text-gray-700">Hình ảnh món</div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
              fileList={fileList}
            >
              {imageUrl && imageUrl !== images.img_default ? (
                <div className="relative w-full h-full group rounded-lg overflow-hidden">
                  <img src={imageUrl} alt="dish" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    Thay đổi
                  </div>
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
            {imageUrl && imageUrl !== images.img_default && (
              <Button type="text" danger size="small" icon={<DeleteOutlined />} onClick={(e) => {
                e.stopPropagation();
                setImageUrl(images.img_default);
                setFileList([]);
              }}>Xóa ảnh</Button>
            )}
          </div>

          {/* Right Column: Inputs */}
          <div className="flex-1">
            <Form.Item
              name="dish_Name"
              label="kên món ăn"
              rules={[{ required: true, message: 'Vui lòng nhập tên món!' }]}
            >
              <Input size="large" placeholder="Ví dụ: Cơm gà xối mỡ" />
            </Form.Item>

            <Form.Item
              name="arr_Menu_Group_Id"
              label="Nhóm thực đơn"
              rules={[{ required: true, message: 'Vui lòng chọn nhóm thực đơn!' }]}
            >
              <Select
                mode="multiple"
                size="large"
                placeholder="Chọn nhóm món..."
                options={menuGroups?.map(g => ({ label: g.name, value: g.id }))}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="selling_Price"
                label="Giá bán"
                rules={[{ required: true, message: 'Nhập giá bán!' }]}
              >
                {/* If updating, show Select to manage multiple prices, if creating, simple InputNumber */}
                {item ? (
                  <Select
                    placeholder="Chọn hoặc nhập giá"
                    size="large"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                          <InputNumber
                            placeholder="Thêm giá"
                            value={newPriceInput}
                            onChange={setNewPriceInput}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: 120 }}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addItem}>Thêm</Button>
                        </Space>
                      </>
                    )}
                  >
                    {priceOptions.map(price => (
                      <Option key={price.price_id || price.selling_price} value={price.selling_price}>
                        <div className="flex justify-between items-center w-full">
                          <span>{validatePriceVND(String(price.selling_price))} đ {price.status && <Tag color="green" className="ml-2">Hiện tại</Tag>}</span>
                          {!price.status && (
                            <DeleteOutlined
                              className="text-red-400 hover:text-red-600"
                              onClick={(e) => handleDeletePrice(e, price)}
                            />
                          )}
                        </div>
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <InputNumber
                    className="w-full"
                    size="large"
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    min={0}
                    placeholder="0"
                  />
                )}
              </Form.Item>

              <Form.Item
                name="origin_Price"
                label="Giá gốc"
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  min={0}
                  placeholder="0"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="unit_Name" label="Đơn vị tính" rules={[{ required: true, message: 'Nhập đơn vị!' }]}>
                <Input size="large" placeholder="Ví dụ: Đĩa, Tô, Phần" />
              </Form.Item>
              <Form.Item name="order" label="Thứ tự hiển thị">
                <InputNumber className="w-full" size="large" min={1} />
              </Form.Item>
            </div>

            <div className="flex gap-8 mt-2">
              <Form.Item name="status" valuePropName="checked" noStyle>
                <Checkbox>Đang kinh doanh</Checkbox>
              </Form.Item>
              <Form.Item name="is_Hot" valuePropName="checked" noStyle>
                <Checkbox><span className="text-orange-500 font-medium">🔥 Món Bán chạy (Hot)</span></Checkbox>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

CreateDish.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  item: PropTypes.object
};

export default memo(CreateDish);

