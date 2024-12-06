/* eslint-disable react/prop-types */
import Dish from "../components/order/Dish";
import Breadcrumb from "~/components/helper/Breadcrumb";
import routes from "../../routes/routesPath";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaArrowsTurnRight } from "react-icons/fa6";
import { FaOpenid } from "react-icons/fa6";

import { toast } from "react-toastify";
import formatTime from "../../utils/functions/formatTime";
import getInfoToken from "../../utils/functions/getInfoToken";
import { validatePriceVND } from "../../utils/validatePriceVND";
import { useDispatch, useSelector } from "react-redux";
import orderAction from "../../store/actions/orderAction";
import images from "../../assets/images";
import TextArea from "antd/es/input/TextArea";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";
import TablesByArea from "./TablesByArea";
const EditableCell = ({
  editing,
  dataIndex,
  // title,
  inputType,
  // record,
  // index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber min={1} max={50} />
    ) : (
      <TextArea rows={6} placeholder="Ghi chú" />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: inputType !== "text",
              message: ``,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const mergeData = (data1, data2) => {
  const result = [...data1];
  data2.forEach((item2) => {
    const existingItem = result.find((item1) => item1.key === item2.key);
    if (existingItem) {
      existingItem.quantity = existingItem.quantity
        ? parseInt(existingItem.quantity) + 1
        : 1;
    } else {
      result.push({ ...item2, quantity: "1" });
    }
  });
  return result;
};

const calculateTotal = (data) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  Array.isArray(data) &&
    data.forEach((item) => {
      const quantity = parseInt(item.quantity) || 0;
      const price =
        parseFloat(item.selling_Price.replace(/\./g, "").replace("đ", "")) || 0;
      totalQuantity += quantity;
      totalPrice += quantity * price;
    });

  return { totalQuantity, totalPrice };
};

const { confirm } = Modal;
function ChooseDishForTable() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const { table } = location.state || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalChoose, setOpenModalChoose] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [totalPayment, setTotalPayment] = useState({});

  const { currDish, loading, update } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(orderAction.getInfoDishCurrentTable(table.id));
  }, [dispatch, table.id]);

  useEffect(() => {
    const transformedArray2 =
      Array.isArray(currDish?.dish) &&
      currDish.dish.map((item) => ({
        key: item.id,
        dish_Name: item.dish_Name,
        image: {
          props: {
            width: 60,
            height: 60,
            src: item.image,
          },
        },
        selling_Price: validatePriceVND("" + item.selling_Price),
        quantity: item.quantity,
        notes: item.notes,
      }));

    setTotalPayment(calculateTotal(transformedArray2));
    setData(transformedArray2);
  }, [currDish]);

  const isEditing = (record) => record.key === editingKey;
  const handleOk = (items) => {
    const newData = mergeData(data, items);
    setTotalPayment(calculateTotal(newData));
    setData(newData);
    setOpenModal(false);
  };

  const edit = (record) => {
    form.setFieldsValue({
      price: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      setTotalPayment(calculateTotal(newData));
      toast.success("Cập nhật thành công");
    } catch {
      toast.error("Yêu cầu nhập số lượng");
    }
  };
  const deleteRecord = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setTotalPayment(calculateTotal(newData));

    setData(newData);
  };
  const columns = [
    {
      title: "Tên món",
      dataIndex: "dish_Name",
      width: "25%",
      editable: false,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      width: "10%",
      editable: false,

      render: (image) => (
        <div className="w-full h-full flex">
          <Image
            className="rounded-md"
            src={image.props.src}
            alt="Dish"
            width={80}
            height={60}
            fallback={images.img_default}
          />
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "selling_Price",
      width: "10%",
      editable: false,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
      editable: true,
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      width: "25%",
      editable: true,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      width: "5%",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div className="flex items-center justify-center space-x-4">
            {editable ? (
              <>
                <Popconfirm
                  okText={"Đồng ý"}
                  cancelText={"Hủy"}
                  title="Chắc chắn Lưu?"
                  onConfirm={() => save(record.key)}
                >
                  <a className="p-1 border rounded-md text-green-500 hover:underline">
                    <FaCheck />
                  </a>
                </Popconfirm>
                <a
                  onClick={cancel}
                  className="text-red-500 hover:text-red-500 p-1 border rounded-md"
                >
                  <IoCloseCircleOutline />
                </a>
              </>
            ) : (
              <a
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                className="text-[var(--primary)] text-xl hover:underline p-2 border rounded-sm"
              >
                <FaRegEdit />
              </a>
            )}

            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => deleteRecord(record.key)}
            >
              <a className="text-red-500 text-xl p-2 hover:text-red-700 border rounded-sm">
                <MdOutlineDeleteSweep />
              </a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "quantity" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handlePayment = () => {
    confirm({
      title: "Bạn chắc chắn thanh toán không?",
      okText: "Thanh toán",
      okType: "primary",
      cancelText: "Hủy",
      centered: true,
      onOk() {
        // dispatch(changeTable(item))
      },
    });
  };
  const handleUpdate = () => {
    confirm({
      title: "Bạn chắc chắn cập nhật món ăn không?",
      okText: "cập nhật",
      okType: "primary",
      cancelText: "Hủy",
      centered: true,
      onOk() {
        const payload = {
          tableId: currDish?.id,
          listDishId: data.map((item) => {
            return {
              key: item.key,
              quantity: +item.quantity,
              notes: item.notes || "",
              selling_Price:
                parseFloat(
                  item.selling_Price.replace(/\./g, "").replace("đ", "")
                ) || 0,
            };
          }),
        };
        if (payload.listDishId.length <= 0 && !currDish.hasHourlyRate) {
          toast.warning("Không được mở bàn trống");
          return;
        }
        dispatch(orderAction.updateTable(payload));
      },
    });
  };
  const handleOpenTable = () => {
    confirm({
      title: "Bạn muốn mở bàn này chứ ?",
      okText: "Mở ngay",
      okType: "primary",
      cancelText: "Hủy",
      centered: true,
      onOk() {
        const payload = {
          tableId: table.id,
          listDishId: data.map((item) => {
            return {
              key: item.key,
              quantity: +item.quantity,
              notes: item.notes || "",
              selling_Price:
                parseFloat(
                  item.selling_Price.replace(/\./g, "").replace("đ", "")
                ) || 0,
            };
          }),
        };
        if (payload.listDishId.length <= 0 && !currDish.hasHourlyRate) {
          toast.warning("Không được mở bàn trống");
          return;
        }
        dispatch(orderAction.openTable(payload));
      },
    });
  };
  const handleChangeTable = () => {
    setOpenModalChoose(true);
    // confirm({
    //   title: "Bạn chắc chắn chuyển bàn này không?",
    //   okText: "Chuyển",
    //   okType: "primary",
    //   cancelText: "Hủy",
    //   centered: true,
    //   onOk() {
    //     // dispatch(changeTable(item))
    //   },
    // });
  };

  const handleOks = () => {
    if (!reason) {
      Modal.warning({
        title: "Lý do không được để trống",
      });
      return;
    }
    confirm({
      title: "Bạn chắc chắn hủy bàn này không ?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Không",
      centered: true,
      onOk() {
        setIsModalVisible(false);
        setReason("");
        const payload = {
          table_Id: currDish.id,
          reason_abort: reason,
          total_money: totalPayment.totalPrice,
          total_quantity: totalPayment.totalQuantity,
        };
        dispatch(orderAction.abortedTable(payload));
      },
    });
  };
  const handlecancel = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setReason("");
  };
  return (
    <div>
      {update && <LoadingSyncLoader />}
      <Modal
      open={openModalChoose}
       width="75%"
       onCancel={() => setOpenModalChoose(false)}
       footer={null}

      >
        <TablesByArea />
      </Modal>
      
      <Modal
        title="Lý do hủy bàn"
        open={isModalVisible}
        onOk={handleOks}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
        centered
      >
        <Input.TextArea
          placeholder="Nhập lý do hủy bàn"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
        />
      </Modal>
      <Modal
        width="75%"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <Dish onSubmit={(data) => handleOk(data)} />
      </Modal>

      <Breadcrumb
        items={[
          { name: "Khu vực bàn", href: routes.tables_by_area },
          { name: "Tạo bàn", href: "" },
        ]}
      />

      <div className="grid grid-cols-4 grid-rows-1 gap-5">
        <div className="col-span-3">
          <div className="flex">
            <Button
              className="bg-[var(--primary)] text-[var(--textlight)] font-bold"
              onClick={() => setOpenModal(true)}
            >
              <FaPlus />
              Thêm món ăn
            </Button>
          </div>
          <div className="mt-5 border-t-2">
            <Form form={form} component={false}>
              <Table
                loading={loading}
                bordered={false}
                showHeader={true}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
              />
            </Form>
          </div>
        </div>
        <div className="col-start-4">
          <div className="text-center font-bold border-b-2 text-[20px] mt-[22px]">
            Thông tin
          </div>
          <div className="text-[15px] pl-2 border-l-2 ">
            <div className="grid grid-cols-1 grid-rows-3 gap-1">
              <div className="flex">
                <p className="font-bold">Bàn:&nbsp;</p>
                <p> {currDish?.nameTable}</p>&nbsp;-&nbsp;
                <p>{currDish?.areaName}</p>{" "}
              </div>
              <div className="flex">
                <p className="font-bold">Ngày vào:&nbsp;</p>{" "}
                {currDish?.isActive &&
                  formatTime.dataAndYear(currDish?.timeStart)}
              </div>
              <div className="flex">
                <p className="font-bold">Giờ vào:&nbsp;</p>{" "}
                {currDish?.isActive &&
                  formatTime.hourAndMinute(currDish?.timeStart)}
              </div>
              <div className="flex">
                <p className="font-bold">Thu ngân:&nbsp;</p>{" "}
                {getInfoToken.getUserNameByToken()}
              </div>
            </div>
          </div>

          <h1 className="text-center mt-5 font-bold border-b-2 text-[20px]">
            Hóa đơn
          </h1>
          <div className="text-[15px] pl-2 border-l-2">
            <div className="grid grid-cols-1 grid-rows-3 gap-1">
              <div className="flex">
                <p className="font-bold">Thời gian:&nbsp;</p>{" "}
                {currDish?.isActive &&
                  formatTime.formatMinute(currDish?.timeStart)}
              </div>
              <div className="flex">
                <p className="font-bold">Tổng số lượng:&nbsp;</p>
                <p> {totalPayment.totalQuantity}</p>
              </div>
              <div className="flex">
                <p className="font-bold">Tạm tính:&nbsp;</p>
                <p className="text-red-600">
                  {validatePriceVND("" + totalPayment.totalPrice)}đ
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 pl-2 border-l-2 mt-2">
            <div>
              <Button
                disabled={!currDish?.isActive}
                onClick={handleChangeTable}
                className="w-full bg-blue-600 text-[var(--textlight)]"
              >
                <FaArrowsTurnRight /> Chuyển bàn
              </Button>
            </div>
            <div>
              {currDish?.isActive ? (
                <Button
                  onClick={handleUpdate}
                  className="w-full bg-orange-600 text-[var(--textlight)]"
                >
                  <RxUpdate /> Cập nhật
                </Button>
              ) : (
                <Button
                  onClick={handleOpenTable}
                  className="w-full bg-orange-600 text-[var(--textlight)]"
                >
                  <FaOpenid /> Tạo bàn
                </Button>
              )}
            </div>
            <div>
              <Button
                disabled={!currDish?.isActive}
                onClick={handlePayment}
                className="w-full bg-green-600 text-[var(--textlight)]"
              >
                <MdOutlinePayments /> Thanh toán
              </Button>
            </div>
            <div>
              <Button
                disabled={!currDish?.isActive}
                onClick={handlecancel}
                className="w-full bg-red-600 text-[var(--textlight)]"
              >
                <IoCloseCircleOutline /> Hủy bàn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseDishForTable;
