import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import getShopId from "~/constants/getShopId";
import orderAction from "~/store/actions/orderAction";
import vnpayService from "~/services/vnpayService";

import {
  Card,
  Table,
  Typography,
  Divider,
  Button,
  Modal,
  Tag
} from "antd";
import Breadcrumb from "~/components/helper/Breadcrumb";
import ROUTE_PATH from "~/routes/routesPath";
import { IoPrintSharp, IoWalletOutline, IoCardOutline } from "react-icons/io5";
import { MdOutlinePayments, MdStorefront, MdAccessTime, MdPerson, MdLocationOn } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import formatTime from "~/utils/functions/formatTime";
import CheckoutSkeleton from "~/components/loading/LoadingSkeletonCheckout";
import LoadingSyncLoader from "~/components/loading/LoadingSyncLoader";
import images from "~/assets/images";
import { toast } from "react-toastify";
import { validatePriceVND } from "~/utils/validatePriceVND";

const { Title, Text } = Typography;
const { confirm } = Modal;

function Checkout() {
  const location = useLocation();
  const { table_id } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, update } = useSelector((state) => state.order);

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('store'); // 'store' | 'vnpay'

  useEffect(() => {
    if (data?.length <= 0 && !loading) { // Check length only if loaded (logic adjustment)
      // navigate(ROUTE_PATH.tables_by_area) // Potential loop if data is fetching, enabled after validation
    }
  }, [data, navigate, loading]);

  useEffect(() => {
    if (table_id) {
      const payload = {
        shop_id: getShopId(),
        table_id: table_id,
      };
      dispatch(orderAction.getInfoCheckout(payload));
    }
  }, [dispatch, table_id]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 50,
      render: (_, __, index) => <span className="text-gray-500 font-medium">{index + 1}</span>,
    },
    {
      title: "Món ăn",
      dataIndex: "dish_Name",
      key: "dish_Name",
      render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: "Đơn giá",
      dataIndex: "selling_Price",
      key: "selling_Price",
      align: 'right',
      render: (price) => <span className="text-gray-600">{validatePriceVND(String(price))}</span>,
    },
    {
      title: "SL",
      dataIndex: "quantity",
      key: "quantity",
      align: 'center',
      render: (qty) => <Tag color="blue" bordered={false}>{qty}</Tag>,
    },
    {
      title: "Thành tiền",
      key: "total",
      align: 'right',
      render: (_, record) => (
        <span className="font-bold text-gray-900">
          {validatePriceVND(String(record.selling_Price * record.quantity))}
        </span>
      ),
    },
  ];

  const handleCheckout = () => {
    confirm({
      title: <div className="text-lg">Xác nhận thanh toán</div>,
      content: "Bạn có chắc chắn muốn hoàn tất đơn hàng này?",
      okText: "Thanh toán ngay",
      cancelText: "Quay lại",
      centered: true,
      okButtonProps: { size: 'large', type: 'primary' },
      cancelButtonProps: { size: 'large' },
      async onOk() {
        if (paymentMethod === 'store') {
          const payload = {
            shop_id: getShopId(),
            table_id: table_id,
            payment_method: 0,
          };
          const res = await dispatch(orderAction.payment(payload));
          if (res?.isSuccess) {
            navigate(ROUTE_PATH.tables_by_area);
          }
        } else if (paymentMethod === 'vnpay') {
          if (!data?.total_money) return toast.error("Đơn hàng lỗi, không có tổng tiền!");

          const payload = {
            shop_id: getShopId(),
            table_id: table_id,
            total_money: data?.total_money,
            description: `Thanh toán bàn ${data?.table_name} - ${formatTime.dateAndYear(new Date())}`
          };
          try {
            const res = await vnpayService.apiPaymentVnPay(payload);
            if (res) window.location.href = res;
          } catch (error) {
            toast.error("Lỗi khởi tạo VNPay");
          }
        }
      },
    });
  };

  const handleCheckoutAndPrint = () => {
    toast.info("Tính năng in đang phát triển");
    handleCheckout();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      {update && <LoadingSyncLoader />}

      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { name: "Khu vực bàn", href: ROUTE_PATH.tables_by_area },
            { name: "Đặt món", href: ROUTE_PATH.choose_dish_table, state: { table: { id: table_id } } }, // Pass state back if needed
            { name: "Thanh toán", href: "" },
          ]}
        />
      </div>

      {loading ? (
        <CheckoutSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

          {/* LEFT COLUMN: RECEIPT PREVIEW */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
              {/* Decoration: Torn Paper Effect (Top) */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <img src={images.logodark} alt="Logo" className="h-16 object-contain" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide mb-2">{data?.shop_name || "Tên Cửa Hàng"}</h1>
                  <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    <MdLocationOn /> {data?.address_shop || "Địa chỉ chưa cập nhật"}
                  </p>
                  <p className="text-gray-500 text-sm">Hotline: {data?.hotline || "---"}</p>
                </div>

                <Divider dashed style={{ borderColor: '#e5e7eb' }} />

                {/* Meta Info Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><MdPerson /> Thu ngân:</span>
                    <span className="font-medium text-gray-900">{data?.staff_name || "Admin"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><MdAccessTime /> Giờ vào:</span>
                    <span className="font-medium text-gray-900">{formatTime.hourAndMinute(data?.time_start)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><MdStorefront /> Khu vực:</span>
                    <span className="font-medium text-gray-900">{data?.area_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><MdAccessTime /> Giờ ra:</span>
                    <span className="font-medium text-gray-900">{formatTime.hourAndMinute(data?.time_end) || "Hiện tại"}</span>
                  </div>
                </div>

                {/* Dish Table */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">Chi tiết đơn hàng</h3>
                    <Tag color="orange" className="text-sm px-3 py-1 scale-110">Bàn {data?.table_name}</Tag>
                  </div>
                  <Table
                    dataSource={data?.listDish || []}
                    columns={columns}
                    pagination={false}
                    rowKey={(record) => record.dish_Name}
                    bordered={false}
                    size="small"
                  />
                </div>

                <Divider style={{ borderColor: '#e5e7eb' }} />

                {/* Total Section */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Tổng số lượng món:</span>
                    <span className="font-medium">{data?.total_quantity || 0}</span>
                  </div>
                  {/* Could add Tax/Discount here */}
                  <div className="flex justify-between items-end mt-4 pt-4 border-t border-dashed border-gray-200">
                    <span className="text-xl font-bold text-gray-800">Tổng thanh toán</span>
                    <span className="text-3xl font-extrabold text-red-600">
                      {validatePriceVND(String(data?.total_money || 0))} đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Decoration: Receipt Footer */}
              <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 italic">
                Cảm ơn quý khách và hẹn gặp lại!
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIONS */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">

            {/* Payment Method Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <MdOutlinePayments className="text-blue-500" /> Phương thức thanh toán
              </h3>

              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('store')}
                  className={`
                            border-2 rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-all duration-200
                            ${paymentMethod === 'store'
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                        `}
                >
                  <div className={`p-2 rounded-full ${paymentMethod === 'store' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <IoWalletOutline size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Tiền mặt / Tại quầy</div>
                    <div className="text-xs text-gray-500">Thanh toán trực tiếp với thu ngân</div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('vnpay')}
                  className={`
                            border-2 rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-all duration-200
                            ${paymentMethod === 'vnpay'
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                        `}
                >
                  <div className={`p-2 rounded-full ${paymentMethod === 'vnpay' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <IoCardOutline size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">VNPay QR</div>
                    <div className="text-xs text-gray-500">Quét mã QR để thanh toán</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <Button
                type="primary"
                size="large"
                block
                className="h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/30 border-0 mb-3"
                onClick={handleCheckout}
              >
                Thanh toán ngay
              </Button>

              <Button
                size="large"
                block
                className="h-12 font-semibold text-gray-700 border-gray-300 hover:text-blue-600 hover:border-blue-500 mb-3"
                onClick={handleCheckoutAndPrint}
              >
                <IoPrintSharp className="mr-2" /> Thanh toán & In hóa đơn
              </Button>

              <Button
                type="text"
                danger
                block
                size="large"
                className="flex items-center justify-center hover:bg-red-50"
                onClick={handleCancel}
              >
                <TiCancelOutline className="mr-1 text-xl" /> Hủy bỏ
              </Button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Checkout;
