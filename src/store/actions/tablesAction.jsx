import { toast } from "react-toastify";
import {
  apiCreateTable,
  apiDeleteTables,
  apiGetListTables,
  apiUpdateTables,
} from "../../services/tablesService";
import actionTypes from "./actionTypes";
import orderService from "~/services/orderService";

export const getTablesByArea = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_TABLES,
    payload: {
      loading: true,
    },
  });
  const res = await orderService.apiGetTablesByArea(payload);
  if (res?.isSuccess) {
    dispatch({
      type: actionTypes.GET_TABLES_BY_AREA,
      payload: {
        data: res.data,
      },
    });
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_TABLES,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
};

export const createTables = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_TABLES,
    payload: {
      update: true,
    },
  });
  try {
    let response = await apiCreateTable(payload);
    if (response.data?.isSuccess) {
      toast.success(response.data.message);
      dispatch({
        type: actionTypes.CREATE_TABLES,
        payload: {
          message: response.data.message,
          data: response.data.data,
          update: false,
        },
      });
    } else {
      response = response.response;
      dispatch({
        type: actionTypes.ERROR_TABLES,
        payload: {
          message:
            response?.data?.message || Object.values(response?.data?.errors)[0],
          update: false,
        },
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.ERROR_TABLES,
      payload: {
        message: e.message,
        update: false,
      },
    });
  }
};

export const updateTables = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_TABLES,
    payload: {
      update: true,
    },
  });
  try {
    let response = await apiUpdateTables(payload);
    if (response.data?.isSuccess) {
      toast.success(response.data.message);
      dispatch({
        type: actionTypes.UPDATE_TABLES,
        payload: {
          id: payload.id,
          message: response.data.message,
          data: response.data.data,
          update: false,
        },
      });
    } else {
      response = response.response;
      toast.success(
        response?.data?.message || Object.values(response?.data?.errors)[0]
      );

      dispatch({
        type: actionTypes.ERROR_TABLES,
        payload: {
          message:
            response?.data?.message || Object.values(response?.data?.errors)[0],
          update: false,
        },
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.ERROR_TABLES,
      payload: {
        message: e.message,
        update: false,
      },
    });
  }
};

export const getListTables = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_TABLES,
    payload: {
      loading: true,
    },
  });
  try {
    let response = await apiGetListTables();
    if (response.data?.isSuccess) {
      dispatch({
        type: actionTypes.GET_LIST_TABLES,
        payload: {
          data: response.data.data,
          loading: false,
        },
      });
    } else {
      response = response.response;
      toast.error(
        response?.data?.message || Object.values(response?.data?.errors)[0]
      );

      dispatch({
        type: actionTypes.ERROR_TABLES,
        payload: {
          loading: false,
        },
      });
    }
  } catch (e) {
    toast.error(e.message);
    dispatch({
      type: actionTypes.ERROR_TABLES,
      payload: {
        message: e.message,
        loading: false,
      },
    });
  }
};

export const deleteTables = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_TABLES,
    payload: {
      update: true,
    },
  });
  try {
    let response = await apiDeleteTables(payload);
    if (response.data?.isSuccess) {
      toast.success(response.data.message);
      dispatch({
        type: actionTypes.DELETE_TABLES,
        payload: {
          message: response.data.message,
          id: payload,
          update: false,
        },
      });
    } else {
      response = response.response;
      toast.error(
        response?.data?.message || Object.values(response?.data?.errors)[0]
      );

      dispatch({
        type: actionTypes.FAIL,
        payload: {
          message:
            response?.data?.message || Object.values(response?.data?.errors)[0],
          update: false,
        },
      });
    }
  } catch (e) {
    toast.error(e.message);
    dispatch({
      type: actionTypes.FAIL,
      payload: {
        message: e.message,
        update: false,
      },
    });
  }
};
