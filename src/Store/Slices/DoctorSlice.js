import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  doctors: [],
  doctorProfessionalDetails: [],
  createDoctor: "",
  updateDoctor: "",
  deleteDoctor: "",
  page: 1,
  limit: 10,
  totalPages: 1,
  doctorNameForSearch: "",
  doctorMobileNumberForSearch: "",
  doctorIdForSearch: "",
};

export const GetAllDoctorsHandle = createAsyncThunk(
  "GetAllDoctorsHandle",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_url + "get-all-doctor"}`
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
    pageChange: (state, action) => {
      state.page = action.payload;
    },
    limitChange: (state, action) => {
      state.limit = action.payload;
    },
    totalPagesChange: (state, action) => {
      state.totalPages = action.payload;
    },
    doctorNameForSearchChange: (state, action) => {
      state.doctorNameForSearch = action.payload;
    },
    doctorMobileNumberForSearchChange: (state, action) => {
      state.doctorMobileNumberForSearch = action.payload;
    },
    doctorIdForSearchChange: (state, action) => {
      state.doctorIdForSearch = action.payload;
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
  pageChange,
  limitChange,
  totalPagesChange,
  doctorNameForSearchChange,
  doctorMobileNumberForSearchChange,
  doctorIdForSearchChange,
} = doctorSlice.actions;

export default doctorSlice.reducer;
