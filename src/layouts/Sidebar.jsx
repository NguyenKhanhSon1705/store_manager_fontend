import { useState } from "react";
import { NavLink } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import ROUTE_PATH from "../routes/routesPath";
import { FaBorderAll, FaRegUserCircle } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";

const privateRouteSideBar = [
    { name: "Quản lý nhân viên", icon: FaRegUserCircle, path: ROUTE_PATH.list_user },
    { name: "Chọn cửa hàng", icon: CiShop, path: ROUTE_PATH.shop },
    { name: "Thông tin cửa hàng", icon: IoIosInformationCircleOutline, path: ROUTE_PATH.shop_detail },
    { name: "Gọi món", icon: FaBorderAll, path: ROUTE_PATH.tables_by_area },
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={`
                relative h-[calc(100vh-var(--header-height))] transition-all duration-300 ease-in-out 
                ${collapsed ? 'w-20' : 'w-72'} 
                bg-white border-r border-gray-100 shadow-sm flex flex-col mt-[var(--header-height)]
            `}
        >
            {/* Toggle Button */}
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-end px-4'} py-4`}>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <TiThMenuOutline size={24} />
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-3 space-y-2 overflow-y-auto">
                {privateRouteSideBar.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group select-none
                                ${isActive
                                    ? "bg-orange-50 text-orange-600 font-semibold shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                                }
                                ${collapsed ? 'justify-center' : ''}
                            `}
                            title={collapsed ? item.name : ""}
                        >
                            <span className={`text-2xl ${collapsed ? '' : 'mr-3'} transition-colors`}>
                                {Icon && <Icon />}
                            </span>

                            {!collapsed && (
                                <span className="whitespace-nowrap overflow-hidden text-[15px]">
                                    {item.name}
                                </span>
                            )}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    );
}

export default Sidebar;