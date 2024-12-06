import { apiCreateArea, apiDeleteArea, apiGetListAreas, apiUpdateArea } from "../../services/areasService"
import actionTypes from "./actionTypes"

export const getListAreas = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_AREA,
        payload: {
            loading: true
        }
    })
    try {
        var res = await apiGetListAreas()
        if (res?.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_LIST_AREA,
                payload: {
                    message: res.data.message,
                    loading: false,
                    data: res.data.data,
                }
            })
        } else {
            res = res.response
            dispatch({
                type: actionTypes.ERROR_AREA,
                payload: {
                    message: res?.data?.message || Object.values(res?.data?.errors)[0],
                    loading: false,
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_AREA,
            payload: {
                message: e.message,
                loading: false
            }
        })
    }
}

export const getAreaById = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_AREA,
        payload: {
            loading: true
        }
    })
    try {
        // var res = await apiGetAreaById(payload)
        dispatch({
            type: actionTypes.GET_AREA_BY_ID,
            payload: {
                loading: false,
                id: payload
            }
        })
    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_AREA,
            payload: {
                message: e.message,
                loading: false,
            }
        })
    }

}

export const createArea = (payload) => async (dispatch) =>{
    dispatch({
        type: actionTypes.LOADING_AREA,
        payload: {
            update: true
        }
    })
    try{
        let res = await apiCreateArea(payload)
        
        if(res.data?.isSuccess){
            dispatch({
                type: actionTypes.CREATE_AREA,
                payload: {
                    data: res.data.data,
                    message: res.data.message,
                    update: false
                }
            })
        }else{
           res = res.response
           dispatch({
            type: actionTypes.ERROR_AREA,
            payload: {
                message: res?.data?.message || Object.values(res?.data?.errors)[0],
                update: false
            }
           }) 
        }
    }catch(e){
        dispatch({
            type: actionTypes.ERROR_AREA,
            payload: {
                message: e.message,
                update: false
            }
           }) 
    }
}

export const updateArea = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_AREA,
        payload: {
            update: true
        }
    })
    try {
        let res = await apiUpdateArea(payload)
        if (res?.data?.isSuccess) {
            
            dispatch({
                type: actionTypes.UPDATE_AREA,
                payload: {
                    data: res.data.data,
                    message: res.data.message,
                    update: false
                }
            })
        } else {
            res = res.response
            dispatch({
                type: actionTypes.ERROR_AREA,
                payload: {
                    message: res?.data?.message || Object.values(res?.data?.errors)[0],
                    update: false
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_AREA,
            payload: {
                message: e.message,
                update: false
            }
        })
    }
}
export const deleteArea = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_AREA,
        payload: {
            update: true
        }
    })
    try {
        let res = await apiDeleteArea(payload)
        if (res?.data?.isSuccess) {
            dispatch({
                type: actionTypes.DELETE_AREA,
                payload: {
                    id: payload,
                    message: res.data.message,
                    update: false
                }
            })
        } else {
            res = res.response
            dispatch({
                type: actionTypes.ERROR_AREA,
                payload: {
                    message: res?.data?.message || Object.values(res?.data?.errors)[0],
                    update: false
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_AREA,
            payload: {
                message: e.message,
                update: false
            }
        })
    }
}
