const env = {
  REACT_APP_BASE_URL: import.meta.env.REACT_APP_BASE_URL || "http://localhost:5260",
  REACT_APP_BASE_URL_2: import.meta.env.REACT_APP_BASE_URL_2 || "http://localhost:5260",
  REACT_APP_COOKIES: import.meta.env.REACT_APP_COOKIES || "_t",
  REACT_APP_LOGINED: import.meta.env.REACT_APP_LOGINED || "_l",
  REACT_APP_IDSHOP: import.meta.env.REACT_APP_IDSHOP || "_idS",
  CLOUD_NAME: import.meta.env.CLOUD_NAME || "dzegstfpm",
  CLOUD_BASE_URL: import.meta.env.CLOUD_BASE_URL || "https://api.cloudinary.com/v1_1/",
  CLOUD_API_KEY: import.meta.env.CLOUD_API_KEY || "949141339542694",
  CLOUD_API_SECRET: import.meta.env.CLOUD_API_SECRET || "Ezpncp8-DCWEh6_6Xk_f0ots3Zg",
  CLOUDINARY_URL: import.meta.env.CLOUDINARY_URL || "cloudinary://949141339542694:Ezpncp8-DCWEh6_6Xk_f0ots3Zg@dzegstfpm",
};
export default env;
