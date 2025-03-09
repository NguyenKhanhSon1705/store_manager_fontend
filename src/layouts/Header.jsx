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
    <div className="h-[var(--header-height)] w-full bg-[var(--primary)] px-20 fixed z-20">
      <div className="w-full h-full flex items-center justify-between">
        <div className="w-[90px] h-[35px] relative">
          <img className="w-full h-full" alt="logo" src={images.logo} />
        </div>

        <div className="w-1/4">
          <h2 className="text-[var(--textlight)] font-bold">
            {currentUser.shopName}
          </h2>
        </div>
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
