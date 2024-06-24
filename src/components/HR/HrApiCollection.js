import axios from "axios";
export const addNewEmployee = async (formData) => {
  const { data } = await axios
    .post(`${process.env.React_App_Base_url + "create-empolyee"}`, formData, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));

  return data;
};
export const getAllEmployeeData = async () => {
  const { data } = await axios
    .get(`${process.env.React_App_Base_url + "Get-all-empolyee"}`, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const addCompensationData = async (formData) => {
  const { data } = await axios
    .post(
      `${process.env.React_App_Base_url + "Empoyee/comapensation/create"}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));

  return data;
};
export const addEmployeeAppoiment = async (formData) => {
  const { data } = await axios
    .post(
      `${process.env.React_App_Base_url + "create-appointment"}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));

  return data;
};
export const getAllAppoimentData = async () => {
  const { data } = await axios
    .get(`${process.env.React_App_Base_url + "get-all-appointment"}`, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const getAllCompensitionData = async () => {
  const { data } = await axios
    .get(`${process.env.React_App_Base_url + "Empoyee/comapensation/all"}`, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const getOneAppoimentData = async (id) => {
  const { data } = await axios
    .get(`${process.env.React_App_Base_url + "get-appointment-by-id/" + id}`, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const getOneEmployeeData = async (id) => {
  const { data } = await axios
    .get(`${process.env.React_App_Base_url + "/get-one-empolyee/" + id}`, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const getOneCompensationData = async (id) => {
  const { data } = await axios
    .get(`${process.env.React_App_Base_url + "Empoyee/comapensation/" + id}`, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const updateEmployeeData = async (id, formData) => {
  const { data } = await axios
    .put(
      `${process.env.React_App_Base_url + "update-employee/" + id}`,
      formData,
      {
        headers: { "Content-type": "multipart/form-data" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};

export const updateEmployeeStatusHandle = async (id, formData) => {
  const { data } = await axios
    .put(
      `${process.env.React_App_Base_url + "update-employee/" + id}`,
      formData,
      {
        headers: { "Content-type": "multipart/form-data" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const updateAppoimentData = async (id, formData) => {
  const { data } = await axios
    .put(
      `${process.env.React_App_Base_url + "appointemant-update/" + id}`,
      formData,
      {
        headers: { "Content-type": "multipart/form-data" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const updateCompensationData = async (id, formData) => {
  const data = await axios
    .put(
      `${
        process.env.React_App_Base_url + "Employee/compensation-update/" + id
      }`,
      formData,
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const getAllBackGroundVericationData = async () => {
  const { data } = await axios
    .get(`${process.env.React_App_Base_url + "employee-Varifcatio/get"}`, {
      headers: { "Content-type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
export const addBackGroundVerification = async (formData) => {
  const data = await axios
    .post(
      `${process.env.React_App_Base_url + "employee-varification/create"}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));

  return data;
};
export const getOneBackgroundVerificationData = async (id) => {
  const data = await axios
    .get(
      `${process.env.React_App_Base_url + "employee-Varifiaction/get/" + id}`,
      {
        headers: { "Content-type": "multipart/form-data" },
      }
    )
    .then((response) => response)
    .catch((error) => console.log(error));
  return data;
};
