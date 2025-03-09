import { toast } from "react-toastify";

function customResponse(e) {
    if (e.response?.data?.errors) {
      toast.error(Object.values(e.response.data.errors)[0][0])
        return Object.values(e.response.data.errors)[0][0];
      }
      if (e.response?.data?.message) {
        toast.error(e.response.data.message);
        return e.response.data.message;
      }
      return e;
}

export default customResponse;