import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import getShopId from "~/constants/getShopId";
import orderAction from "~/store/actions/orderAction";

import {
  Card,
  Row,
  Col,
  Table,
  Typography,
  Divider,
  Button,
  Modal,
} from "antd";
import Breadcrumb from "~/components/helper/Breadcrumb";
import ROUTE_PATH from "~/routes/routesPath";
import { IoPrintSharp } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import formatTime from "~/utils/functions/formatTime";
import CheckoutSkeleton from "~/components/loading/LoadingSkeletonCheckout";
import LoadingSyncLoader from "~/components/loading/LoadingSyncLoader";
import PaymentMethod from "~/components/payment/PaymentMethod";
import images from "~/assets/images";
import { toast } from "react-toastify";
import vnpayService from "~/services/vnpayService";

const { Title } = Typography;

const { confirm } = Modal;
function Checkout() {
  const location = useLocation();
  const { table_id } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, update } = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataPaymentMethod, setDataPaymentMethod] = useState({
    key: "store",
    label: "Thanh toán tại cửa hàng",
    image: images.logodark, // Thay bằng đường dẫn hình ảnh của bạn
  });

  console.log(table_id, data);
  
  const handleClosePaymentMethod = () => {
    setIsModalOpen(false);
  };
  const handleChoosePaymentMethod = (data) => {
    setDataPaymentMethod(data);
    setIsModalOpen(false);
    toast.success("Thay đổi phương thức thanh toán thành công")
  };

  useEffect(()=> {
    if(data?.lenght <=0){
      navigate(ROUTE_PATH.tables_by_area)
    }
  },[data,navigate])

  useEffect(() => {
    const payload = {
      shop_id: getShopId(),
      table_id: table_id,
    };
    dispatch(orderAction.getInfoCheckout(payload));
  }, [dispatch, table_id]);

  // Định nghĩa các cột cho bảng danh sách món ăn
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Món ăn",
      dataIndex: "dish_Name",
      key: "dish_Name",
    },
    {
      title: "Giá bán",
      dataIndex: "selling_Price",
      key: "selling_Price",
      render: (price) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) =>
        `${(record.selling_Price * record.quantity).toLocaleString()} đ`,
    },
  ];
  const handleCheckoutAndPrint = () => {};

  const handleCheckout = () => {
    confirm({
      title: "Bạn chắc chắn thanh toán bàn này chứ ?",
      okText: "Đồng ý",
      cancelText: "Không",
      centered: true,
       async onOk() {
        if(dataPaymentMethod.key === 'store'){
          const payload = {
            shop_id: getShopId(),
            table_id: table_id,
            payment_method: 0,
          };
          dispatch(orderAction.payment(payload));
        }else if(dataPaymentMethod.key === 'vnpay'){
          const payload = {
            shop_id: getShopId(),
            table_id: table_id,
            total_money: data?.total_money,
            description: `Thành toán ${data?.shop_name} - ${data?.area_name} - ${data?.table_name}`
          };
          const res = await vnpayService.apiPaymentVnPay(payload)
          window.location.href = res;
        }
      },
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div style={{ padding: "20px" }}>
      {update && <LoadingSyncLoader />}
      <Breadcrumb
        items={[
          { name: "Khu vực bàn", href: ROUTE_PATH.tables_by_area },
          { name: "Bàn", href: ROUTE_PATH.choose_dish_table },
          { name: "Thông tin thanh toán", href: "" },
        ]}
      />
      <Title className="text-center" level={3}>
        Hóa đơn thanh toán
      </Title>
      <Divider />
      {loading ? (
        <CheckoutSkeleton />
      ) : (
        <Card
          bordered={false}
          style={{ margin: "0 auto", borderRadius: "10px" }}
        >
          {/* Thông tin hóa đơn */}
          <div className="flex justify-between">
            <div>
              <div className="grid grid-cols-1 grid-rows-4 gap-4 text-[18px]">
                <div>
                  <b>Cửa hàng: </b>
                  <span>{data?.shop_name || "Chưa có"}</span>
                </div>
                <div>
                  <b>Hotline: </b>
                  <span>{data?.hotline || "Chưa có"}</span>
                </div>
                <div>
                  <b>Khu vực: </b>{" "}
                  <span>
                    {data?.table_name || "Chưa có"} -{" "}
                    {data?.area_name || "Chưa có"}
                  </span>
                </div>
                <div>
                  <b>Giờ vào: </b>
                  <span>{formatTime.hourAndMinute(data?.time_start)}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 grid-rows-4 gap-4 text-[18px]">
                <div>
                  <b>Địa chỉ: </b>
                  {data?.address_shop || "Chưa có"}
                </div>
                <div>
                  <b>Thu ngân: </b>
                  <span>{data?.staff_name || "Chưa có"}</span>
                </div>
                <div>
                  <b>Ngày vào: </b>
                  <span>{formatTime.dateAndYear(data?.time_start)}</span>
                </div>
                <div>
                  <b>Giờ ra: </b>
                  <span>{formatTime.hourAndMinute(data?.time_end)}</span>
                </div>
              </div>
            </div>
          </div>
          <Table
            dataSource={data?.listDish || []}
            columns={columns}
            pagination={false}
            rowKey={(record) => record.dish_Name}
          />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>Tổng số lượng: {data?.total_quantity || 0}</div>
              <Title level={5} className="m-0">
                Tổng thanh toán:{" "}
                <span className="text-red-500">
                  {data?.total_money?.toLocaleString() || 0} đ
                </span>
              </Title>
            </Col>
            <Col span={12}>
              <button
                className="px-2 py-2  text-white font-semibold rounded"
                onClick={() => setIsModalOpen(true)}
              >
                <div
                  key={dataPaymentMethod.key}
                  className={`flex items-center py-1 px-2 border rounded cursor-pointer`}
                >
                  <img
                    src={dataPaymentMethod.image}
                    alt={dataPaymentMethod.label}
                    className="w-10 h-10 object-contain mr-4"
                  />
                  <span className="font-medium text-gray-700">
                    {dataPaymentMethod.label}
                  </span>
                </div>
              </button>
              {isModalOpen && (
                <PaymentMethod
                  onClick={handleChoosePaymentMethod}
                  onClose={handleClosePaymentMethod}
                />
              )}
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: "20px" }} gutter={[16, 16]}>
            <Col>
              <Button type="default" danger onClick={handleCancel}>
                <TiCancelOutline /> Hủy
              </Button>
            </Col>
            <Col>
              <Button
                className="bg-[var(--primary)] text-[var(--textlight)]"
                onClick={handleCheckout}
              >
                <MdOutlinePayments /> Thanh toán
              </Button>
            </Col>
            <Col>
              <Button
                className="bg-[var(--primary)] text-[var(--textlight)]"
                onClick={handleCheckoutAndPrint}
              >
                <IoPrintSharp /> Thanh toán & In hóa đơn
              </Button>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}

export default Checkout;
