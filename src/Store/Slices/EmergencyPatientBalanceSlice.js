import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateEmergencyPatientDepositAmount: "",
  updateEmergencyPatientLabTestCharges: "",
  updateEmergencyPatientMedicalCharges: "",
};

const EmergencyPatientBalanceSlice = createSlice({
  name: "EmergencyPatientBalance",
  initialState,
  reducers: {
    updateEmergencyPatientDepositAmountChange: (state, action) => {
      state.updateEmergencyPatientDepositAmount = action.payload;
    },
    updateEmergencyPatientLabTestChargesChange: (state, action) => {
      state.updateEmergencyPatientLabTestCharges = action.payload;
    },
    updateEmergencyPatientMedicalChargesChange: (state, action) => {
      state.updateEmergencyPatientMedicalCharges = action.payload;
    },
  },
});

export const {
  updateEmergencyPatientDepositAmountChange,
  updateEmergencyPatientLabTestChargesChange,
  updateEmergencyPatientMedicalChargesChange,
} = EmergencyPatientBalanceSlice.actions;
export default EmergencyPatientBalanceSlice.reducer;
