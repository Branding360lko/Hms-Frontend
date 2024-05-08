import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wards: [],
  createWards: "",
  updateWards: "",
  deleteWards: "",
};

const WardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {
    getAllWards: (state, action) => {
      state.wards = action.payload;
    },
    createWardsChange: (state, action) => {
      state.updateWards = action.payload;
    },
    updateWardsChange: (state, action) => {
      state.updateWards = action.payload;
    },
    deleteWardsChange: (state, action) => {
      state.deleteWards = action.payload;
    },
  },
});

export const {
  getAllWards,
  createWardsChange,
  updateWardsChange,
  deleteWardsChange,
} = WardSlice.actions;

export default WardSlice.reducer;
