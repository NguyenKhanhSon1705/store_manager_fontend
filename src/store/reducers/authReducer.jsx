import actionTypes from "../actions/actionTypes"

const initStateAuth = {
    isLogined: false,
    token: null,
    message: '',
    isSuccess: false,
    isConfirm: false,
    loading: false
}
const authReducer = (state = initStateAuth, action) => {
    switch (action.type) {
        case actionTypes.LOADING: {
            return {
                loading: action.payload.loading,
            }
        }
        case actionTypes.REGISTER: {
            return {
                ...state,
                isLogined: action.payload.isLogined,
            
                isSuccess: action.payload.isSuccess,
                loading: action.payload.loading,
                token : null
            }
        }
        case actionTypes.CONFIRM_EMAIL:{
            return {
                ...state,
                isLogined: false,
               
                isSuccess: action.payload.isSuccess,
                loading: action.payload.loading,
                isConfirm: action.payload.isConfirm,
                token: null
            }
        }
        case actionTypes.LOGIN: {
            return {
                ...state,
                isLogined: action.payload.isLogined,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess,
                loading: action.payload.loading,
                token: action.payload.token
            }
        }
        case actionTypes.LOGOUT: {
            return {
                ...state,
                isLogined: false,
                message: "Vui lòng đăng nhập",
                isSuccess: false,
                loading: false,
                token: null
            }
        }
        default:
            return state;
    }
}

export default authReducer