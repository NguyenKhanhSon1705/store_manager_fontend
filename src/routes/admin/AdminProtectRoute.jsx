import { Navigate, Outlet } from "react-router-dom";
import getAccessToken from "~/utils/functions/getAccessToken";
import ROUTE_PATH from "../routesPath";
import { jwtDecode } from "jwt-decode"; // Sửa lại import nếu cần
import { toast } from "react-toastify";

function AdminProtectRoute() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    toast.warning("Vui lòng đăng nhập");
    return <Navigate to={ROUTE_PATH.LOGIN} />;
  }

  try {
    const tokenPayload = jwtDecode(accessToken);
    const allowedRoles = ["Chủ sở hữu", "Quản lý"];

    if (!allowedRoles.includes(tokenPayload.roles)) {
      // Nếu vai trò không hợp lệ, chuyển hướng đến trang home
      toast.error("Bạn không có quyền truy cập vào trang này");
      return <Navigate to={ROUTE_PATH.HOME} />;
    }
  } catch {
    // Nếu token không hợp lệ, chuyển hướng đến login
    toast.error("Token không hợp lệ, vui lòng đăng nhập lại");
    return <Navigate to={ROUTE_PATH.LOGIN} />;
  }

  // Nếu đủ điều kiện, hiển thị nội dung
  return <Outlet />;
}

export default AdminProtectRoute;
