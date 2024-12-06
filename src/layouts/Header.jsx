import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import images from "../assets/images";
import { useSelector } from "react-redux";
import Button from "../components/buttons/Button";
import Cookies from "js-cookie";
import UserInfoHeader from "../components/UserInfoHeader";
import env from "../constants/env";
import ROUTE_PATH from "../routes/routesPath";
function Header() {
    const { currentUser } = useSelector(state => state.currentUser);
    const logined = Cookies.get(env.REACT_APP_LOGINED);
    const navigate = useNavigate()

    useEffect(() => {
        if (!logined) {
            navigate(ROUTE_PATH.LOGIN)
        }
    }, [logined, currentUser.email, navigate]);

    return (
        <div className="h-[var(--header-height)] w-full bg-[var(--primary)] px-20 fixed z-20">
            <div className="w-full h-full flex items-center justify-between">
                <div className="w-[90px] h-[35px] relative">
                    <img className="w-full h-full" alt="logo" src={images.logo} />
                </div>

                <div className="w-1/4" >
                    <h2 className="text-[var(--textlight)] font-bold">{currentUser.shopName}</h2>
                </div>
                {
                    logined ?
                        <UserInfoHeader
                            email={currentUser.email}
                            fullName={currentUser.fullName}
                            picture={currentUser.picture}
                        />
                        :
                        <div className="text-white flex items-center">
                            <Button
                                to={ROUTE_PATH.LOGIN}
                                outline={true}
                                rounded={true}

                            >Đăng nhập</Button>
                            <Button
                                to={ROUTE_PATH.register}

                            >Đăng Ký</Button>
                        </div>
                }
            </div>
        </div>
    );
}

export default Header