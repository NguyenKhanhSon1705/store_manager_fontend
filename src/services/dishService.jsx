import getShopId from "../constants/getShopId";
import httpRequest from "../utils/axios";
import uploadService from "../services/uploadService";
import customResponse from "./customResponse";
import { toast } from "react-toastify";

const apiGetAllDish = async (payload) => {
  try {
    const res = await httpRequest.get("/api/dish/get-all-dish", {
      params: {
        shopId: getShopId(),
        pageSize: payload.pageSize || 10,
        pageIndex: payload.pageIndex || 1,
        search: payload.search || "",
      },
    });
    if (res.data?.isSuccess) {
      return res.data;
    }
    return res.data;
  } catch (e) {
    return customResponse(e);
  }
};

const apiGetDishByMenugroup = async (payload) => {
  try {
    const res = await httpRequest.get("/api/dish/get-dish-menugroup", {
      params: {
        shopId: getShopId(),
        pageSize: payload.pageSize ?? 10,
        pageIndex: payload.pageIndex ?? 1,
        search: payload.search ?? "",
        menuGroupId: payload.menuGroupId ?? "",
      },
    });
    if (res.data?.isSuccess) {
      return res.data;
    }
    return res.data;
  } catch (e) {
    return customResponse(e);
  }
};

const apiCreateDish = async (payload) => {
  const result =
    payload.Image_C && (await uploadService.uploadAnImage(payload.Image_C));
  try {
    if (result?.success) {
      payload.Image = result.data.secure_url;
    }
    payload.shop_Id = getShopId();
    const res = await httpRequest.post("/api/dish/create-dish", payload);
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    await uploadService.deleteAnImage(result.data.secure_url);
    return customResponse(e);
  }
};
const apiDeleteDish = async (payload) => {
  try {
    const res = await httpRequest.delete("/api/dish/delete-dish", {
      params: {
        id: payload,
      },
    });
    if (res.data.isSuccess) {
      res.data.data.image &&
        (await uploadService.deleteAnImage(res.data.data.image));
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};

const apiAddPriceDish = async (payload) => {
  try {
    const res = await httpRequest.post("/api/dish/add-price-dish", payload);
    if (res.data.isSuccess) {
      toast.success(res.data.message);
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};
const apiDeletePriceDish = async (payload) => {
  try {
    const res = await httpRequest.delete("/api/dish/delete-price-dish", {
      params: {
        id: payload,
      },
    });
    if (res.data.isSuccess) {
      toast.success(res.data.message);
      return res.data;
    }
    return res.response;
  } catch (e) {
    return customResponse(e);
  }
};

const apiUpdateDish = async (payload) => {
  const result =
    payload.Image_C && (await uploadService.uploadAnImage(payload.Image_C));
  try {
    if (result?.success) {
      payload.Image = result.data.secure_url;
    }
    payload.shop_Id = getShopId();
    const res = await httpRequest.put("/api/dish/update-dish", payload);
    if (res.data.isSuccess) {
      return res.data;
    }
    return res.response;
  } catch (e) {
    await uploadService.deleteAnImage(result.data.secure_url);
    return customResponse(e);
  }
};
const dishService = {
  apiCreateDish,
  apiGetAllDish,
  apiDeleteDish,
  apiUpdateDish,
  apiGetDishByMenugroup,
  apiAddPriceDish,
  apiDeletePriceDish,
};
export default dishService;
