import Header from "./Header"
import { Outlet } from "react-router-dom";

function HeaderOnly() {

    return (
        <div>
            <Header />
            <div className="container">
                <div  className="w-full p-5 m-5 bg-white rounded-xl shadow-lg border-[1px] border-[var(--primary)]"><Outlet/></div>
            </div>
        </div>
    )
}

export default HeaderOnly