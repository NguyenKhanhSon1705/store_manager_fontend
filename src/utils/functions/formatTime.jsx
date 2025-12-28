import moment from "moment";

const hourAndMinute = (isoString) => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
const dateAndYear = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatMinute = (serverTime) => {
  // Chuyển serverTime thành Date
  const serverDate = new Date(serverTime);

  // Lấy thời gian hiện tại (UTC)
  const currentDate = new Date();

  // Tính chênh lệch thời gian (ms)
  const diffInMs = Math.abs(currentDate - serverDate);

  // Chuyển đổi ms sang phút
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  // Tính giờ và phút
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  // Trả về chuỗi giờ phút
  return `${hours > 0 ? `${hours} giờ ` : ""}${minutes} phút`;
};

const formatDateYYMMDD = (startDate) => {
  startDate ? moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD") : null;
};
const formatTime = {
  hourAndMinute,
  dateAndYear,
  formatMinute,
  formatDateYYMMDD
};
export default formatTime;
