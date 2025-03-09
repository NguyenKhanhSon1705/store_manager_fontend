import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    message: '',
    currDish:[],
    update: false,
    loading: false
}

export default function orderReducer(state = initState, action){
    switch (action.type){
        case actionTypes.GET_INFO_CHECKOUT: {
            return {
                data: action.payload.data,
                loading: false,
                update: false
            }
        }
        case actionTypes.PAYMENT: {
            return {
                data: action.payload.data,
                loading: false,
                update: false
            }
        }
        case actionTypes.OPEN_TABLES: {
            
            return {
                ...state,
                // currDish : action.payload.data,
                update: false
            }
        }
        case actionTypes.UPDATE_TABLES_DISH: {
            return {
                ...state,
                update: false
            }
        }
        case actionTypes.GET_INFO_DISH_CURRENT_TABLE:{
            return {
                state,
                currDish : action.payload.data,
                update: false,
                loading: false
            }
        }
        case actionTypes.CHANGE_TABLE:{
            return {
                state,
                currDish : action.payload.data,
                update: false,
                loading: false
            }
        }
        case actionTypes.ERROR_ORDER:{
            return {
                ...state,
                update:false,
                loading: false
            }
        }
        case actionTypes.LOADING_ORDER:{
            return {
                ...state,
                update: action.payload.update,
                loading: action.payload.loading
            }
        }
        default:
            return state
    }
}