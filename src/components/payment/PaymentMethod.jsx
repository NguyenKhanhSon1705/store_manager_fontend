/* eslint-disable react/prop-types */
import { useState } from "react";
import images from "~/assets/images";

const paymentMethods = [
  {
    key: "store",
    label: "Thanh toán tại cửa hàng",
    image: images.logodark, // Thay bằng đường dẫn hình ảnh của bạn
  },
  {
    key: "qr",
    label: "Chuyển khoản ngân hàng qua mã QR",
    image: images.qrCode, // Thay bằng đường dẫn hình ảnh
  },
  {
    key: "vnpay",
    label: "Thanh toán qua VNPAY",
    image: images.vnPay, // Thay bằng đường dẫn hình ảnh
  },
];
function PaymentMethod({ onClick , onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);

  return (
    <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        {/* Header */}
        <h2 className="text-lg font-bold mb-4">Chọn phương thức thanh toán</h2>

        {/* Danh sách các phương thức */}
        <div className="flex flex-col gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.key}
              className={`flex items-center p-4 border rounded cursor-pointer ${
                selectedMethod.key === method.key
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedMethod(method)}
            >
              <img
                src={method.image}
                alt={method.label}
                className="w-10 h-10 object-contain mr-4"
              />
              <span className="font-medium text-gray-700">{method.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-400 text-gray-700 rounded mr-2 hover:bg-gray-400"
            onClick={() => onClose(false)}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-[var(--primary)] text-white font-semibold rounded hover:bg-red-600"
            onClick={() => onClick(selectedMethod)}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
