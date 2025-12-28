import { toast } from "react-toastify";
import dishService from "../../services/dishService";
import actionTypes from "./actionTypes";

 const getListDish = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_DISH,
    payload: {
      loading: true,
    },
  });
  try {
    let res = await dishService.apiGetAllDish(payload);
    if (res?.isSuccess) {
      dispatch({
        type: actionTypes.GET_ALL_DISH,
        payload: {
          loading: false,
          data: res.data,
        },
      });
    } else {
      toast.error(res?.message || 'Failed to load dishes');
    }
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
  dispatch({
    type: actionTypes.LOADING_DISH,
    payload: {
      loading: false,
    },
  });
};

const getDishByMenugroup = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_DISH,
    payload: {
      loading: true,
    },
  });
  try {
    let res = await dishService.apiGetDishByMenugroup(payload);
    if (res?.isSuccess) {
      dispatch({
        type: actionTypes.GET_DISH_BY_MENUGROUP,
        payload: {
          loading: false,
          data: res.data,
        },
      });
    } else {
      toast.error(res?.message || 'Failed to load dishes');
    }
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
  dispatch({
    type: actionTypes.LOADING_DISH,
    payload: {
      loading: false,
    },
  });
};

 const createDish = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_DISH,
    payload: {
      update: true,
    },
  });
  let res = await dishService.apiCreateDish(payload);
  if (res?.isSuccess) {
    toast.success(res?.message);
    dispatch({
      type: actionTypes.CREATE_DISH,
      payload: {
        update: false,
        data: res.data,
      },
    });
  } else {
    dispatch({
      type: actionTypes.ERROR_DISH,
      payload: {
        update: false,
      },
    });
  }
};

 const deleteDish = (payload) => async (dispatch) =>{
  dispatch({
    type: actionTypes.LOADING_DISH,
    payload: {
      update: true,
    },
  });
  let res = await dishService.apiDeleteDish(payload);
  if (res?.isSuccess) {
    toast.success(res?.message);
    dispatch({
      type: actionTypes.DELETE_DISH,
      payload: {
        update: false,
        data: res.data,
        id: payload.id
      },
    });
  } else {
    dispatch({
      type: actionTypes.ERROR_DISH,
      payload: {
        update: false,
      },
    });
  }
 
}

const updateDish = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_DISH,
    payload: {
      update: true,
    },
  });

  try {
    let res = await dishService.apiUpdateDish(payload);
    if (res?.isSuccess) {
      toast.success(res?.message);
      dispatch({
        type: actionTypes.UPDATE_DISH,
        payload: {
          update: false,
          data: res.data,
          id: payload.id,
        },
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_DISH,
        payload: {
          update: false,
          error: res?.message || 'Update failed',
        },
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ERROR_DISH,
      payload: {
        update: false,
        error: error.message || 'An error occurred',
      },
    });
  }
};

const dishAction = {
  getListDish,
  createDish,
  deleteDish,
  getDishByMenugroup,
  updateDish
}
export default dishAction