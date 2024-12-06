function customResponse(e) {
    if (e.response?.data?.errors) {
        return Object.values(e.response.data.errors)[0][0];
      }
      if (e.response?.data?.message) {
        return e.response.data.message;
      }
      return e;
}

export default customResponse;