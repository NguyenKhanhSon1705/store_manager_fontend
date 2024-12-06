import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAccessToken from "../utils/functions/getAccessToken";
import ROUTE_PATH from "./routesPath";
import { useEffect } from "react";
import { setNavigate } from "./navigateService";

function ProtectRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate); // Lưu navigate để sử dụng trong service
  }, [navigate]);
  const accessToken = getAccessToken();
  if (!accessToken) {
      console.log("Vui lòng đăng nhập");
      toast.warning("Vui lòng đăng nhập");
      return <Navigate to={ROUTE_PATH.LOGIN} />;
    }
    return <Outlet />;
}

export default ProtectRoute;