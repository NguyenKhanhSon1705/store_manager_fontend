import Areas from "~/pages/shop/Areas";

import Dashboard from "~/views/admin/default";
import ROUTE_PATH_ADMIN from "./routesAdmin";
import Tables from "~/pages/shop/Tables";
import TablesAdmin from "~/views/admin/tables";
import { Dish, GroupMenu } from "~/pages/dish";
import Marketplace from "~/views/admin/marketplace";
import ProfileOverview from "~/views/admin/profile";
import Shop from "~/pages/shop/Shop";
import ShopDetails from "~/pages/shop/ShopDetails";
import UserManage from "~/pages/user/UserManage";
import ReportAborted from "~/pages/reports/ReportAborted";
import ReportBill from "~/pages/reports/ReportBill";


const routesAdminSidebar = [
    {
        path: ROUTE_PATH_ADMIN.ADMIN_DASHBOARD, component: Dashboard
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_MARKET, component: Marketplace
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_PROFILE, component: ProfileOverview
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_TABLES, component: TablesAdmin
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_AREA, component: Areas
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_TABLE, component: Tables
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_DISH, component: Dish
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_GROUP_MENU, component: GroupMenu
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_CHOOSE_SHOP, component: Shop
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_SHOP_INFO, component: ShopDetails
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_USER_MANAGER, component: UserManage
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_REPORT_ABORT, component: ReportAborted
    },
    {
        path: ROUTE_PATH_ADMIN.ADMIN_REPORT_BILL, component: ReportBill
    }
    
]

const routesAdmin = {
    routesAdminSidebar
}

export default routesAdmin