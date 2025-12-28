import Cookies from 'js-cookie';
import actionTypes from './actionTypes'
import { apiConfirmEmail, apiLogin, apiLogout, apiRegister } from '../../services/authService'
import env from '../../constants/env';
import { toast } from 'react-toastify';

export const register = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
        }
    })
    try {
        let response = await apiRegister(payload)
        if (response.data?.isSuccess) {
            toast.success("Vui lòng kiểm tra email của bạn")
            dispatch({
                type: actionTypes.REGISTER,
                payload: {
                    token: null,
                    message: response.data.message,
                    isSuccess: response.data.isSuccess,
                    loading: false
                }
            })
        } else {
            response = response.response
            toast.success(response?.data?.message || Object.values(response?.data?.errors)[0])
            dispatch({
                type: actionTypes.REGISTER,
                payload: {
                    isSuccess: false,
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    token: null,
                    loading: false
                }
            })
        }
    } catch (e) {
        toast.error(e.message)
        dispatch({
            type: actionTypes.REGISTER,
            payload: {
                isSuccess: false,
                message: e.message,
                token: null,
                loading: false
            }
        })
    }


}

export const confirmEmail = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
        }
    })
    try {
        let response = await apiConfirmEmail(payload)
        if (response.data?.isSuccess) {
            toast.success("Đăng ký thành công")
            dispatch({
                type: actionTypes.CONFIRM_EMAIL,
                payload: {
                    token: null,
                    message: response.data.message,
                    isSuccess: response.data.isSuccess,
                    isConfirm: true,
                    loading: false
                }
            })
        } else {

            response = response.response
            toast.error(response?.data?.message || Object.values(response?.data?.errors)[0])
            dispatch({
                type: actionTypes.CONFIRM_EMAIL,
                payload: {
                    isSuccess: false,
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    token: null,
                    isConfirm: false,
                    loading: false

                }
            })
        }
    } catch (e) {
        toast.error(e.message)
        dispatch({
            type: actionTypes.CONFIRM_EMAIL,
            payload: {
                isSuccess: false,
                message: e.message,
                token: null,
                isConfirm: false,
                loading: false

            }
        })
    }
}

export const login = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true
        }
    })
    try {
        let response = await apiLogin(payload)
        if (response?.data?.isSuccess) {

            Cookies.set(env.REACT_APP_COOKIES, response.data.data.accessToken, {
                path: '/',
                expires: new Date(Date.now() + 3600000 * 60), // 1 hour
            })
            Cookies.set(env.REACT_APP_LOGINED, response.data?.isSuccess, {
                path: '/',
                expires: new Date(Date.now() + 3600000 * 60), // 1 hour
            })
            toast.success("Đăng nhập thành công")
            dispatch({
                type: actionTypes.LOGIN,
                payload: {
                    token: response.data.data.accessToken,
                    message: response.data.message,
                    isLogined: true,
                    isSuccess: true,
                    loading: false
                }
            })
        } else {
            const errorMsg = response?.message || response?.data?.message || 'Login failed';
            toast.error(errorMsg)
            dispatch({
                type: actionTypes.LOGIN,
                payload: {
                    isLogined: false,
                    message: errorMsg,
                    isSuccess: false,
                    token: null,
                    loading: false
                }
            })
        }
    }
    catch (e) {
        toast.error(e.message)

        dispatch({
            type: actionTypes.LOGIN,
            payload: {
                isLogined: false,
                message: e.message,
                isSuccess: false,
                loading: false
            }
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        const res = await apiLogout()
        
        if (res) {
        toast.success("Đăng xuất thành công")
            Cookies.remove(env.REACT_APP_COOKIES, { path: '/' });
            Cookies.remove(env.REACT_APP_LOGINED, { path: '/' });
            localStorage.removeItem(env.REACT_APP_IDSHOP)
            dispatch({
                type: actionTypes.LOGOUT,
                payload: {
                    isLogined: false,
                    message: "Logged Out Successfully",
                    loading: false
                }
            })
        }
    } catch (e) {
        console.log(e);
    }


}

