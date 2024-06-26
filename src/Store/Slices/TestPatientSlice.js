import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testOfPatients: [],
  createTestOfPatients: "",
  updateTestOfPatients: "",
  deleteTestOfPatients: "",
};

const testOfPatientSlice = createSlice({
  name: "testOfPatient",
  initialState,
  reducers: {
    getAllTestOfPatient: (state, action) => {
      state.testOfPatients = action.payload;
    },
    createTestOfPatientChange: (state, action) => {
      state.createTestOfPatients = action.payload;
    },
    updateTestOfPatientChange: (state, action) => {
      state.updateTestOfPatients = action.payload;
    },
    deleteTestOfPatientChange: (state, action) => {
      state.deleteTestOfPatients = action.payload;
    },
  },
});

export const {
  getAllTestOfPatient,
  createTestOfPatientChange,
  updateTestOfPatientChange,
  deleteTestOfPatientChange,
} = testOfPatientSlice.actions;

export default testOfPatientSlice.reducer;
