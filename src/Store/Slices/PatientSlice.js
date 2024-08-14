import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  patientCreate: "",
  patientUpdate: "",
  patientDelete: "",
  page: 1,
  limit: 10,
  totalPages: 1,
  patientUHIDforSearch: "",
  patientNameForSearch: "",
  patientMobileNumberForSearch: "",
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    getAllPatients: (state, action) => {
      state.patients = action.payload;
    },
    createPatientChange: (state, action) => {
      state.patientCreate = action.payload;
    },
    updatePatientChange: (state, action) => {
      state.patientCreate = action.payload;
    },
    deletePatientChange: (state, action) => {
      state.patientCreate = action.payload;
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
    patientUHIDforSearchChange: (state, action) => {
      state.patientUHIDforSearch = action.payload;
    },
    patientNameForSearchChange: (state, action) => {
      state.patientNameForSearch = action.payload;
    },
    patientMobileNumberForSearchChange: (state, action) => {
      state.patientMobileNumberForSearch = action.payload;
    },
  },
});

export const {
  getAllPatients,
  createPatientChange,
  updatePatientChange,
  deletePatientChange,
  pageChange,
  limitChange,
  totalPagesChange,
  patientUHIDforSearchChange,
  patientNameForSearchChange,
  patientMobileNumberForSearchChange,
} = patientSlice.actions;

export default patientSlice.reducer;
