import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OPDPatients: [],
  createOPDPatient: "",
  updateOPDPatient: "",
  deleteOPDPatient: "",
  page: 1,
  limit: 10,
  totalPages: 0,
  patientName: "",
  opdPatientId: "",
  patientMobileNumber: "",
};

const OPDPatientSlice = createSlice({
  name: "OPDPatients",
  initialState,
  reducers: {
    getAllOPDPatients: (state, action) => {
      state.OPDPatients = action.payload;
    },
    createOPDPatientChange: (state, action) => {
      state.createOPDPatient = action.payload;
    },
    updateOPDPatientChange: (state, action) => {
      state.updateOPDPatient = action.payload;
    },
    deleteOPDPatientChange: (state, action) => {
      state.deleteOPDPatient = action.payload;
    },
    pageChange: (state, action) => {
      state.page = action.payload;
    },
    limitChange: (state, action) => {
      state.limit = action.payload;
    },
    patientNameChange: (state, action) => {
      state.patientName = action.payload;
    },
    opdPatientIdChange: (state, action) => {
      state.opdPatientId = action.payload;
    },
    patientMobileNumberChange: (state, action) => {
      state.patientMobileNumber = action.payload;
    },
    totalPagesChange: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  getAllOPDPatients,
  createOPDPatientChange,
  updateOPDPatientChange,
  deleteOPDPatientChange,
  pageChange,
  limitChange,
  patientNameChange,
  opdPatientIdChange,
  patientMobileNumberChange,
  totalPagesChange,
} = OPDPatientSlice.actions;

export default OPDPatientSlice.reducer;
