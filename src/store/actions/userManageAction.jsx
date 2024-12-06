import { apiCreateUser, apiGetUserDetails, apiGetUserOfList, apiGetUserOfTree, apiGetUserOfTreeById, apiLookUser, apiUpdateUser } from "../../services/userManageService"
import actionTypes from "./actionTypes"

export const getUserOfTree = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_USER,
        payload: {
            loading: true,
        }
    })
    try {
        const response = await apiGetUserOfTree()
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_USER_OF_TREE,
                payload: {
                    loading: false,
                    data: response.data.data,
                }
            })
        } else {
            dispatch({
                type: actionTypes.ERROR_USER,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    loading: false,
                }
            })
        }
    }
    catch (e) {
        dispatch({
            type: actionTypes.ERROR_USER,
            payload: {
                message: e.message,
                loading: false,
            }
        })
    }

}

export const getUserOfTreeById = (idUser) => async (dispatch) => {
    try {
        let response = await apiGetUserOfTreeById(idUser)
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_USER_OF_TREE_BY_ID,
                payload: {
                    loading: false,
                    data: response.data.data,
                    parentId: idUser
                }
            })
        } else {
            response = response.response

            dispatch({
                type: actionTypes.ERROR_USER,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    loading: false,
                }
            })
        }

    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_USER,
            payload: {
                message: e.message,
                loading: false,
            }
        })
    }
}

export const getUserOfList = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_USER,
        payload: {
            loading: true,
        }
    })
    try {
        const response = await apiGetUserOfList(payload)
        console.log(response);
        
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_USER_OF_LIST,
                payload: {
                    loading: false,
                    data: response.data.data,
                }
            })
        } else {
            dispatch({
                type: actionTypes.ERROR_USER,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    loading: false,
                }
            })
        }
    }
    catch (e) {
        dispatch({
            type: actionTypes.ERROR_USER,
            payload: {
                message: e.message,
                loading: false,
            }
        })
    }

}

export const getUserDetails = (userId) => async (dispatch) => {
    try {
        let response = await apiGetUserDetails(userId)
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.GET_USER_DETAILS,
                payload: {
                    loading: false,
                    data: response.data.data,
                }
            })
        } else {
            response = response.response
            dispatch({
                type: actionTypes.ERROR_USER,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    loading: false,
                }
            })
        }
    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_USER,
            payload: {
                message: e.message,
                loading: false,
            }
        })
    }
}

export const createUser = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_USER,
        payload: {
            update: true,
        }
    })
    try{
        let response = await apiCreateUser(payload);
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.CREATE_USER,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    update: false,
                }
            });
        } else {
            response = response.response
            dispatch({
                type: actionTypes.ERROR_USER,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    update: false
                }
            });
        }
    }catch (e){
        dispatch({
            type: actionTypes.ERROR_USER,
            payload: {
                message: e.message,
                update: false,
            }
        });
    }
}

export const updateUser = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_USER,
        payload: {
            update: true,
        }
    })
    try {
        let response = await apiUpdateUser(payload);
        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.UPDATE_USER,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    update: false
                }
            });
        } else {
            response = response.response
            dispatch({
                type: actionTypes.ERROR_USER,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    update: false
                }
            });
        }
    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_USER,
            payload: {
                message: e.message,
                update: false,
            }
        });
    }
}

export const lockUser = (payload) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOADING_USER,
        payload: {
            update: true,
        }
    })
    try {
        let response = await apiLookUser(payload);

        if (response.data?.isSuccess) {
            dispatch({
                type: actionTypes.LOOK_USER,
                payload: {
                    message: response.data.message,
                    data: response.data.data,
                    update: false
                }
            });
        } else {
            response = response.response
            dispatch({
                type: actionTypes.ERROR_USER,
                payload: {
                    message: response?.data?.message || Object.values(response?.data?.errors)[0],
                    update: false
                }
            });
        }
    } catch (e) {
        dispatch({
            type: actionTypes.ERROR_USER,
            payload: {
                message: e.message,
                update: false,
            }
        });
    }
}