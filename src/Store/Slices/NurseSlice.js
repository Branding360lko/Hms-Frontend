import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nurses: [],
  createNurse: "",
  updateNurse: "",
  deleteNurse: "",
};

const nurseSlice = createSlice({
  name: "nurse",
  initialState,
  reducers: {
    getAllNurses: (state, action) => {
      state.nurses = action.payload;
    },
    createNurseChange: (state, action) => {
      state.createNurse = action.payload;
    },
    updateNurseChange: (state, action) => {
      state.updateNurse = action.payload;
    },
    deleteNurseChange: (state, action) => {
      state.deleteNurse = action.payload;
    },
  },
});

export const {
  getAllNurses,
  createNurseChange,
  updateNurseChange,
  deleteNurseChange,
} = nurseSlice.actions;

export default nurseSlice.reducer;
