
import { apiGetListRolesShop } from "../../services/rolesService"
import actionTypes from "./actionTypes"

export const getListRolesShop = () => async (dispatch) =>{
    dispatch({
        type: actionTypes.LOADING_ROLES,
        payload: {
            loading: true
        }
    })
    try{
        let res = await apiGetListRolesShop
        
        if (res?.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_LIST_ROLES_SHOP,
                payload: {
                    data: res.data.data,
                    loading: false
                }
            })
        } else {
            res = res.response
            dispatch({
                type: actionTypes.ERROR_ROLES,
                payload: {
                    message: res?.data?.message || Object.values(res?.data?.errors)[0],
                    loading: false
                }
            })
        }
    }catch(e){
        dispatch({
            type: actionTypes.ERROR_ROLES,
            payload: {
                message: e.message,
                loading: false
            }
        })
    }
}