import { makeApiRequest } from "../ServicesTemplates";
import { apiExt } from "./ApiExtensions";

export const getAllNursesData = async () => {
  try {
    const response = await makeApiRequest(
      "GET",
      `${apiExt?.nurses?.getAllNursesData}`
    );

    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Somthing went Wrong");
    }
  } catch (error) {
    throw error;
  }
};

export const getAllPatientsData = async () => {
  try {
    const response = await makeApiRequest(
      "GET",
      `${apiExt?.patients?.getAllPatientsData}`
    );
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Something Went Wrong!");
    }
  } catch (error) {
    throw error;
  }
};

export const getAllDoctorsData = async () => {
  try {
    const response = await makeApiRequest(
      "GET",
      `${apiExt?.doctors?.getAllDoctors}`
    );
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Something Went Wrong!");
    }
  } catch (error) {
    throw error;
  }
};
