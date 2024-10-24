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
export const getAllNurseReferByNurseIdData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-all-refered-patients-by-nurseId/" +
        Id
      }`
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
export const getDoctorVisitListWithIpdPatientsNurseData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-each-doctor-with-patients-nurse/" +
        Id
      }`
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
export const getAllNurseDischargePatientsListData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-all-ipd-patients-discharge-nurse/" +
        Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllDoctorDischargePatientsListData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-all-ipd-patients-discharge-doctor/" +
        Id
      }`
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
export const getAllEmergencyDischargePatientsDoctorListData = async (Id) => {
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
export const getAllEmergencyDischargePatientsNurseListData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-emergency-discharge-patients-request-list-nurse/" +
        Id
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
export const addDailyMedicineAndLabVisitIpdData = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "IPD-create-medicine-lab"}`,

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
export const addDailyMedicineAndLabEmergencyData = async (formData) => {
  try {
    const response = await axios.post(
      `${
        process.env.React_App_Base_url +
        "add-EmergencyPatientMedicineLab-Routes"
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
export const getAllIpdPatientsAssignedNurseData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "IPDPatient-GET-ALL-Nurse/" + Id}`
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
export const getAllEmergencyPatientsWithDoctorIdData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-each-doctor-with-patients-emergency-doctor/" +
        Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllEmergencyPatientsNurseData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "/get-each-doctor-with-patients-emergency-nurse/" +
        Id
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
export const getEmergencyPatientDoctorVisitData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "check-emergency-patients-doctor-visit-data/" +
        Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getIPDPatientDoctorVisitData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url + "check-ipd-patients-doctor-visit/" + Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getInvestigationORProcedureData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url + "get-ipd-patient-lab-test-record/" + Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getInvestigationORProcedureEmergencyData = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-Emergency-patient-lab-test-record/" +
        Id
      }`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const giveDiscountToOPDPatientData = async (Id, formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "OPDPatient-Refund-by-doctor/" + Id}`,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addPatientsTestData = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "TestOfPatient-POST"}`,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getSinglePatientsTestData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "TestOfPatient-GET-ONE/" + Id}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllPatientsTestData = async (page, limit, search) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "TestOfPatient-GET-ALL"}`,
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
export const getOpdPatientsDateWiseReportData = async (date) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "download-opd-list/" + date}`,
      {
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    console.log(error, "error");

    throw new Error(error.response?.data || error.message);
  }
};
export const updateTestPatientData = async (Id, formData) => {
  try {
    const response = await axios.put(
      `${process.env.React_App_Base_url + "TestOfPatient-PUT/" + Id}`,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
export const addIpdPatientReturnMedicine = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "add-return-medicine"}`,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
export const getOneIpdPatientReturnMedicine = async (Id) => {
  try {
    const response = await axios.get(
      `${
        process.env.React_App_Base_url +
        "get-one-ipd-patient-return-medicine/" +
        Id
      }`
    );
    return response;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};
export const updateOneIpdPatientReturnMedicine = async (
  returnedMedicineId,
  ipdPatientMainId,
  formData
) => {
  try {
    const response = await axios.put(
      `${
        process.env.React_App_Base_url +
        "update-one-return-medicine/" +
        returnedMedicineId +
        "/" +
        ipdPatientMainId
      }`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};
export const giveDiscountToTestPatient = async (Id, formData) => {
  try {
    const response = await axios.post(
      `${process.env.React_App_Base_url + "add-discount-test/" + Id}`,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
export const getOpdPatientDataAlongWithPatientData = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.React_App_Base_url + "get-opd-data-with-patient-data/" +Id}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
