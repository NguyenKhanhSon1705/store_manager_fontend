import httpRequest from "~/utils/axios";
import customResponse from "./customResponse";
import getShopId from "~/utils/functions/getShopId";

const apiGetReportAborted = async (payload) => {
  try {
    const res = await httpRequest.get("/api/report/report-aborted", {
      params: {
        shop_id: getShopId(),
        start_date: payload.start_date,
        end_date: payload.end_date,
        employee_id: payload.employee_id,
        page_index: payload.page_index,
        limit: payload.limit,
      },
    });
    if (res.data.isSuccess) {
      return res.data;
    }
    return res;
  } catch (e) {
    return customResponse(e);
  }
};
const apiShowAbortedDetail = async (payload) => {
  try {
    const res = await httpRequest.get("/api/report/report-aborted-detail", {
      params: {
        id: payload,
      },
    });
    if (res.data.isSuccess) {
      return res.data;
    }
    return res;
  } catch (e) {
    return customResponse(e);
  }
};
const apiGetReportBill = async (payload) => {
  try {
    const res = await httpRequest.get("/api/report/report-bill", {
      params: {
        shop_id: getShopId(),
        start_date: payload.start_date,
        end_date: payload.end_date,
        employee_id: payload.employee_id,
        page_index: payload.page_index,
        limit: payload.limit,
        search_bill_code: payload.search_bill_code,
      },
    });
    if (res.data.isSuccess) {
      return res.data;
    }
    return res;
  } catch (e) {
    return customResponse(e);
  }
};
const apiShowBillDetail = async (payload) => {
  try {
    const res = await httpRequest.get("/api/report/report-bill-detail", {
      params: {
        id: payload,
      },
    });
    if (res.data.isSuccess) {
      return res.data;
    }
    return res;
  } catch (e) {
    return customResponse(e);
  }
};
const apiRevenue = async (payload)=>{
  try{
    const res = await httpRequest.get("/api/report/report-revenue", {
      params: {
        shop_id: getShopId(),
        start_date: payload.start_date,
        end_date: payload.end_date,
      },
    });
    if(res.data.isSuccess){
      return res.data
    }
    return res.response.data
  }catch(e){
    return customResponse(e)
  }
}
const reportService = {
  apiGetReportAborted,
  apiShowAbortedDetail,
  apiGetReportBill,
  apiShowBillDetail,
  apiRevenue
};
export default reportService;
