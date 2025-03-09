import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import Button from "../components/buttons/Button";
import ROUTE_PATH from "../routes/routesPath";
import { FaBorderAll, FaRegUserCircle } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
// import { privateRouteSideBar } from "../routes/routes";
const privateRouteSideBar = [
    {name:"Quản lý nhân viên", icon:FaRegUserCircle, path:ROUTE_PATH.list_user},
    {name:"Chọn cửa hàng", icon:CiShop, path:ROUTE_PATH.shop},
    {name:"Thông tin cửa hàng", icon:IoIosInformationCircleOutline, path:ROUTE_PATH.shop_detail},
 
    {name:"Đặt bàn", icon:FaBorderAll, path:ROUTE_PATH.tables_by_area},
]
function Sidebar() {
    const [hidden, setHidden] = useState(false)

    const onHidden = () => {
        setHidden(!hidden)
    }

    return (
        <div className={`relative h-full transition-all duration-500 ease-in-out ${hidden ? 'w-[50px]' : 'w-[25%]'}  relative text-white bg-[var(--primary)] mt-[var(--header-height)] shadow-inner pt-10`}>
            <div className="absolute top-0 right-[8px] p-1 rounded-full ">
                <button
                    onClick={onHidden}
                >
                    <TiThMenuOutline></TiThMenuOutline>
                </button>
            </div>

            <div className="flex flex-col ">
                {
                    privateRouteSideBar.map((btn, index) => {
                        const Icon = btn.icon
                        return (
                            <Button
                                key={index}
                                to={btn.path}
                                className="text-[20px] border-b-2 py-2 border-[var(--primary-border)]"
                            >
                                <div className=" flex items-center ">
                                    <p className="mb-1 mx-2 text-[30px]">
                                        {Icon && <Icon></Icon>}
                                    </p>
                                    <p className={`${Icon ?'': 'mx-7'} text-[18px] whitespace-nowrap`}>{!hidden && btn.name}</p>
                                </div>
                            </Button>
                        )
                    })
                }
                <div className="absolute bottom-10 right-1/2 translate-x-1/2">
                </div>
            </div>
        </div>
    );
}

export default Sidebar;