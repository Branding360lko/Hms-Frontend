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
      { emergencyBedNo: data.newBedId }
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

export const getEmergencyPatientById = async (id) => {
  try {
    const response = await makeApiRequest(
      "GET",
      `${apiExt.emergencyPatients.getEmergencyPatientById}/${id}`
    );
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw error;
  }
};

export const getEmergencyPatientBalanceById = async (id) => {
  try {
    const response = await makeApiRequest(
      "GET",
      `${apiExt.emergencyPatients.getEmergencyPatientBalanceById}/${id}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw error;
  }
};

export const getEmergencyPatientMedDocLabDetailsById = async (id) => {
  try {
    const response = makeApiRequest(
      "GET",
      `${apiExt.emergencyPatients.getEmergencyPatientMedDocLabDetailsById}/${id}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Somthing went wrong!");
    }
  } catch (error) {
    throw error;
  }
};

export const getEmergencyPatientMedDocLabTotalById = async (id) => {
  try {
    const response = makeApiRequest(
      "GET",
      `${apiExt.emergencyPatients.getEmergencyPatientMedDocLabTotalById}/${id}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw error;
  }
};

export const emergencyPatientDischargeReceiptGetById = async (id) => {
  try {
    const response = makeApiRequest(
      "GET",
      `${apiExt.emergencyPatients.emergencyPatientDischargeReceiptGetById}/${id}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw error;
  }
};
