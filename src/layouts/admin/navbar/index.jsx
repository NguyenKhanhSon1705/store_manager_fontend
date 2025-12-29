/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { FiAlignJustify } from "react-icons/fi";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

import Dropdown from "~/components/dropdown";
import { logout } from "~/store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import ROUTE_PATH from "~/routes/routesPath";
import images from "~/assets/images";
import getAccessToken from "~/utils/functions/getAccessToken";

const { confirm } = Modal;
const Navbar = (props) => {
  const { onOpenSidenav, brandText, onClick } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const { picture, fullName, email, shopName } = useSelector(
    (state) => state.currentUser.currentUser
  );
  const dispatch = useDispatch();

  const token = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(ROUTE_PATH.LOGIN);
    }
  }, [navigate, token]);

  const handleLogout = () => {
    confirm({
      title: "Xác nhận đăng xuất",
      content: "Bạn có chắc chắn muốn rời khỏi hệ thống?",
      okText: "Đăng xuất",
      cancelText: "Hủy",
      centered: true,
      okButtonProps: { danger: true },
      onOk() {
        dispatch(logout());
      },
    });
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-2xl bg-white/40 p-2 backdrop-blur-2xl dark:bg-[#0b14374d] border border-white/20 dark:border-navy-700 transition-all">
      <div className="ml-[6px]">
        <div className="h-6 pt-1 flex items-center gap-1">
          <a
            className="text-xs font-medium text-gray-500 hover:text-orange-500 transition-colors dark:text-gray-400"
            href="#"
          >
            Trang chủ
          </a>
          <span className="text-gray-400 text-xs">/</span>
          <Link
            className="text-xs font-semibold capitalize text-orange-600 dark:text-orange-400"
            to="#"
          >
            {brandText?.replace('admin/', '') || 'Dashboard'}
          </Link>
        </div>
        <p className="shrink text-[20px] mt-1 capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-black tracking-tight hover:text-orange-500 transition-colors"
          >
            {shopName || "Cửa hàng của tôi"}
          </Link>
        </p>
      </div>

      <div className="flex items-center gap-3 bg-white/70 dark:bg-navy-800 p-1.5 rounded-2xl shadow-sm border border-white/50 dark:border-navy-700">
        <div className="hidden md:flex items-center bg-gray-50 dark:bg-navy-900 rounded-xl px-3 py-1.5 border border-transparent focus-within:border-orange-500/30 focus-within:bg-white transition-all w-60">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Tìm nhanh..."
            className="ml-2 bg-transparent text-sm font-medium text-navy-700 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500 w-full"
          />
        </div>

        <button
          className="md:hidden p-2 text-gray-600 dark:text-white hover:bg-gray-100 rounded-lg"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify size={20} />
        </button>

        <div className="flex items-center gap-1 border-l border-gray-100 dark:border-navy-700 ml-1 pl-2">
          {/* Notifications */}
          <Dropdown
            button={
              <div className="p-2 text-gray-500 dark:text-white hover:bg-orange-50 dark:hover:bg-navy-700 rounded-xl transition-colors cursor-pointer relative">
                <IoMdNotificationsOutline size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
            }
            animation="origin-top-right transition-all duration-300 ease-in-out"
            classNames={"py-2 top-8 -right-[230px] md:-right-[110px] w-max"}
          >
            <div className="flex w-[320px] flex-col gap-3 rounded-2xl bg-white p-4 shadow-2xl border border-gray-50 dark:bg-navy-800 dark:text-white dark:border-navy-700">
              <div className="flex items-center justify-between border-b pb-3 mb-1">
                <p className="text-md font-bold text-navy-700 dark:text-white">Thông báo</p>
                <button className="text-xs font-bold text-orange-600 hover:text-orange-500 uppercase tracking-tighter">Đánh dấu đã đọc</button>
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {[1, 2].map(i => (
                  <div key={i} className="flex gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                    <div className="h-10 w-10 flex-shrink-0 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                      <BsArrowBarUp size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 leading-tight mb-1">Cập nhật hệ thống v2.0</p>
                      <p className="text-xs text-gray-500 line-clamp-2">Nhiều tính năng mới đã được cập nhật cho phần quản lý...</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-600 text-center">Xem tất cả thông báo</button>
            </div>
          </Dropdown>

          {/* Theme Toggle */}
          <div
            className="p-2 text-gray-500 dark:text-white hover:bg-orange-50 dark:hover:bg-navy-700 rounded-xl transition-colors cursor-pointer"
            onClick={() => {
              onClick(darkmode ? "light" : "dark");
              if (darkmode) {
                document.body.classList.remove("dark");
                setDarkmode(false);
              } else {
                document.body.classList.add("dark");
                setDarkmode(true);
              }
            }}
          >
            {darkmode ? <RiSunFill size={20} /> : <RiMoonFill size={20} />}
          </div>

          {/* User Profile */}
          <div className="ml-1 pl-1">
            <Dropdown
              button={
                <div className="flex items-center gap-2 p-1 pl-2 hover:bg-gray-50 dark:hover:bg-navy-700 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                  <div className="hidden lg:block text-right mr-1">
                    <p className="text-xs font-bold text-gray-800 dark:text-white leading-none mb-1">{fullName?.split(' ').pop() || 'User'}</p>
                    <p className="text-[10px] text-gray-400 font-medium leading-none">Chủ cửa hàng</p>
                  </div>
                  <img
                    className="h-9 w-9 rounded-lg object-cover ring-2 ring-white dark:ring-navy-800"
                    src={picture || images.avt_user_default}
                    alt="User"
                  />
                </div>
              }
              classNames={"py-2 top-8 -right-[10px] w-max"}
            >
              <div className="flex w-64 flex-col rounded-2xl bg-white shadow-2xl border border-gray-50 dark:bg-navy-800 dark:text-white dark:border-navy-700 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                  <p className="text-xs font-medium text-white/80 mb-1">Xin chào,</p>
                  <p className="text-lg font-bold truncate">{fullName || email}</p>
                  <p className="text-[10px] text-white/70 mt-3 truncate">{email}</p>
                </div>

                <div className="p-2 space-y-1">
                  <Link to="#" className="flex items-center gap-3 p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-navy-700 hover:text-orange-600 rounded-xl transition-all">
                    <span>Hồ sơ cá nhân</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-3 p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-navy-700 hover:text-orange-600 rounded-xl transition-all">
                    <span>Cài đặt bảo mật</span>
                  </Link>
                  <div className="h-px bg-gray-100 dark:bg-navy-700 my-2 mx-2" />
                  <Link to={ROUTE_PATH.tables_by_area} className="flex items-center gap-3 p-3 text-sm font-bold text-orange-600 hover:bg-orange-600 hover:text-white rounded-xl transition-all">
                    <MdDashboard />
                    <span>Màn hình Bán hàng</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all mt-2"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
