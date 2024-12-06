import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { confirmEmail, register } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingSyncLoader from "../../components/loading/LoadingSyncLoader";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../../routes/routesPath";
const Register = () => {
  const [countdown, setCountdown] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const { isSuccess, isConfirm, loading } = useSelector((state) => state.auth);
  const [disabledBtnLogin, setDisabledBtnLogin] = useState(true);
  const [on, setOn] = useState(false);

  const navigator = useNavigate()
  useEffect(() => {
    if (on) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      if (countdown <= 0) {
        setOn(false);
      }
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [countdown, on]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setOn(true);
      setCountdown(120);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isConfirm) {
      navigator(ROUTE_PATH.LOGIN)
    }
  }, [isConfirm,navigator]);

  const handleSendCode = () => {
    dispatch(
      register({
        email: email,
        phone: phone,
        password: password,
      })
    );
  };
  const handleRegister = () => {
    dispatch(
      confirmEmail({
        email: email,
        code: code,
      })
    );
  };

  const onChange = (text) => {
    setDisabledBtnLogin(false);
    setCode(+text);
  };

  const sharedProps = {
    onChange,
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      {loading && <LoadingSyncLoader />}
      <div className="bg-white backdrop-blur-lg rounded-xl py-5 px-6 shadow-2xl w-full max-w-md">
        <Form onFinish={handleSendCode} layout="vertical">
          <div className="grid grid-cols-3 grid-rows-5 ">
            <div className="col-span-3">
              <h2 className="text-4xl font-extrabold text-center">Đăng ký</h2>
            </div>
            <div className="col-span-3 row-start-2">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Vui lòng nhập email của bạn",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn",
                  },
                ]}
              >
                <Input onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            </div>
            <div className="col-span-3 row-start-3">
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn",
                  },
                ]}
              >
                <Input onChange={(e) => setPhone(e.target.value)} />
              </Form.Item>
            </div>
            <div className="col-span-3 row-start-4">
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn",
                  },
                ]}
              >
                <Input onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
            </div>
            <div className="col-span-2 row-start-5 flex items-center">
              <Form.Item
                className="m-0"
                name="code"
                rules={[
                  {
                    message: "Vui lòng nhập code của bạn",
                  },
                ]}
              >
                <Input.OTP
                  formatter={(str) => str.toUpperCase()}
                  {...sharedProps}
                />
              </Form.Item>
            </div>
            <div className="col-span-3 col-start-1 row-start-6">
              <Button
                onClick={handleRegister}
                disabled={disabledBtnLogin}
                className="w-full rounded-md py-5 bg-[var(--primary)] text-[var(--textlight)]"
              >
                Đăng ký
              </Button>
            </div>
            <div className="col-start-3 row-start-5 flex items-center justify-end">
              <button
                disabled={!!countdown}
                type="submit"
                className="bg-[var(--primary)] text-[var(--textlight)] px-4 py-2 rounded-md"
              >
                Gửi mã {countdown && `(${countdown}s)`}
              </button>
            </div>
          </div>
          <div className="mt-3">
            <span>Bạn đã có tài khoản ?</span>
            <a href={ROUTE_PATH.LOGIN}> Đăng nhập ngay</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
