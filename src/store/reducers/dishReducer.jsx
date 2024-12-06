import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    dish_menugroup:[],
    message: '',
    update: false,
    loading: false
}

export default function dishReducer(state = initState, action){
    switch (action.type){
        case actionTypes.GET_ALL_DISH:{
            return {
                data : action.payload.data,
                loading: false
            }
        }
        case actionTypes.GET_DISH_BY_MENUGROUP:{
            return {
                dish_menugroup : action.payload.data,
                loading: false
            }
        }
        case actionTypes.CREATE_DISH: {
            let items = [action.payload.data ,...state.data.items]
            let totalCount = state.data.totalCount + 1 
            return {
                ...state,
                data: {
                    ...state.data,
                    items: items,
                    totalCount: totalCount
                },
                update: false
            }
        }
        case actionTypes.DELETE_DISH:{
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.filter(item => item.id !== action.payload.id) 
                },
                update: false,
            }
        }
        case actionTypes.ERROR_DISH:{
            return {
                ...state,
                update:false,
                loading: false
            }
        }
        case actionTypes.LOADING_DISH:{
            return {
                ...state,
                update: action.payload.update,
                loading: action.payload.loading
            }
        }
        // case action
        default:
            return state
    }
}