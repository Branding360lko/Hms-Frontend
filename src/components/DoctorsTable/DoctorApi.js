import axios from "axios";

export const getAllOpdPatientsData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "OPDPatient-GET-ALL"}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getAllOpdPatientsWithDoctorIdData = async (Id, page, limit) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "OPDPatient-GET-ALL-with-doctorId/" +
        Id
      }`,
      {
        params: {
          page,
          limit,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOpdPatientsDoctorData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "OPD-GET-ALL"}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addOpdDoctorCheckData = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "OPD-Create"}`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getOneOpdDoctorCheckData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-one-opd-data/" + Id}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const getOneOpdDoctorCheckWithOpdPatientIdData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url + "get-one-opd-data-opdPatientId/" + Id
      }`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const updateOpdDoctorCheckData = async (Id, formData) => {
  try {
    const response = await axios.put(
      `${process.env.React_App_Base_url + "update-one-Opd/" + Id}`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const getAllIPDPatientsDataByDoctorId = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "ipd-patients/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error();
  }
};
export const getAllIPDPatientsDoctorVisitData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "All-Ipd-Routes"}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const addIpdDoctorCheckData = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "IPD-Create"}`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getOneIpdDoctorCheckData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-one-ipd-data/" + Id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getReferPatientsData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-all-refered-patients"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getReferPatientsByDoctorIdData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-all-refered-patients-by-doctorId/" +
        Id
      }`
    );
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
      `${
        process.env.React_App_Base_url +
        "IPDPatientDischarge-DoctorDischargeDetails-PUT/" +
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
export const addDoctorDetailsForEmergencyPatientsDischargeData = async (
  Id,
  formData
) => {
  try {
    const response = await axios.put(
      `${
        process.env.React_App_Base_url +
        "EmergencyPatientDischarge-DoctorDischargeDetails-PUT/" +
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
export const getAllIpdPatientsData = async () => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "IPDPatient-GET-ALL"}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllDischargePatientsWithDoctorIdData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-emergency-discharge-patients-request-list-doctor/" +
        Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getDoctorDashboardData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "doctor-dashboard-details/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getNurseDashboardData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "nurse-dashboard-details/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateOpdDoctorVisitCompletedStatusData = async (Id) => {
  try {
    const response = await axios.put(
      `${process.env.React_App_Base_url + "update-doctor-visited-status/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getSearchResultDoctorPanelData = async (
  Id,
  page,
  limit,
  search
) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url + "OPDPatient-Search-with-doctorId/" + Id
      }`,
      {
        params: {
          page,
          limit,
          search,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getDoctorNameData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-doctor-name/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
