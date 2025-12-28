import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";
import { Button, Form, Input, Typography } from "antd";
import { toast } from "react-toastify";
import { login } from '../../store/actions/authAction';
import ROUTE_PATH from '../../routes/routesPath';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const Login = () => {
  const { loading, isLogined } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogined) {
      navigate(ROUTE_PATH.shop);
    }
  }, [isLogined, navigate]);

  const handleSubmit = (values) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <div className="min-h-screen flex w-full">
      {loading && <LoadingSyncLoader />}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-900 to-red-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center text-center p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Restaurant OS</h1>
            <p className="text-xl text-gray-200 max-w-md font-light">
              Hệ thống quản lý nhà hàng chuyên nghiệp, mang lại trải nghiệm ẩm thực tuyệt vời.
            </p>
          </motion.div>
        </div>
        {/* Animated Shapes */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="mb-10 text-center lg:text-left">
            <Title level={2} className="!mb-2 !text-gray-800">Đăng nhập</Title>
            <Text className="text-gray-500">Nhập thông tin xác thực để truy cập hệ thống</Text>
          </div>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={() => toast.error("Vui lòng kiểm tra lại thông tin nhập")}
            layout="vertical"
            size="large"
            className="w-full"
          >
            <Form.Item
              name="email"
              label={<span className="font-medium text-gray-700">Email</span>}
              rules={[
                { required: true, message: "Vui lòng nhập Email!" },
                { type: 'email', message: "Email không hợp lệ!" }
              ]}
              className="mb-6"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400 mr-2" />}
                placeholder="name@example.com"
                className="rounded-lg py-3 hover:border-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="font-medium text-gray-700">Mật khẩu</span>}
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              className="mb-8"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-2" />}
                placeholder="••••••••"
                className="rounded-lg py-3 hover:border-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 rounded-lg bg-indigo-600 hover:!bg-indigo-700 border-none font-semibold text-base shadow-lg shadow-indigo-600/20 active:shadow-none transition-all"
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <div className="text-center mt-8">
              <Text className="text-gray-500">Bạn chưa có tài khoản? </Text>
              <a href={ROUTE_PATH.register} className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Đăng ký ngay
              </a>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
