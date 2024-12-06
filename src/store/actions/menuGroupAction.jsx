import { toast } from "react-toastify"
import { apiCreateMenuGroup, apiDeleteMenuGroup, apiGetAllMenuGroup, apiGetNameMenuGroup, apiUpdateMenuGroup } from "../../services/menuGroupService"
import actionTypes from "./actionTypes"

export const createMenuGroup = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_MENU_GROUP,
        payload: {
            update: true,
        }
    })
    try{
        let response = await apiCreateMenuGroup(payload)
        if(response?.data?.isSuccess){
            dispatch({
                type: actionTypes.CREATE_MENU_GROUP,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    update: false,
                }
            })
        }else{
            response = response.response
            dispatch({
                type: actionTypes.ERROR_MENU_GROUP,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                    update: false,
                }
            })
        }
    }catch (e){
        dispatch({
            type: actionTypes.ERROR_MENU_GROUP,
            payload: {
                message: e.message,
                update: false,
            }
        })
    }
}

export const updateMenuGroup = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_MENU_GROUP,
        payload: {
            update: true,
        }
    })
    try{
        let response = await apiUpdateMenuGroup(payload)
        if(response.data?.isSuccess){
            dispatch({
                type: actionTypes.UPDATE_MENU_GROUP,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    update: false,
                    id: payload.id
                }
            })
        }else{
            response = response.response
            dispatch({
                type: actionTypes.ERROR_MENU_GROUP,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                    update: false,
                }
            })
        }
    }catch (e){
        dispatch({
            type: actionTypes.ERROR_MENU_GROUP,
            payload: {
                message: e.message,
                update: false,
            }
        })
    }
}

export const deleteMenuGroup = (payload) => async (dispatch )=>{
    dispatch({
        type: actionTypes.LOADING_MENU_GROUP,
        payload: {
            update: true,
        }
    })
    try{
        let response = await apiDeleteMenuGroup(payload)
        if(response.data?.isSuccess){
            toast.error(response.data.message)
            dispatch({
                type: actionTypes.DELETE_MENU_GROUP,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    update: false,
                    id: payload
                }
            })
        }else{
            response = response.response
            toast.error(response?.data?.message || Object.values(response?.data?.errors)[0])
            // dispatch({
            //     type: actionTypes.CREATE_SHOP,
            //     payload: {
            //         message: response?.data?.message || Object.values(response?.data?.errors)[0],
            //         isSuccess: response.data.IsSuccess,
            //         update: false,
            //     }
            // })
        }
    }catch (e){
        toast.error(e.message)
        dispatch({
            type: actionTypes.ERROR_MENU_GROUP,
            payload: {
                message: e.message,
                update: false,
            }
        })
    }
}

export const getAllMenuGroup = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_MENU_GROUP,
        payload: {
            loading: true,
        }
    })
    try{
        let response = await apiGetAllMenuGroup(payload)
        if(response?.data?.isSuccess){
            dispatch({
                type: actionTypes.GET_ALL_MENU_GROUP,
                payload: {
                    data: response.data.data,
                    loading: false,
                }
            })
        }else{
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
    }catch (e){
        dispatch({
            type: actionTypes.ERROR_MENU_GROUP,
            payload: {
                message: e.message,
                loading: false,
            }
        })
    }
}

export const getAllNameMenuGroup = () => async (dispatch) =>{
    dispatch({
        type: actionTypes.LOADING_MENU_GROUP,
        payload: {
            loading: true,
        }
    })
    try{
        let response = await apiGetNameMenuGroup()
        if(response.data?.isSuccess){
            dispatch({
                type: actionTypes.GET_ALL_NAME_MENU_GROUP,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    loading: false
                }
            })
        }else{
            response = response.response
            toast.success(response?.data?.message || Object.values(response?.data?.errors)[0])
            dispatch({
                type: actionTypes.ERROR_MENU_GROUP,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    isSuccess: response.data.IsSuccess,
                    update: false,
                }
            })
        }
    }catch (e){
        toast.success(e.message)
        dispatch({
            type: actionTypes.ERROR_MENU_GROUP,
            payload: {
                message: e.message,
                update: false,
            }
        })
    }
}


