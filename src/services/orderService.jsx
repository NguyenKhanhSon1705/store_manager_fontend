import getShopId from "~/utils/functions/getShopId";
import httpRequest from "../utils/axios";
import customResponse from "./customResponse";

const apiGetTablesByArea = async (payload) => {
  try {
    const res = await httpRequest.get("/api/tablearea/get-tables-by-area", {
      params: {
        areaId: payload,
      },
    });
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};
const apiOpenTable = async (payload) => {
  try {
    const res = await httpRequest.post(
      "/api/ordertabledish/open-table-dish",
      payload
    );
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};
const apiGetInfoDishCurrentTable = async (payload) => {
  try {
    const res = await httpRequest.get("/api/ordertabledish/get-dish-table", {
      params: {
        tableId: payload,
      },
    });
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};
const apiAbortedtable = async (payload) => {
  try {
    payload.shop_id = getShopId();
    const res = await httpRequest.post(
      "/api/ordertabledish/aborted-table",
      payload
    );
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};
const apiUpdateTableDish = async (payload) => {
  try {
    const res = await httpRequest.post(
      "/api/ordertabledish/update-dish-table",
      payload
    );
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};

const apiGetInfoCheckout = async (payload) => {
    try {
        const res = await httpRequest.get(
          "/api/ordertabledish/get-info-checkout",
          {
            params: {
                table_id: payload.table_id,
                shop_id: payload.shop_id
            },
          }
        );
        if (res.data.isSuccess) {
          return res.data;
        }
        return res.response;
      } catch (e) {
        return customResponse(e);
      }
};
const apiPayment = async (payload) => {
    try {
        const res = await httpRequest.post(
          "/api/ordertabledish/checkout-table", payload
        );
        if (res.data.isSuccess) {
          return res.data;
        }
        return res.response;
      } catch (e) {
        return customResponse(e);
      }
}
const apiChangeTable = async (payload) => {
  try{
    const res = await httpRequest.post("/api/ordertabledish/choose-table-dish" , payload)
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
}

const orderService = {
  apiGetTablesByArea,
  apiOpenTable,
  apiGetInfoDishCurrentTable,
  apiAbortedtable,
  apiUpdateTableDish,
  apiGetInfoCheckout,
  apiPayment,
  apiChangeTable
};
export default orderService;
