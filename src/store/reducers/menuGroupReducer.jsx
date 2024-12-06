import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    message: '',
    update: false,
    loading: false,
    type:''
}

export default function menuGroupReducer(state = initState, action){
    switch (action.type){
        case actionTypes.GET_ALL_MENU_GROUP:{
            return {
                data : action.payload.data,
                loading: action.payload.loading
            }
        }
        case actionTypes.CREATE_MENU_GROUP:{
            let items = [action.payload.data ,...state.data.items]
            let totalCount = state.data.totalCount + 1 
            return {
                ...state,
                data: {
                    ...state.data,
                    items: items,
                    totalCount: totalCount
                },
                message: action.payload.message,
                update: action.payload.update,
                type:'success'
            }
        }
        case actionTypes.UPDATE_MENU_GROUP:{
            return {
                ...state ,
                data: {
                    ...state.data,
                    items: state.data.items.map(item => item.id === action.payload.id ? action.payload.data : item)
                },
                message: action.payload.message,
                update: action.payload.update,
                type:'success'
            }
        }
        case actionTypes.DELETE_MENU_GROUP:{
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.filter(item => item.id !== action.payload.id) 
                },
                message: action.payload.message,
                update: action.payload.update,
                type:'warning'

            }
        }
        case actionTypes.GET_ALL_NAME_MENU_GROUP:{
            return {
                data : action.payload.data,
                loading: action.payload.loading
            }
        }
        case actionTypes.ERROR_MENU_GROUP:{
            return {
                ...state,
                message: action.payload.message,
                update: action.payload.update,
                loading: action.payload.loading,
                type:'error'

            }
        }
        case actionTypes.LOADING_MENU_GROUP:{
            return {
                ...state,
                update: action.payload.update,
                loading: action.payload.loading,
                message:''
            }
        }
        default: 
            return state
    }
}