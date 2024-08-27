import axios from "axios";

const baseUrl = process.env.React_App_Base_url;

export const makeApiRequest = async (
  method,
  urlExt,
  params = {},
  body = {}
) => {
  try {
    console.log("axios called with:", method, baseUrl + urlExt, params, body);
    const response = await axios({
      method,
      url: `${baseUrl + urlExt}`,
      params: params,
      data: body,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
