import { makeApiRequest } from "../ServicesTemplates";
import { apiExt } from "./ApiExtensions";

export const getAllEmergencyPatients = async ({
  limit,
  page,
  emergencyPatientId,
  patientName,
  patientMobileNumber,
}) => {
  try {
    const response = await makeApiRequest(
      "GET",
      `${apiExt.emergencyPatients.getAllEmergencyPatients}`,
      { limit, page, emergencyPatientId, patientName, patientMobileNumber },
      ""
    );
    // console.log("response from getAllEmergencyPatients:", response);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Somthing went wrong!");
    }
  } catch (error) {
    throw error;
  }
};

export const changeEmergencyBed = async (data) => {
  try {
    const response = await makeApiRequest(
      "PUT",
      `${apiExt.emergencyPatients.changeEmergencyBed}/${data?.id}`,
      "",
      { ipdBedNo: data.newBedId }
    );
    // console.log("response in changeIpdBed: ", response);

    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw error;
  }
};
