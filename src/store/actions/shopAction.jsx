import { apiCreateShop, apiDeleteShop, apiGetListShopUser, apiGetShopById, apiUpdateShop } from "../../services/shopService"
import actionTypes from "./actionTypes"
import env from "../../constants/env"
export const listShop = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
        }
    })

    try {
        var response = await apiGetListShopUser();

        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_LIST_SHOP,
                payload: {
                    message: response.data.Message,
                    isSuccess: response.data.IsSuccess,
                    data: response.data.data,
                    loading: false
                }
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_LIST_SHOP,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                    data: [],
                    loading: false
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.GET_LIST_SHOP,
            payload: {
                message: e.message,
                loading: false
            }
        })
    }
}

export const getShopById = (payload) => async (dispatch) => {
    try {
        var response = await apiGetShopById(payload);

        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_SHOP_BY_ID,
                payload: {
                    message: response.data.Message,
                    isSuccess: response.data.IsSuccess,
                    data: response.data.data,
                    loading: false
                }
            })
        }
        else {
            response = response.response
            dispatch({
                type: actionTypes.GET_SHOP_BY_ID,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                    data: [],
                    loading: false
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.GET_SHOP_BY_ID,
            payload: {
                message: e.message
            }
        })
    }
}

export const createShop = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING,
        payload: {
            loading: true,
        }
    })

    try {
        var response = await apiCreateShop(payload);
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.CREATE_SHOP,
                payload: {
                    message: response.data.Message,
                    data: response.data.data,
                    update: true,
                    loading: false
                }
            })
        }
        else {
            response = response.response
            dispatch({
                type: actionTypes.CREATE_SHOP,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                    update: false,
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.CREATE_SHOP,
            payload: {
                message: e.message,
                loading: false,
                update: false,
            }
        })
    }
}

export const updateShop = (payload) => async (dispatch) => {
    try {
        var response = await apiUpdateShop(payload);

        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.UPDATE_SHOP,
                payload: {
                    message: response.data.Message,
                    isSuccess: response.data.IsSuccess,
                    data: response.data.data,
                }
            })
        }
        else {
            dispatch({
                type: actionTypes.UPDATE_SHOP,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                    data: [],
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.UPDATE_SHOP,
            payload: {
                message: e.message,
            }
        })
    }
}

export const deleteShop = (payload) => async (dispatch) => {
    try {
        let response = await apiDeleteShop(payload);

        if (response.data?.isSuccess) {

            localStorage.removeItem(env.REACT_APP_IDSHOP)

            dispatch({
                type: actionTypes.DELETE_SHOP,
                payload: {
                    message: response.data.Message,
                    isSuccess: response.data.IsSuccess,
                    data: [],
                }
            })
        }
        else {
            response = response.response    
            dispatch({
                type: actionTypes.DELETE_SHOP,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.DELETE_SHOP,
            payload: {
                message: e.message,
                loading: false
            }
        })
    }
}