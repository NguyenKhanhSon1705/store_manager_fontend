import { motion } from "framer-motion";

const ErrorDetails = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black">
      <div className="text-center">
        {/* Hiệu ứng vòng tròn */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="absolute -top-5 -left-5 w-48 h-48 rounded-full bg-purple-600 blur-xl opacity-50"></div>
          <div className="absolute top-5 left-10 w-36 h-36 rounded-full bg-pink-500 blur-2xl opacity-30"></div>
        </motion.div>

        {/* Số 404 */}
        <motion.h1
          className="text-white text-9xl font-extrabold tracking-widest relative z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          404
        </motion.h1>

        {/* Dòng chữ */}
        <motion.p
          className="text-gray-300 text-lg mt-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          ôôi! Trang bạn đang tìm kiếm không tồn tại.
        </motion.p>

        {/* Nút quay lại */}
        <motion.div
          className="mt-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all"
          >
            Go Back Home
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorDetails;
