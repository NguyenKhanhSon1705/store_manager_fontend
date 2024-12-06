function calculateMinutesDifference(serverTime) {
    // Chuyển serverTime thành Date
    const serverDate = new Date(serverTime);
  
    // Lấy thời gian hiện tại (UTC)
    const currentDate = new Date();
  
    // Tính chênh lệch thời gian (ms)
    const diffInMs = Math.abs(currentDate - serverDate);
  
    // Chuyển đổi ms sang phút
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
    return diffInMinutes;
  }

const handleDatetimeMinute = {
    calculateMinutesDifference
}
export default handleDatetimeMinute