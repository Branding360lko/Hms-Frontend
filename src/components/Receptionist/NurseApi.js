import axios from "axios";

export const getAllNurseReferData = async () => {
  try {
    const response = await axios.get("/api/get-all-refered-patients");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addNurseReferPatientsData = async (formData) => {
  try {
    const response = await axios.post("/api/refer-a-patients", formData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getDoctorVisitListWithIpdPatientsData = async () => {
  try {
    const response = await axios.get("/api/get-each-doctor-with-patients");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllDischargePatientsListData = async () => {
  try {
    const response = await axios.get("/api/IPDPatient-GET-ALL");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addNurseDetailsForPatientsDischargeData = async (Id, formData) => {
  try {
    const response = await axios.put(
      `/api/IPDPatientDischarge-NurseDischargeDetails-PUT/${Id}`,
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
    const response = await axios.post("/api/IPD-Create", formData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addDailyDoctorVisitEmergencyData = async (formData) => {
  try {
    const response = await axios.post(
      "/api/add-EmergencyPatientsChecks-Routes",
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getOnePatientsDoctorVisitData = async (Id) => {
  try {
    const response = await axios.get(`/api/get-one-ipd-data/${Id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getOneEmergencyPatientsDoctorVisitData = async (Id) => {
  try {
    const response = await axios.get(
      `/api/get-one-EmergencyPatientsChecks/${Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllIpdPatientsAssignedData = async () => {
  try {
    const response = await axios.get("/api/IPDPatient-GET-ALL");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllEmergencyPatientsData = async () => {
  try {
    const response = await axios.get(
      "/api/get-each-doctor-with-patients-emergency"
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllEmergencyPatientsListData = async () => {
  try {
    const response = await axios.get("/api/All-EmergencyPatientsChecks-Routes");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllDoctorVisitPatientsListData = async () => {
  try {
    const response = await axios.get("/api/All-Ipd-Routes");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getIpdPatientsFullDetailsData = async (Id) => {
  try {
    const response = await axios.get(
      `/api/get-patients-details-with-ipdId/${Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getIpdPatientsDetailsData = async (Id) => {
  try {
    const response = await axios.get(
      `/api/get-patients-details-with-ipdId/${Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getOneReferPatientDataData = async (Id) => {
  try {
    const response = await axios.get(`/api/get-one-refered-patients/${Id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
