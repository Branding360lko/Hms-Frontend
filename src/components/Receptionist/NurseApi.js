import axios from "axios";

export const getAllNurseReferData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-all-refered-patients"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addNurseReferPatientsData = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "refer-a-patients"}`,

      formData
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getDoctorVisitListWithIpdPatientsData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-each-doctor-with-patients"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllDischargePatientsListData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "IPDPatient-GET-ALL"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllEmergencyDischargePatientsListData = async () => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-emergency-discharge-patients-request-list"
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addNurseDetailsForPatientsDischargeData = async (Id, formData) => {
  try {
    const response = await axios.put(
      `${
        process.env.React_App_Base_url +
        "IPDPatientDischarge-NurseDischargeDetails-PUT/" +
        Id
      }`,

      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addNurseDetailsForEmergencyPatientsDischargeData = async (
  Id,
  formData
) => {
  try {
    const response = await axios.put(
      `${
        process.env.React_App_Base_url +
        "EmergencyPatientDischarge-NurseDischargeDetails-PUT/" +
        Id
      }`,

      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addDailyDoctorVisitIpdData = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "IPD-Create"}`,

      formData
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addDailyDoctorVisitEmergencyData = async (formData) => {
  try {
    const response = await axios.post(
      `${
        process.env.React_App_Base_url + "add-EmergencyPatientsChecks-Routes"
      }`,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getOnePatientsDoctorVisitData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-one-ipd-data/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getOneEmergencyPatientsDoctorVisitData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url + "get-one-EmergencyPatientsChecks/" + Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllIpdPatientsAssignedData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "IPDPatient-GET-ALL"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllEmergencyPatientsData = async () => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "/get-each-doctor-with-patients-emergency"
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllEmergencyPatientsListData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "All-EmergencyPatientsChecks-Routes"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllDoctorVisitPatientsListData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "All-Ipd-Routes"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getIpdPatientsFullDetailsData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url + "get-patients-details-with-ipdId/" + Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getIpdPatientsDetailsData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url + "get-patients-details-with-ipdId/" + Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getOneReferPatientDataData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-one-refered-patients/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
