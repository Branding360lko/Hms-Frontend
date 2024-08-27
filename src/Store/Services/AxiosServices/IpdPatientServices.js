import { makeApiRequest } from "../ServicesTemplates";
import { apiExt } from "./ApiExtensions";

export const changeIpdBed = async (data) => {
  try {
    const response = await makeApiRequest(
      "PUT",
      `${apiExt.patients.changeIpdBed}/${data?.id}`,
      "",
      { ipdBedNo: data.newBedId }
    );
    console.log("response in changeIpdBed: ", response);

    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw error;
  }
};
