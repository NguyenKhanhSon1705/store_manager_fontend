import actionTypes from "../actions/actionTypes"


const initState = {
    currentUser: {},
    choosed: false
}

const currentUserReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
            return { 
                ...state, 
                currentUser: action.payload || {},
                choosed: action.payload.choosed,
                loading: action.payload.loading,
            }
        case actionTypes.LOGOUT:
            return { 
                ...state, 
                currentUser: {},
                loading: action.payload.loading,
                choosed: false,
            }
        default:
            return state
    }
}

export default currentUserReducer   