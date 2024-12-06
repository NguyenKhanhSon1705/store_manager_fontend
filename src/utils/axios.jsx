import axios from "axios";
import env from "../constants/env";
import getAccessToken from "../utils/functions/getAccessToken";

const httpRequest = axios.create({
  baseURL: env.REACT_APP_BASE_URL_2,
  timeout: 5000,
  withCredentials: true,
});

httpRequest.interceptors.request.use(function (config) {
  let token = getAccessToken();
  if (token !== undefined) {
    config.headers = {
      authorization: token ? `Bearer ${token}` : null,
    };
  }
  return config;
});

// Add a response interceptor
httpRequest.interceptors.response.use(function (response) {
  // refresh token

  return response;
});

export default httpRequest;
