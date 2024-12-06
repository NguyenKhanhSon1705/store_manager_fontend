

import { useEffect, useState } from "react";

import { FaFacebook } from "react-icons/fa6";

import Input from '../../components/inputs/Input';
import Button from "../../components/buttons/Button";
import routes from '../../routes/routesPath'


const ForgotPassword = () => {
    // routes.login
    const [countdown, setCountdown] = useState('')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const [disabledInput, setDisabledInput] = useState(false)
    const [disabledCode, setDisabledCode] = useState(true)
    const [disabledBtnLogin, setDisabledBtnLogin] = useState(true)
    const [disabledBtnCode, setDisabledBtnCode] = useState(true)
    const [on, setOn] = useState(false)
    useEffect(() => {
        if (email !== '') {
            setDisabledCode(false)
            setDisabledBtnCode(false)
        } else {
            setDisabledBtnCode(true)
            setDisabledCode(true)
        }
    }, [email])

    useEffect(() => {
        code !== '' && code.length === 6 ? setDisabledBtnLogin(false) : setDisabledBtnLogin(true)
    }, [code])

    useEffect(() => {
        if (on) {
            const timerId = setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000);
            if (countdown <= 0) {
                setOn(false)
                setDisabledBtnCode(false)
                setCountdown()
            }
            return () => {
                clearTimeout(timerId)
            }
        }
    }, [countdown, on])

    const BtnSendCode = () => {
        setOn(true)
        setCountdown(120)
        setDisabledBtnCode(true)
        setDisabledInput(true)
        // let ob = {
        //     email: email
        // }
        // console.log(ob)
    }

    const BtnLogin = () => {

        // let ob = {
        //     email: email,
        //     password: password,
        //     code: code,
        // }
        // console.log(ob)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--primary)]">
            <div className=" bg-[rgba(255,255,255,0.9)] backdrop-blur-lg rounded-xl  py-10 px-4 shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold mb-6 text-center">Quên mật khẩu</h2>
                <div className="space-y-6">
                    <div className="relative">
                        <Input
                            label={"Email"}
                            type={'email'}
                            rule={'email'}
                            disabled={disabledInput}
                            value={email.trim()}
                            onChange={e => setEmail(e)}
                        />
                    </div>

                    <div className="relative flex w-full ">
                        <div className="w-2/3">
                            <Input
                                label={"Mã gồm 6 chữ số"}
                                type={'number'}
                                rule={'empty'}
                                value={code}
                                disabled={disabledCode}
                                onChange={e => setCode(e)}
                            />
                        </div>

                        <Button
                            onClick={BtnSendCode}
                            disabled={disabledBtnCode}
                            classDiff={"w-1/3 rounded-md rounded-bl-none bg-[var(--primary)] text-white px-0 py-0 "}
                        >
                            Gửi mã {countdown && `(${countdown}s)`}
                        </Button>
                    </div>

                    <div className="relative">
                        <Input
                            label={"Mật khẩu"}
                            type={'password'}
                            rule={'empty'}
                            disabled={disabledBtnLogin}
                            value={password}
                            onChange={e => { setPassword(e) }}
                        />
                    </div>
                    
                    <Button
                        to={''}
                        onClick={BtnLogin}
                        primary={true}
                        rounded={true}
                        large={true}
                        disabled={disabledBtnLogin}
                    >
                        Đăng ký
                    </Button>
                </div>
                <p className=" text-center text-sm p-5">Hoặc đăng nhập với</p>
                <div className="w-full flex justify-center">
                    <Button
                        classDiff={'text-white bg-blue-600 hover:bg-blue-700 '}
                        large={true}
                        rounded={true}
                        leftIcon={<FaFacebook />}
                    >
                        Facebook
                    </Button>
                </div>

                <p className=" text-center mt-6 text-sm ">
                    Bạn đã có tài khoản
                    <Button href={routes.login} className="font-bold hover:underline pl-1">Đăng nhập</Button>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword