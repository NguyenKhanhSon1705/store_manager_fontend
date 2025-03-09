import { toast } from "react-toastify";
import orderService from "../../services/orderService";
import actionTypes from "./actionTypes";
import { navigateTo } from "../../routes/navigateService";
import ROUTE_PATH from "../../routes/routesPath";



const openTable = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_ORDER,
    payload: {
      update: true,
    },
  });
  const res = await orderService.apiOpenTable(payload);
  if (res?.isSuccess) {
    toast.success(res?.message);
    console.log(res.data);
    dispatch({
      type: actionTypes.OPEN_TABLES,
      payload: {
        data: res.data,
      },
    });
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_ORDER,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
};

const updateTable = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_ORDER,
    payload: {
      update: true,
    },
  });
  const res = await orderService.apiUpdateTableDish(payload);
  if (res?.isSuccess) {
    toast.success(res?.message);
    dispatch({
      type: actionTypes.UPDATE_TABLES_DISH,
      payload: {
        data: res.data,
      },
    });
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_ORDER,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
};

const getInfoDishCurrentTable = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_ORDER,
    payload: {
      loading: true,
    },
  });

  const res = await orderService.apiGetInfoDishCurrentTable(payload);
  if (res?.isSuccess) {
    dispatch({
      type: actionTypes.GET_INFO_DISH_CURRENT_TABLE,
      payload: {
        data: res.data,
      },
    });
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_ORDER,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
};


const abortedTable = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_ORDER,
    payload: {
      update: true,
    },
  });
  const res = await orderService.apiAbortedtable(payload);
  if (res?.isSuccess) {
    dispatch({
      type: actionTypes.OPEN_TABLES,
      payload: {
        data: res.data,
      },
    });
    navigateTo(ROUTE_PATH.tables_by_area);
    toast.success(res?.message);
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_ORDER,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
};

const getInfoCheckout = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_ORDER,
    payload: {
      loading: true,
    },
  });
  const res = await orderService.apiGetInfoCheckout(payload);
  if (res?.isSuccess) {
    dispatch({
      type: actionTypes.GET_INFO_CHECKOUT,
      payload: {
        data: res.data,
      },
    });
    toast.success(res?.message);
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_ORDER,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
};

const payment = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_ORDER,
    payload: {
      update: true,
    },
  });
  const res = await orderService.apiPayment(payload);
  if (res?.isSuccess) {
    dispatch({
      type: actionTypes.PAYMENT,
      payload: {
        data: res.data,
      },
    });
    toast.success(res?.message);
    navigateTo(ROUTE_PATH.tables_by_area);
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_ORDER,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
}

const changeTable = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_ORDER,
    payload: {
      update: true,
    },
  });
  const res = await orderService.apiChangeTable(payload);
  if (res?.isSuccess) {
    dispatch({
      type: actionTypes.CHANGE_TABLE,
      payload: {
        data: res.data,
      },
    });
    toast.success(res?.message);
  } else {
    toast.error(res);
    dispatch({
      type: actionTypes.ERROR_ORDER,
      payload: {
        update: false,
        loading: false,
      },
    });
  }
}
const orderAction = {
  openTable,
  updateTable,
  getInfoDishCurrentTable,
  abortedTable,
  getInfoCheckout,
  payment,
  changeTable
};
export default orderAction;
