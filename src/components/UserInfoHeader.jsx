import { FaRegBell } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";
import { useDispatch } from "react-redux";
import images from "~/assets/images";
import Button from "./buttons/Button";
import { logout } from "~/store/actions/authAction";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { publicRouteinUserAvt } from "../routes/routes";
import { MdManageAccounts, MdLogout, MdNotificationsNone, MdSettings } from "react-icons/md";
import DialogConfirm from "./dialog/DialogConfirm";
import { useState } from "react";
import PropTypes from "prop-types";
import getInfoToken from "~/utils/functions/getInfoToken";
import ROUTE_PATH_ADMIN from "~/routes/admin/routesAdmin";
import { Modal } from "antd";

const { confirm } = Modal;

function UserInfoHeader({ email, fullName, picture }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    confirm({
      title: "Bạn có muốn đăng xuất không?",
      content: "Đăng xuất từ ứng dụng",
      okText: "Đăng xuất",
      cancelText: "Hủy",
      centered: true,
      onOk() {
        dispatch(logout());
      },
      onCancel() { },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <DialogConfirm
        open={open}
        onSubmit={handleLogout}
        title="Bạn có muốn đăng xuất không"
        onClose={() => setOpen(false)}
      />

      {/* Notification Icon */}
      <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-orange-500 transition-colors relative group">
        <MdNotificationsNone size={24} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>

      {/* Settings Icon (Optional/Placeholder) */}
      <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-orange-500 transition-colors mr-2">
        <MdSettings size={22} />
      </button>

      {/* Profile Dropdown */}
      <Tippy
        interactive
        placement="bottom-end"
        render={(attrs) => (
          <div
            className="w-64 bg-white shadow-xl rounded-2xl p-2 border border-gray-100 flex flex-col gap-1"
            tabIndex="-1"
            {...attrs}
          >
            {/* User Info Header in Dropdown */}
            <div className="px-3 py-3 border-b border-gray-50 mb-1">
              <p className="font-bold text-gray-800 truncate">{fullName}</p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>

            {publicRouteinUserAvt.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  to={item.path || ""}
                  key={index}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-orange-600 transition-colors"
                >
                  <span className="mr-3 text-lg">{Icon && <Icon />}</span>
                  {item.name}
                </Button>
              );
            })}

            {(getInfoToken.getRoleByToken() === "Chủ sở hữu" ||
              getInfoToken.getRoleByToken() === "Quản lý") && (
                <Button
                  to={ROUTE_PATH_ADMIN.ADMIN_DASHBOARD}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-orange-600 transition-colors"
                >
                  <span className="mr-3 text-lg"><MdManageAccounts /></span>
                  Quản lý
                </Button>
              )}

            <div className="border-t border-gray-50 mt-1 pt-1">
              <Button
                onClick={() => handleLogout()}
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <span className="mr-3 text-lg"><MdLogout /></span>
                Đăng xuất
              </Button>
            </div>
          </div>
        )}
      >
        <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all pr-4">
          <img
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
            src={picture || images.avt_user_default}
            alt="avatar"
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-700 leading-tight">{fullName}</p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}
UserInfoHeader.propTypes = {
  email: PropTypes.string, // email là một string và bắt buộc
  fullName: PropTypes.string, // fullName là một string và bắt buộc
  picture: PropTypes.string, // picture là một string và bắt buộc (URL ảnh)
};
export default UserInfoHeader;
