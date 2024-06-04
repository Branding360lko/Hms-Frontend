import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emergencyPatients: [],
  createEmergencyPatient: "",
  updateEmergencyPatient: "",
  deleteEmergencyPatient: "",
};

const EmergencyPatientSlice = createSlice({
  name: "EmergencyPatient",
  initialState,
  reducers: {
    getAllEmergencyPatient: (state, action) => {
      state.emergencyPatients = action.payload;
    },
    createEmergencyPatientChange: (state, action) => {
      state.createEmergencyPatient = action.payload;
    },
    updateEmergencyPatientChange: (state, action) => {
      state.updateEmergencyPatient = action.payload;
    },
    deleteEmergencyPatientChange: (state, action) => {
      state.deleteEmergencyPatient = action.payload;
    },
  },
});

export const {
  getAllEmergencyPatient,
  createEmergencyPatientChange,
  updateEmergencyPatientChange,
  deleteEmergencyPatientChange,
} = EmergencyPatientSlice.actions;

export default EmergencyPatientSlice.reducer;
