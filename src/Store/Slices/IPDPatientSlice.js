import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ipdPatients: [],
  createIpdPatient: "",
  updateIpdPatient: "",
  deleteIpdPatient: "",
};

export const GetIpdPatientsHandle = createAsyncThunk(
  "GetIpdPatientsHandle",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_url + "IPDPatient-GET-ALL"}`
    );
    return data;
  }
);
const IPDPatientSlice = createSlice({
  name: "IPDPatients",
  initialState,
  reducers: {
    getAllIPDPatients: (state, action) => {
      state.ipdPatients = action.payload;
    },
    createIpdPatientChange: (state, action) => {
      state.createIpdPatient = action.payload;
    },
    updateIpdPatientChange: (state, action) => {
      state.updateIpdPatient = action.payload;
    },
    deleteIpdPatientChange: (state, action) => {
      state.deleteIpdPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetIpdPatientsHandle.fulfilled, (state, action) => {
      state.ipdPatients = action.payload;
    });
  },
});

export const {
  getAllIPDPatients,
  createIpdPatientChange,
  updateIpdPatientChange,
  deleteIpdPatientChange,
} = IPDPatientSlice.actions;

export default IPDPatientSlice.reducer;
