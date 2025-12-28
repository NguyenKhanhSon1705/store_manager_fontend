/* eslint-disable react/prop-types */
import Dish from "../components/order/Dish";
import Breadcrumb from "~/components/helper/Breadcrumb";
import routes from "../../routes/routesPath";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Empty,
  Tag,
  Divider,
  message
} from "antd";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineDeleteSweep,
  MdOutlinePayments,
  MdAdd,
  MdRemove,
  MdEdit,
  MdEventSeat,
  MdAccessTime
} from "react-icons/md";
import { FaPlus, FaExchangeAlt } from "react-icons/fa";
import { IoCloseCircleOutline, IoSaveOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";

import { toast } from "react-toastify";
import formatTime from "../../utils/functions/formatTime";
import getInfoToken from "../../utils/functions/getInfoToken";
import { validatePriceVND } from "../../utils/validatePriceVND";
import { useDispatch, useSelector } from "react-redux";
import orderAction from "../../store/actions/orderAction";
import images from "../../assets/images";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";
import TablesByArea from "./TablesByArea";
import ROUTE_PATH from "../../routes/routesPath";

const { TextArea } = Input;
const { confirm } = Modal;

// Helper to parse price string to number
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  if (typeof priceStr === 'number') return priceStr;
  return parseFloat(priceStr.toString().replace(/\./g, "").replace("đ", "")) || 0;
};

