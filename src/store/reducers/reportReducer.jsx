import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    details: {},
    message: '',
    update: false,
    loading: false
}
export default function reportReducer(state = initState, action){
    switch(action.type){
        case actionTypes.GET_REPORT_ABORTED: {
            return {
                data: action.payload.data,
                loading: false
            }
        }
        case actionTypes.GET_REPORT_BILL: {
            return {
                data: action.payload.data,
                loading: false
            }
        }
        case actionTypes.SHOW_REPORT_ABORTED_DETAILS: {
            return {
                ...state,
                details: action.payload.data,
                update: false
            }
        }
        case actionTypes.SHOW_REPORT_BILL_DETAILS: {
            return {
                ...state,
                details: action.payload.data,
                update: false
            }
        }
        case actionTypes.GET_REVENUE_REPORT:{
            return {
                data: action.payload.data,
                loading: false
            }
        }
        case actionTypes.ERROR_REPORT: {
            return {
                ...state,
                message: action.payload.message,
                loading: false,
                update: false
            }
        }
        case actionTypes.LOADING_REPORT: {
            return {
                ...state,
                loading: action.payload.loading,
                update: action.payload.update
            }
        }
        default:
            return state
    }
}