import { useEffect, useState } from "react";
import { Result, Button, Card, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import vnpayService from "~/services/vnpayService";
import ROUTE_PATH from "~/routes/routesPath";

function PaymentNotication() {
    const [paymentData, setPaymentData] = useState(null); // Dữ liệu thanh toán
    const [isLoading, setIsLoading] = useState(true);    // Trạng thái loading
    const [isSuccess, setIsSuccess] = useState(false);   // Trạng thái giao dịch

    useEffect(() => {
        const fetchPaymentResult = async () => {
            try {
                const queryString = window.location.search;
                const res = await vnpayService.apiGetResultPayment(queryString);
                setPaymentData(res); 
                setIsSuccess(res?.isSuccess); // Kiểm tra giao dịch thành công
            } catch (error) {
                console.error("Error fetching payment result:", error);
                setIsSuccess(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentResult();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" tip="Đang tải kết quả thanh toán..." />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Card className="w-full max-w-md shadow-lg rounded-lg">
                {isSuccess ? (
                    <Result
                        status="success"
                        icon={<CheckCircleOutlined />}
                        title="Thanh toán thành công!"
                        subTitle={paymentData?.description}
                        extra={[
                            <div key="info" className="text-left">
                                <p>
                                    <strong>Mã giao dịch:</strong> {paymentData?.vnpayTransactionId}
                                </p>
                                <p>
                                    <strong>Phương thức thanh toán:</strong> {paymentData?.paymentMethod}
                                </p>
                                <p>
                                    <strong>Ngân hàng:</strong> {paymentData?.bankingInfor?.bankCode}
                                </p>
                                <p>
                                    <strong>Thời gian:</strong> {new Date(paymentData?.timestamp).toLocaleString()}
                                </p>
                            </div>,
                            <Button type="primary" href= {ROUTE_PATH.tables_by_area} key="back" className="mt-4">
                                Quay lại trang chủ
                            </Button>
                        ]}
                    />
                ) : (
                    <Result
                        status="error"
                        icon={<CloseCircleOutlined />}
                        title="Thanh toán thất bại!"
                        subTitle="Giao dịch không thành công, vui lòng thử lại."
                        extra={[
                            <Button type="primary" href= {ROUTE_PATH.tables_by_area} key="retry">
                                Quay lại trang chủ
                            </Button>
                        ]}
                    />
                )}
            </Card>
        </div>
    );
}

export default PaymentNotication;