function ChooseDishForTable() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { table } = location.state || {}; // Initial table info passed from navigation

  // Local State
  const [data, setData] = useState([]); // Cart Data
  const [isModalVisible, setIsModalVisible] = useState(false); // Abort Table Modal
  const [reason, setReason] = useState("");
  const [openAddDishModal, setOpenAddDishModal] = useState(false);
  const [openSwitchTableModal, setOpenSwitchTableModal] = useState(false);

  const { currDish, loading, update } = useSelector((state) => state.order);

  // Fetch data on mount or table change
  useEffect(() => {
    if (table?.id) {
      dispatch(orderAction.getInfoDishCurrentTable(table.id));
    }
  }, [dispatch, table?.id]);

  // Sync Redux data to Local State
  useEffect(() => {
    if (currDish?.dish && Array.isArray(currDish.dish)) {
      const formattedData = currDish.dish.map((item) => ({
        key: item.id || item.key, // Ensure key exists
        id: item.id || item.key,
        dish_Name: item.dish_Name,
        image: item.image,
        selling_Price: parsePrice(item.selling_Price),
        quantity: item.quantity ? parseInt(item.quantity) : 1,
        notes: item.notes || "",
      }));
      setData(formattedData);
    } else {
      setData([]);
    }
  }, [currDish]);

  // Calculations
  const { totalQuantity, totalPrice } = useMemo(() => {
    let qty = 0;
    let price = 0;
    data.forEach(item => {
      qty += item.quantity;
      price += item.quantity * item.selling_Price;
    });
    return { totalQuantity: qty, totalPrice: price };
  }, [data]);


  // --- Handlers ---

  const handleMergeDishes = (newItems) => {
    const currentData = [...data];
    newItems.forEach(newItem => {
      const price = parsePrice(newItem.selling_Price);
      const existingIndex = currentData.findIndex(item => item.id === newItem.key || item.key === newItem.key);

      if (existingIndex > -1) {
        // Increase quantity if exists
        currentData[existingIndex].quantity += 1;
      } else {
        // Add new
        currentData.push({
          key: newItem.key,
          id: newItem.key,
          dish_Name: newItem.dish_Name,
          image: newItem.image?.props?.src || newItem.image, // Handle potentially different image structures
          selling_Price: price,
          quantity: 1,
          notes: "",
        });
      }
    });
    setData(currentData);
    setOpenAddDishModal(false);
    message.success("Đã thêm món vào danh sách");
  };

  const handleQuantityChange = (key, delta) => {
    const newData = data.map(item => {
      if (item.key === key) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setData(newData);
  };

  const handleDeleteItem = (key) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
  };

  const handleNoteChange = (key, text) => {
    const newData = data.map(item => {
      if (item.key === key) return { ...item, notes: text };
      return item;
    });
    setData(newData);
  };

  // --- Server Actions ---

  const handleUpdateOrder = () => {
    confirm({
      title: "Cập nhật đơn hàng",
      content: "Bạn có chắc chắn muốn lưu các thay đổi này?",
      okText: "Cập nhật",
      okType: "primary",
      cancelText: "Hủy",
      onOk() {
        const payload = {
          tableId: currDish?.id || table.id, // Use currDish id if available (loaded), else fallback
          listDishId: data.map((item) => ({
            key: item.key,
            quantity: item.quantity,
            notes: item.notes,
            selling_Price: item.selling_Price
          })),
        };

        const isTableActive = currDish?.isActive;
        const isEmptyOrder = payload.listDishId.length <= 0;

        if (isEmptyOrder && !currDish?.hasHourlyRate) {
          message.warning("Không thể lưu đơn hàng trống (trừ khi tính giờ).");
          return;
        }

        if (isTableActive) {
          dispatch(orderAction.updateTable(payload));
        } else {
          // If table is inactive, this actions conceptually "Opens" the table
          dispatch(orderAction.openTable(payload));
        }
      },
    });
  };

  const handlePayment = () => {
    confirm({
      title: "Xác nhận thanh toán",
      content: `Tổng tiền cần thanh toán: ${validatePriceVND(String(totalPrice))}đ. Bạn có muốn tiếp tục?`,
      okText: "Đến trang thanh toán",
      okType: "primary",
      cancelText: "Hủy",
      onOk() {
        navigate(ROUTE_PATH.CHECK_OUT, { state: { table_id: currDish?.id } });
      },
    });
  };

  const handleSwitchTable = (newTable) => {
    console.log(newTable);
    if (newTable.isActive) {
      message.error("Bàn này đang có khách, không thể chuyển đến!");
      return;
    }
    confirm({
      title: "Chuyển bàn",
      content: `Xác nhận chuyển từ ${currDish?.nameTable} sang ${newTable.nameTable}?`,
      async onOk() {
        const payload = {
          table_id_old: currDish.id,
          table_id_new: newTable.id
        };
        const res = await dispatch(orderAction.changeTable(payload));
        if (res?.isSuccess) {
          setOpenSwitchTableModal(false);
          // 1. Force update the Redux state with the new table's data immediately
          await dispatch(orderAction.getInfoDishCurrentTable(newTable.id));

          // 2. Navigate to update the URL and 'location.state' for the Header/Context
          navigate(location.pathname, { state: { table: newTable }, replace: true });
        }
      }
    })
  }

  const handleAbortTable = () => {
    if (!reason.trim()) {
      message.error("Vui lòng nhập lý do hủy bàn!");
      return;
    }
    confirm({
      title: "Hủy bàn",
      content: "Hành động này sẽ hủy bàn và xóa toàn bộ đơn hàng hiện tại. Bạn có chắc chắn?",
      okType: 'danger',
      onOk() {
        const payload = {
          table_Id: currDish.id,
          reason_abort: reason,
          total_money: totalPrice,
          total_quantity: totalQuantity,
        };
        dispatch(orderAction.abortedTable(payload));
        setIsModalVisible(false);
        setReason("");
      }
    })
  }


  // --- Render ---

  // Columns for AntD Table
  const columns = [
    {
      title: 'Món ăn',
      dataIndex: 'dish_Name',
      key: 'dish_Name',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
            <Image
              src={record.image || images.img_default}
              alt={text}
              width="100%"
              height="100%"
              className="object-cover"
              preview={false}
              fallback={images.img_default}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800 line-clamp-2">{text}</p>
            <p className="text-orange-600 font-medium text-xs">{validatePriceVND(String(record.selling_Price))}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      width: 130,
      render: (_, record) => (
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => handleQuantityChange(record.key, -1)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            <MdRemove />
          </button>
          <span className="w-8 text-center font-medium text-gray-700 text-sm">{record.quantity}</span>
          <button
            onClick={() => handleQuantityChange(record.key, 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            <MdAdd />
          </button>
        </div>
      )
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleNoteChange(record.key, e.target.value)}
          placeholder="..."
          className="w-full text-xs"
          maxLength={50}
          variant="borderless"
          style={{ borderBottom: '1px solid #f0f0f0', borderRadius: 0, paddingLeft: 0 }}
        />
      )
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <Popconfirm title="Xóa món này?" onConfirm={() => handleDeleteItem(record.key)}>
          <button className="text-red-400 hover:text-red-600 p-2"><MdOutlineDeleteSweep size={20} /></button>
        </Popconfirm>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {update && <LoadingSyncLoader />}

      {/* Modals */}
      <Modal
        open={openAddDishModal}
        width="85%" // Wider modal for Dish selection
        style={{ top: 20 }}
        onCancel={() => setOpenAddDishModal(false)}
        footer={null}
        destroyOnClose
      >
        <Dish onSubmit={(items) => handleMergeDishes(items)} />
      </Modal>

      <Modal
        open={openSwitchTableModal}
        width="70%"
        title={<div className="text-lg font-bold flex items-center gap-2"><FaExchangeAlt /> Chuyển bàn</div>}
        onCancel={() => setOpenSwitchTableModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="h-[70vh] overflow-y-auto">
          <TablesByArea onClick={table => handleSwitchTable(table)} />
        </div>
      </Modal>

      <Modal
        open={isModalVisible}
        title="Hủy bàn & Hóa đơn"
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAbortTable}
        okText="Xác nhận Hủy"
        okButtonProps={{ danger: true }}
      >
        <TextArea
          rows={4}
          placeholder="Nhập lý do hủy bàn..."
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
      </Modal>


      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumb
            items={[
              { name: "Khu vực bàn", href: routes.tables_by_area },
              { name: `Bàn ${currDish?.nameTable || table?.name || "..."}`, href: "" },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Cart / Dish List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h2 className="font-bold text-gray-800 text-lg">Danh sách món</h2>
              <Button
                type="primary"
                icon={<FaPlus />}
                onClick={() => setOpenAddDishModal(true)}
                className="bg-orange-500 hover:bg-orange-600 border-orange-500 shadow-sm"
              >
                Thêm món
              </Button>
            </div>

            <div className="p-0">
              <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                rowKey="key"
                locale={{ emptyText: <Empty description="Chưa có món nào được gọi" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
              />
            </div>
          </div>
        </div>


        {/* Right: Summary & Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            {/* Table Info Header */}
            <div className="p-5 border-b border-gray-100 bg-blue-50/50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <MdEventSeat className="text-blue-500" />
                    {currDish?.nameTable || table?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Tag color="cyan">{currDish?.areaName || "Khu vực"}</Tag>
                    {currDish?.isActive ? (
                      <BadgeStatus active text="Đang phục vụ" />
                    ) : (
                      <BadgeStatus text="Bàn trống" />
                    )}
                  </div>
                </div>
                {currDish?.isActive && (
                  <div className="text-right">
                    <div className="text-xs text-gray-400 flex items-center justify-end gap-1">
                      <MdAccessTime /> Giờ vào
                    </div>
                    <div className="font-mono font-medium text-gray-700">
                      {formatTime.hourAndMinute(currDish?.timeStart)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-gray-600">
                <span>Tổng số lượng:</span>
                <span className="font-medium text-gray-900">{totalQuantity}</span>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Tạm tính:</span>
                <span className="text-2xl font-bold text-red-600">{validatePriceVND(String(totalPrice))}đ</span>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="p-5 bg-gray-50 flex flex-col gap-3">
              {/* Primary Action: Update / Create */}
              <Button
                type="primary"
                size="large"
                block
                icon={currDish?.isActive ? <RxUpdate /> : <IoSaveOutline />}
                onClick={handleUpdateOrder}
                className="bg-blue-600 hover:bg-blue-700 border-none h-12 text-base shadow-sm"
              >
                {currDish?.isActive ? "Cập nhật đơn" : "Mở bàn & Lưu đơn"}
              </Button>

              {/* Secondary Actions (Only if active) */}
              {currDish?.isActive && (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    block
                    icon={<MdOutlinePayments />}
                    onClick={handlePayment}
                    className="border-green-600 text-green-600 hover:bg-green-50 h-10"
                  >
                    Thanh toán
                  </Button>
                  <Button
                    block
                    icon={<FaExchangeAlt />}
                    onClick={() => setOpenSwitchTableModal(true)}
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 h-10"
                  >
                    Chuyển bàn
                  </Button>
                  <Button
                    danger
                    block
                    className="col-span-2"
                    icon={<IoCloseCircleOutline />}
                    onClick={() => setIsModalVisible(true)}
                  >
                    Hủy bàn
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small UI Helper
const BadgeStatus = ({ active, text }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
    {text}
  </span>
);

export default ChooseDishForTable;
