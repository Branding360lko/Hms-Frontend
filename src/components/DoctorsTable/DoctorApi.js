import axios from "axios";

export const getAllOpdPatientsData = async () => {
  try {
    const response = await axios.get("/api/OPDPatient-GET-ALL");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOpdPatientsDoctorData = async () => {
  try {
    const response = await axios.get("/api/OPD-GET-ALL");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addOpdDoctorCheckData = async (formData) => {
  try {
    const response = await axios.post("/api/OPD-Create", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getOneOpdDoctorCheckData = async (Id) => {
  try {
    const response = await axios.get(`/api/get-one-opd-data/${Id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const updateOpdDoctorCheckData = async (Id, formData) => {
  try {
    const response = await axios.put(`/api/update-one-Opd/${Id}`, formData);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const getAllIPDPatientsDataByDoctorId = async (Id) => {
  try {
    const response = await axios.get(`/api/ipd-patients/${Id}`);
    return response;
  } catch (error) {
    throw new Error();
  }
};
export const getAllIPDPatientsDoctorVisitData = async () => {
  try {
    const response = await axios.get("/api/All-Ipd-Routes");
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const addIpdDoctorCheckData = async (formData) => {
  try {
    const response = await axios.post("/api/IPD-Create", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getOneIpdDoctorCheckData = async (Id) => {
  try {
    const response = await axios.get(`/api/get-one-ipd-data/${Id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getReferPatientsData = async () => {
  try {
    const response = await axios.get("/api/get-all-refered-patients");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addDoctorDetailsForPatientsDischargeData = async (
  Id,
  formData
) => {
  try {
    const response = await axios.put(
      `/api/IPDPatientDischarge-DoctorDischargeDetails-PUT/${Id}`,
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
export const getAllIpdPatientsData = async () => {
  try {
    const response = await axios.get("/api/IPDPatient-GET-ALL");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
