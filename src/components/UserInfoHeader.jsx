import { FaRegBell } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";
import { useDispatch } from "react-redux";
import images from "~/assets/images";
import Button from "./buttons/Button";
import { logout } from "~/store/actions/authAction";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { publicRouteinUserAvt } from "../routes/routes";

import { MdLogout } from "react-icons/md";
import DialogConfirm from "./dialog/DialogConfirm";
import { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

const {confirm} = Modal
function UserInfoHeader({ email, fullName, picture }) {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
   
    const handleLogout = () =>{
        confirm({
            title: 'Bạn có muốn đăng xuất không',
            content: 'Đăng xuất từ ứng dụng',
            okText: "Đăng xuất",
            cancelText: "Hủy",
            centered: true,
            onOk() {
                dispatch(logout())
            },
            onCancel() {},
        });
    }
    return (
        <div className="text-white flex items-center">
            <DialogConfirm
                open={open}
                onSubmit={handleLogout}
                title="Bạn có muốn đăng xuất không"
                onClose={() => setOpen(false)}
            />
            <p className="mx-3 text-[20px]">
                <FaRegBell ></FaRegBell>
            </p>
            <p className="mx-3 text-[20px]">
                <IoIosOptions ></IoIosOptions>
            </p>
            <Tippy
                interactive
                render={attrs => (
                    <div
                        className="box shadow-md rounded-b-lg p-2 bg-[var(--textlight)] text-gray-600"
                        tabIndex="-1" {...attrs}>
                        {publicRouteinUserAvt.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <Button
                                    to={item.path ||  ''}
                                    leftIcon={Icon && <Icon />}
                                    key={index} >
                                    {item.name}
                                </Button>
                            );
                        })}
                        <Button
                        onClick={() => handleLogout()}
                        leftIcon={<MdLogout />}
                        >Đăng xuất</Button>
                    </div>
                )}
            >

                <div className="ml-3 flex items-center ">
                    <p className="px-2 text-[15px]">{fullName || email}</p>
                    <img className="w-[50px] h-[50px] rounded-full shadow-lg bg-white" src={picture || images.avt_user_default} alt="" />
                </div>
            </Tippy>


        </div>
    );
}
UserInfoHeader.propTypes = {
    email: PropTypes.string,  // email là một string và bắt buộc
    fullName: PropTypes.string,  // fullName là một string và bắt buộc
    picture: PropTypes.string,  // picture là một string và bắt buộc (URL ảnh)
};
export default UserInfoHeader;