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