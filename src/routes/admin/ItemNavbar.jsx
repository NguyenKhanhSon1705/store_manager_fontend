import { BiCategoryAlt, BiLock } from "react-icons/bi";
import { FaMoneyBillTrendUp, FaShop, FaTableCells } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { BiDish } from "react-icons/bi";
import { AiOutlineBarChart, AiOutlineGroup } from "react-icons/ai";
import { FaChartArea } from "react-icons/fa6";
import { MdOutlineCancelScheduleSend, MdOutlineChangeCircle, MdTableChart } from "react-icons/md";
import { MdOutlineSummarize } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";

import { Link } from "react-router-dom";
import ROUTE_PATH_ADMIN from "~/routes/admin/routesAdmin";
import { FaStore, FaUserEdit, FaUsers } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const items = [
  {
    key: "sub2",
    label: "Tổng quan",
    icon: <LuSend />,
    children: [
      {
        key: "7",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_DASHBOARD}>
            Bảng điều khiển
          </Link>
        ),
        icon: <AiOutlineBarChart />,
      },
      {
        key: "8",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_STATISTIC}>
            Thống kê doanh thu
          </Link>
        ),
        icon: <MdOutlineSummarize />,
      },
      {
        key: "91",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_TABLES}>
            Quản lý Sơ đồ
          </Link>
        ),
        icon: <MdTableChart />,
      },
    ],
  },

  {
    key: "sub3",
    label: "Khu vực - Phòng bàn",
    icon: <FaTableCells />,
    children: [
      {
        key: "11",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_AREA}>
            Khu vực
          </Link>
        ),
        icon: <FaChartArea />,
      },
      {
        key: "111",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_TABLE}>
            Phòng bàn
          </Link>
        ),
        icon: <MdTableChart />,
      },
    ],
  },
  {
    key: "sub4",
    label: "Danh mục",
    icon: <BiCategoryAlt />,
    children: [
      {
        key: "22",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_DISH}>
            Sản phẩm - Dịch vụ
          </Link>
        ),
        icon: <BiDish />,
      },
      {
        key: "135",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_GROUP_MENU}>
            Nhóm sản phẩm
          </Link>
        ),
        icon: <AiOutlineGroup />,
      },
    ],
  },
  {
    key: "sub5",
    label: "Cửa hàng",
    icon: <FaShop />,
    children: [
      {
        key: "21",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_SHOP_INFO}>
            Thông tin cửa hàng
          </Link>
        ),
        icon: <FaStore />,
      },
      {
        key: "13",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_CHOOSE_SHOP}>
            Thay đổi cửa hàng
          </Link>
        ),
        icon: <MdOutlineChangeCircle />,
      },
    ],
  },
  {
    key: "sub6",
    label: "Nhân viên - khách hàng",
    icon: <FaUserEdit />,
    children: [
      {
        key: "212",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_USER_MANAGER}>
            Quản lý nhân viên
          </Link>
        ),
        icon: <FiUsers />,
      },
      {
        key: "101",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_USER_MANAGER}>
            Tài khoản bị khóa
          </Link>
        ),
        icon: <BiLock />,
      },
      {
        key: "1311",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_DASHBOARD}>
            Khách hàng
          </Link>
        ),
        icon: <FaUsers />,
      },
    ],
  },
  {
    key: "sub7",
    label: "Báo cáo",
    icon: <AiOutlineBarChart />,
    children: [
      {
        key: "211",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_REPORT_BILL}>
            Lịch sử thanh toán
          </Link>
        ),
        icon: <FaMoneyBillTrendUp />,
      },
      {
        key: "131",
        label: (
          <Link className="font-poppins" to={ROUTE_PATH_ADMIN.ADMIN_REPORT_ABORT}>
            Lịch sử hủy món
          </Link>
        ),
        icon: <MdOutlineCancelScheduleSend />,
      },
    ],
  },
];

export default items;
