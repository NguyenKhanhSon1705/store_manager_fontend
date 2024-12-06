import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    loading: false,
    update: false
}

const rolesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST_ROLES_SHOP: {
            return {
                ...state,
                data: action.payload.data,
                loading: action.payload.loading,
                message: action.payload.message
            }
        }
        case actionTypes.LOADING_ROLES: {
            return {
                ...state,
                loading: action.payload.loading,
            }
        }
        case actionTypes.ERROR_ROLES: {
            return {
                ...state,
                message: action.payload.message,
                loading: action.payload.loading,
                update: action.payload.update
            }
        }
        default: {
            return state;
        }
    }
}
export default rolesReducer