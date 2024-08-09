import axios from "axios";

const baseUrl = process.env.React_App_Base_url;

export const makeApiRequest = async (method, urlExt, params) => {
  try {
    const response = await axios({
      method,
      url: `${baseUrl + urlExt}`,
      params: params,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
