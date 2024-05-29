import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateIpdPatientDepositAmount: "",
  updateIpdPatientLabTestCharges: "",
  updateIpdPatientMedicalCharges: "",
};

const IPDPatientBalanceSlice = createSlice({
  name: "IPDPatientBalance",
  initialState,
  reducers: {
    updateIpdPatientDepositAmountChange: (state, action) => {
      state.updateIpdPatientDepositAmount = action.payload;
    },
    updateIpdPatientLabTestChargesChange: (state, action) => {
      state.updateIpdPatientLabTestCharges = action.payload;
    },
    updateIpdPatientMedicalChargesChange: (state, action) => {
      state.updateIpdPatientMedicalCharges = action.payload;
    },
  },
});

export const {
  updateIpdPatientDepositAmountChange,
  updateIpdPatientLabTestChargesChange,
  updateIpdPatientMedicalChargesChange,
} = IPDPatientBalanceSlice.actions;

export default IPDPatientBalanceSlice.reducer;
