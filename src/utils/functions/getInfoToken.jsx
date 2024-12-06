import { jwtDecode } from "jwt-decode";
import getAccessToken from "./getAccessToken";

const getUserNameByToken = () => {
  const token = getAccessToken();
  const decoded = jwtDecode(token);
  return decoded.fullname;
};
const getRoleByToken = () => {
  const token = getAccessToken();
  const decoded = jwtDecode(token);
  return decoded.roles;
};
const getInfoToken = {
  getUserNameByToken,
  getRoleByToken,
};
export default getInfoToken;
