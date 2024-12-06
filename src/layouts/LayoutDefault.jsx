import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function LayoutDefault() {
    
    return ( 
        <div className="h-full w-full">
            <Header></Header>
            <div className="flex">
                <Sidebar ></Sidebar>
                <div className="w-full p-5 m-5 bg-white rounded-md shadow-md mt-[90px]">
                    <Outlet/>
                </div>
            </div>
        </div>
     );
}
export default LayoutDefault;