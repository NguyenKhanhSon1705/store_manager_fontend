import { Navigate, Outlet } from "react-router-dom";
import getAccessToken from "../utils/functions/getAccessToken";
import ROUTE_PATH from "./routesPath";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function AdminProtectRoute() {
  const accessToken = getAccessToken();
  // if (!accessToken) return <Navigate to={ROUTE_PATH.LOGIN} />;

  const tokenPayload = jwtDecode(accessToken);
  console.log("Token: ", tokenPayload.roles);

  if(tokenPayload.roles !== "Chủ sở hữu"){
    toast.error("Bạn không có quyền truy cập vào trang này");
    return <Navigate to={ROUTE_PATH.HOME} />;
  }

  if (!accessToken) {
    toast.warning("Vui lòng đăng nhập");
    return <Navigate to={ROUTE_PATH.LOGIN} />;
  }

  return <Outlet />;
}

export default AdminProtectRoute;
