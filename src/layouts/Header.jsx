import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images from "../assets/images";
import { useSelector } from "react-redux";
import UserInfoHeader from "../components/UserInfoHeader";
import ROUTE_PATH from "../routes/routesPath";
import getAccessToken from "~/utils/functions/getAccessToken";

function Header() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const token = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(ROUTE_PATH.LOGIN);
    }
  }, [navigate, token]);

  return (
    <div className="h-[var(--header-height)] w-full bg-white px-20 fixed z-20 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo Section */}
        <div className="w-[90px] h-[35px] relative">
          <img className="w-full h-full object-contain" alt="logo" src={images.logo} />
        </div>

        {/* Shop Name */}
        <div className="flex-1 px-8">
          <h2 className="text-gray-800 font-bold text-lg truncate flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {currentUser.shopName}
          </h2>
        </div>

        {/* User Info */}
        <UserInfoHeader
          email={currentUser.email}
          fullName={currentUser.fullName}
          picture={currentUser.picture}
        />
      </div>
    </div>
  );
}

export default Header;
