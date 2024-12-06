import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import {login} from '../../store/actions/authAction'
import ROUTE_PATH from '../../routes/routesPath'
const Login = () => {
  let { loading, isLogined } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
      if(isLogined){
        return navigate(ROUTE_PATH.shop)
      }
  },[isLogined,navigate])

  const handleSubmitCreate = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading && <LoadingSyncLoader />}
      <div className="bg-white backdrop-blur-lg rounded-xl py-5 px-6 shadow-2xl w-full max-w-md">
        <Form
          onFinish={handleSubmitCreate}
          onFinishFailed={() => toast.error("Vui lòng nhập đầy đủ thông tin")}
          className="p-2 rounded-md mb-2"
        >
          <div className="grid grid-cols-1 grid-rows-4 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold mb-6 text-center">
                Đăng nhập
              </h2>
            </div>
            <div>
              <Form.Item
                label="Email"
                name="email"
                layout="vertical"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Vui lòng nhập email của bạn",
                  },
                ]}
              >
                <Input width={100} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Mật khẩu"
                name="password"
                layout="vertical"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu của bạn",
                  },
                ]}
              >
                <Input.Password
                onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
              className="w-full"
              >
                <Button
                  className="w-full py-3 mt-2 bg-[var(--primary)] text-[var(--textlight)] hover:"
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </div>
          </div>
        <div>
            <span>Bạn chưa có tài khoản ?</span>
            <a href={ROUTE_PATH.register}> Đăng ký ngay</a>
        </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
