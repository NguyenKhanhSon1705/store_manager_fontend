import { toast } from "react-toastify";

function customResponse(e) {
    if (e.response?.data?.errors) {
      const errorMsg = Object.values(e.response.data.errors)[0][0];
      toast.error(errorMsg);
      return {
        isSuccess: false,
        message: errorMsg,
        data: null
      };
    }
    if (e.response?.data?.message) {
      toast.error(e.response.data.message);
      return {
        isSuccess: false,
        message: e.response.data.message,
        data: null
      };
    }
    return {
      isSuccess: false,
      message: e.message || 'Unknown error',
      data: null
    };
}

export default customResponse;