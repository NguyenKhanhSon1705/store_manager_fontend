import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    message: '',
    update: false,
    loading: false
}
export default function tablesReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_TABLES_BY_AREA:{
            return {
                ...state,
                data : action.payload.data,
                loading: false
            }
        }
        case actionTypes.GET_LIST_TABLES: {
            return {
                data: action.payload.data,
                loading: action.payload.loading
            }
        }
        case actionTypes.CREATE_TABLES:
            return {
                ...state,
                data: [...state.data, action.payload.data],
                update: action.payload.update,
                message: action.payload.message
            }
        case actionTypes.UPDATE_TABLES:{
            return {
                ...state,
                data: state.data.map(item => item.id === action.payload.id ? action.payload.data : item),
                message: action.payload.message,
                update:  action.payload.update
            }
        }
            
        case actionTypes.DELETE_TABLES:
            return {
                ...state,
                data: state.data.filter(item => item.id !== action.payload.id),
                message: action.payload.message,
                update: action.payload.update
            }
        case actionTypes.ERROR_TABLES: {
            return {
                ...state,
                message: action.payload.message,
                loading: action.payload.loading,
                update: action.payload.update
            }
        }
        case actionTypes.LOADING_TABLES:{
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