export function validatePriceVND(value) {
    if (!value) return '';

    // Chuyển đổi giá trị thành số và kiểm tra xem có hợp lệ không
    const numberValue = Number(value.replace(/[^0-9]/g, ''));
    if (isNaN(numberValue)) return '';

    // Định dạng số với dấu chấm
    return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export const removeDotsVND = (inputString) => {
    if(inputString){
        return inputString.replace(/\./g, '');
    }
    // Sử dụng phương thức replace để loại bỏ tất cả dấu chấm
  };