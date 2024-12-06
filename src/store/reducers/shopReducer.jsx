import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    loading: false,
    update: false
}

const shopReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOADING: {
            return {
                ...state,
                loading: action.payload.loading,
            }
        }
        case actionTypes.GET_LIST_SHOP: {
            return {
                data: action.payload.data,
                loading: action.payload.loading,
                update: false
            }
        }
        case actionTypes.GET_SHOP_BY_ID: {
            return {
                ...state,
                data: action.payload.data,
                loading: action.payload.loading,
                message: action.payload.message,
                update: false
            }
        }
        case actionTypes.CREATE_SHOP: {
            return {
                ...state,
                data: [...state.data,(Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data])],
                message: action.payload.message,
                loading: action.payload.loading,
                update: action.payload.update
            }
        }
        case actionTypes.UPDATE_SHOP: {
            return {
                ...state,
                data: action.payload.data,
                message: action.payload.message,
                loading: action.payload.loading,
                update: action.payload.update
            }
        }
        case actionTypes.DELETE_SHOP: {
            if (action.payload.isSuccess) {
                return {
                    ...state,
                    data: [],
                    message: action.payload.message,
                    loading: action.payload.loading,
                    update: action.payload.update
                }
            } else {
                return {
                    ...state,
                    message: action.payload.message,
                    loading: action.payload.loading,
                    update: action.payload.update
                }
            }

        }
        default:
            return state
    }
}

export default shopReducer