import axios from "axios";
import env from "../constants/env";
import sha1 from "js-sha1";
const uploadAnImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Images"); // Replace with your preset
    formData.append("cloud_name", env.CLOUD_NAME);
    const response = await axios.post(
      `${env.CLOUD_BASE_URL}${env.CLOUD_NAME}/image/upload`,
      formData
    );
    const data = {
      success: true,
      data: response.data,
      status: response.status,
    };
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

const deleteAnImage = async (url) => {
  try {
    if (!url || !url.trim()) {
      throw new Error("Invalid url");
    }
    const publicId = "Image/" + url.split("/").pop()?.split(".")[0];
    if (!publicId) {
      throw new Error("Invalid url");
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${env.CLOUD_API_SECRET}`;
    const signature = sha1(stringToSign);

    const params = {
      public_id: publicId,
      api_key: env.CLOUD_API_KEY,
      signature: signature,
      timestamp: timestamp,
    };
    const response = await axios.post(
      `${env.CLOUD_BASE_URL}${env.CLOUD_NAME}/image/destroy`,
      params
    );
    const data = {
      success: true,
      data: response.data,
      status: response.status,
    };
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
const uploadService = {
  uploadAnImage,
  deleteAnImage,
};
export default uploadService;
