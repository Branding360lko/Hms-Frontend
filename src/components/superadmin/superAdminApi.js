import axios from "axios";
// Medicine Inventory Api
export const getAllMedicineData = async () => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "GET-ALL-Medicine"}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const addMedicineData = async (formData) => {
    try {
        const response = await axios.post(
            `${process.env.React_App_Base_url + "add-medicine"}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const getOneMedicineData = async (Id) => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "get-one-medicine/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const updateOneMedicineData = async (Id, formData,) => {
    try {
        const response = await axios.put(
            `${process.env.React_App_Base_url + "update-one-medicine-data/" + Id}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const deleteOneMedicineData = async (Id,) => {
    try {
        const response = await axios.delete(
            `${process.env.React_App_Base_url + "delete-one-medicine/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
// Test or Diagonsis Api

export const getAllDiagonsisData = async () => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "GET-ALL-Test"}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const addDiagonsisData = async (formData) => {
    try {
        const response = await axios.post(
            `${process.env.React_App_Base_url + "Add-Test"}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const getOneDiagonsisData = async (Id) => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "get-one-test/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const updateOneDiagonsisData = async (Id, formData,) => {
    try {
        const response = await axios.put(
            `${process.env.React_App_Base_url + "update-one-test-data/" + Id}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const deleteOneDiagonsisData = async (Id,) => {
    try {
        const response = await axios.delete(
            `${process.env.React_App_Base_url + "delete-one-test/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Admission Charges Api

export const getAllAdmissionChargeData = async () => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "get-all-admission-charges"}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const addAdmissionChargeData = async (formData) => {
    try {
        const response = await axios.post(
            `${process.env.React_App_Base_url + "add-admission-charge"}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const getOneAdmissionChargeData = async (Id) => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "get-one-admission-charge/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const updateAdmissionChargeData = async (Id, formData,) => {
    try {
        const response = await axios.put(
            `${process.env.React_App_Base_url + "update-one-admission-charge/" + Id}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const deleteAdmissionChargeData = async (Id,) => {
    try {
        const response = await axios.delete(
            `${process.env.React_App_Base_url + "delete-one-admission-charge/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Vital Service Api

export const getAllVitalServicetData = async () => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "get-all-vital-care"}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const addVitalServiceData = async (formData) => {
    try {
        const response = await axios.post(
            `${process.env.React_App_Base_url + "add-vital-care"}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const getOneVitalServiceData = async (Id) => {
    try {
        const response = await axios.get(
            `${process.env.React_App_Base_url + "get-one-vital-care/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const updateVitalServiceData = async (Id, formData,) => {
    try {
        const response = await axios.put(
            `${process.env.React_App_Base_url + "update-one-vital-care/" + Id}`, formData
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const deleteVitalServiceData = async (Id,) => {
    try {
        const response = await axios.delete(
            `${process.env.React_App_Base_url + "delete-one-vital-care/" + Id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}