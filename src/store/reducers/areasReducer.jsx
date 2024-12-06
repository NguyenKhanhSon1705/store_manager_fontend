import actionTypes from "../actions/actionTypes"

const initState = {
    data: [],
    details:{},
    message:"",
    update: false,
    loading: false
}

const areasReducer = (state = initState , action)=>{
    switch(action.type){
        case actionTypes.GET_LIST_AREA:
            return {
                data: action.payload.data,
                loading: action.payload.loading,
                update: false
             }
        case actionTypes.GET_AREA_BY_ID:
            {
                return {
                    ...state ,
                    details: state.data.find(item => item.id === action.payload.id), 
                    update: true,
                    loading: action.payload.loading
                }
            }
        case actionTypes.CREATE_AREA:{
            
            return {
                data: [...state.data, action.payload.data],
                message: action.payload.message,
                loading: action.payload.loading,
                update: action.payload.update,
             }
        }
        case actionTypes.UPDATE_AREA: {
            return {
                ...state,
                data: state.data.map(item => item.id === action.payload.data.id ? action.payload.data : item),
                message: action.payload.message,
                loading: action.payload.loading,
                update: action.payload.update,
            }
        }

        case actionTypes.DELETE_AREA: {
            return {
                ...state,
                data: state.data.filter(item => item.id!== action.payload.id),
                message: action.payload.message,
                loading: action.payload.loading,
                update: false,
                details: {}  // Clear details when area is deleted.
            }
        }
        case actionTypes.LOADING_AREA:{
            return {
                ...state,
                loading: action.payload.loading,
                update: action.payload.update
            }
        }
        case actionTypes.ERROR_AREA:{
            return {
                ...state,
                message: action.payload.message,
                loading: false,
                update: false
            }
        }
        default:
            return state
    }
}
export default areasReducer