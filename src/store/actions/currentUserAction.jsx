import env from "../../constants/env";
import { apiCurrentUser } from "../../services/currentUserService";
import actionTypes from "./actionTypes";


export const getCurrentUser = (payload)=> (async (dispatch)=> {
    
    try{
        let res = await apiCurrentUser(payload);
        
    if(res.data?.isSuccess){

        const has = btoa(res.data.data.shopId)
        localStorage.setItem(env.REACT_APP_IDSHOP , has)

        dispatch({
            type: actionTypes.GET_CURRENT,
            payload: {
                ...res.data.data,
                choosed: true,
                loading: false
            }
        })
    }else{
        res = res?.response
        dispatch({
            type: actionTypes.GET_CURRENT,
                loading: false,
                choosed: false,
            payload: res?.data?.message || Object.values(res?.data?.errors)[0],
        })
    }
    }catch(e){
        dispatch({
            type: actionTypes.GET_CURRENT,
                loading: false,
                choosed: false,
            payload: e.message,
        })
    }
})