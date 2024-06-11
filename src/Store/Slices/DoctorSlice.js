import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  doctors: [],
  doctorProfessionalDetails: [],
  createDoctor: "",
  updateDoctor: "",
  deleteDoctor: "",
};
export const GetAllDoctorsHandle = createAsyncThunk(
  "GetAllDoctorsHandle",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_url + "Doctor-GET-ALL"}`
    );
    return data;
  }
);
const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    getAllDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    getAllDoctorsProfessionalDetails: (state, action) => {
      state.doctorProfessionalDetails = action.payload;
    },
    createDoctorChange: (state, action) => {
      state.createDoctor = action.payload;
    },
    updateDoctorChange: (state, action) => {
      state.updateDoctor = action.payload;
    },
    deleteDoctorChange: (state, action) => {
      state.deleteDoctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllDoctorsHandle.fulfilled, (state, action) => {
      state.doctors = action.payload;
    });
  },
});

export const {
  getAllDoctors,
  createDoctorChange,
  updateDoctorChange,
  deleteDoctorChange,
  getAllDoctorsProfessionalDetails,
} = doctorSlice.actions;

export default doctorSlice.reducer;
