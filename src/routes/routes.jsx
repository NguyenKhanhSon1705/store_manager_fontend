

import { CiShop } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { FaBorderAll } from "react-icons/fa6";

import ForgotPassword from "../pages/Authen/ForgotPassword"
import Login from "../pages/Authen/Login"
import Register from "../pages/Authen/Register"
import CreateShop from "../pages/shop/CreateShop"
import Shop from "../pages/shop/Shop"
import UserInfoDetails from "../pages/user/UserInfoDetails"
import UserManage from "../pages/user/UserManage"
import ShopDetails from "../pages/shop/ShopDetails";

import TablesByArea from "../pages/order/TablesByArea";
import ChooseDishForTable from "../pages/order/ChooseDishForTable";
import ROUTE_PATH from "./routesPath";
import UserInfo from "../pages/user/UserInfo";
import { FaRegUserCircle } from "react-icons/fa";
import Checkout from "~/pages/order/Checkout";
import PaymentNotication from "~/pages/vnpay/PaymentNotication";

const publicRoute = [
    {name: "Đăng nhập", path:ROUTE_PATH.LOGIN , component: Login , layout:null},
    {name: "Đăng ký", path:ROUTE_PATH.register , component: Register , layout:null},
    {name: "Quên mật khẩu",path:ROUTE_PATH.forgotpassword , component: ForgotPassword, layout:null},
]

const privateRouteSideBar = [
    {name:"Quản lý nhân viên", icon:FaRegUserCircle, path:ROUTE_PATH.list_user , component: UserManage},
    {name:"Thông tin cửa hàng", icon:IoIosInformationCircleOutline, path:ROUTE_PATH.shop_detail , component: ShopDetails},

    {name:"Đặt bàn", icon:FaBorderAll, path:ROUTE_PATH.tables_by_area , component: TablesByArea},
]
const privateRouteNotLayout = [
    {name:"Chọn cửa hàng", icon:CiShop, path:ROUTE_PATH.shop , component: Shop, layout: null},
]

const privateRouteDetail = [
    // routes liên quan đến người dùng
    {name:"Thông tin cá nhân", path:ROUTE_PATH.user_detail , component: UserInfoDetails},
    // ROUTE_PATH liên liên quan đến cửa hàng
    {name:"Cửa hàng", path:ROUTE_PATH.shop , component: Shop , layout: null},
    {name:"Thêm cửa hàng", path:ROUTE_PATH.create_shop , component: CreateShop , layout: null},
    {name:"Thông tin cửa hàng", path:ROUTE_PATH.update_shop , component: ShopDetails},
    //checkout
    {name:"", icon:FaBorderAll, path:ROUTE_PATH.choose_dish_table , component: ChooseDishForTable},
    {path: ROUTE_PATH.CHECK_OUT , component: Checkout},
    {path: ROUTE_PATH.PAYMENT_INFO, component: PaymentNotication}
]

const publicRouteinUserAvt = [
    {name: "Thông tin cá nhân", icon: FaRegUserCircle , path:ROUTE_PATH.USER_INFO , component: UserInfo}
]

export {publicRoute,privateRouteNotLayout , privateRouteDetail , privateRouteSideBar ,publicRouteinUserAvt }