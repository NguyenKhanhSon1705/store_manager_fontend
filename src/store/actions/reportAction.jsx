import reportService from "~/services/reportService";
import actionTypes from "./actionTypes";

const getReportAborted = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_REPORT,
    payload: {
      loading: true,
    },
  });
  const res = await reportService.apiGetReportAborted(payload);
  if (res?.isSuccess) {
    dispatch({
      type: actionTypes.GET_REPORT_ABORTED,
      payload: {
        loading: false,
        data: res.data,
      },
    });
  } else {
    dispatch({
      type: actionTypes.ERROR_REPORT,
      payload: {
        message: res.message,
        loading: false,
      },
    });
  }
};

const getReportAbortedDetail = (payload) => async (dispatch) => {
    dispatch({
      type: actionTypes.LOADING_REPORT,
      payload: {
        update: true,
      },
    });
    const res = await reportService.apiGetReportAborted(payload);
    if (res?.isSuccess) {
      dispatch({
        type: actionTypes.GET_REPORT_ABORTED,
        payload: {
          update: false,
          data: res.data,
        },
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_REPORT,
        payload: {
          message: res.message,
          loading: false,
        },
      });
    }
  };

  const getReportBill = (payload) => async (dispatch) => {
    dispatch({
      type: actionTypes.LOADING_REPORT,
      payload: {
        loading: true,
      },
    });
    const res = await reportService.apiGetReportBill(payload);
    if (res?.isSuccess) {
      dispatch({
        type: actionTypes.GET_REPORT_BILL,
        payload: {
          loading: false,
          data: res.data,
        },
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_REPORT,
        payload: {
          message: res.message,
          loading: false,
        },
      });
    }
  };
  const getReportBillDetail = (payload) => async (dispatch) => {
    dispatch({
      type: actionTypes.LOADING_REPORT,
      payload: {
        update: true,
      },
    });
    const res = await reportService.apiShowBillDetail(payload);
    if (res?.isSuccess) {
      dispatch({
        type: actionTypes.SHOW_REPORT_BILL_DETAILS,
        payload: {
          update: false,
          data: res.data,
        },
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_REPORT,
        payload: {
          message: res.message,
          loading: false,
        },
      });
    }
  };

  const getRevenueReport = (payload) => async (dispatch) => {
    dispatch({
      type: actionTypes.LOADING_REPORT,
      payload: {
        loading: true,
      },
    });
    const res = await reportService.apiRevenue(payload);
    if (res?.isSuccess) {
      dispatch({
        type: actionTypes.GET_REVENUE_REPORT,
        payload: {
          loading: false,
          data: res.data,
        },
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_REPORT,
        payload: {
          message: res.message,
          loading: false,
        },
      });
    }
  }
const reportAction = {
  getReportAborted,
  getReportAbortedDetail,
  getReportBill,
  getReportBillDetail,
  getRevenueReport
};
export default reportAction;
