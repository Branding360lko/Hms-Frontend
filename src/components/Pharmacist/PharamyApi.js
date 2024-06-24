import axios from "axios";

export const getAllIpdPatientsData = async () => {
  try {
    const result = await axios.get("/api/IPDPatient-GET-ALL");
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllPharmacyData = async () => {
  try {
    const result = await axios.get("/api/get-all-pharamacy");
    return result;
  } catch (error) {}
};
