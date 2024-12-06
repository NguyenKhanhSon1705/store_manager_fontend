export default function validateInput(input, type) {
    switch (type) {
        case 'email':
            return validateEmail(input);
        case 'empty':
            return validateEmpty(input);
        case 'number':
            return validateNumber(input);
        case 'vnd':
            return validateVND(input);
        default:
            throw new Error('Invalid validation type');
    }
}

// Kiểm tra email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(re.test(email)){
        return false;
    }
     if(!email) return false
    return "Vui lòng nhập email của bạn "
}

// Kiểm tra chuỗi rỗng
function validateEmpty(input) {
    if(!input.trim() === '') return false
    if(input) return false

    return 'Không được để trống';
}

// Kiểm tra số nguyên
function validateNumber(input) {
    const re = /^\d+$/;
    if(re) return false
    return re.test(input);
}

// Kiểm tra số tiền VND và định dạng lại
function validateVND(input) {
    const re = /^\d+$/;
    if (re.test(input)) {
        return formatVND(input);
    } else {
        return false;
    }
}

// Định dạng số tiền theo kiểu "100.000.000.000.000"
function formatVND(input) {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// // Ví dụ sử dụng:
// const vndAmount = "10004000000";
// const formattedVND = validateInput(vndAmount, 'vnd');
// if (formattedVND) {
//     console.log(formattedVND); // "100.000.000.000.000"
// } else {
//     console.log('Invalid VND amount');
// }
