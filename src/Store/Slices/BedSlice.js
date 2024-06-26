import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beds: [],
  createBeds: "",
  updateBeds: "",
  deleteBeds: "",
};

const bedSlice = createSlice({
  name: "beds",
  initialState,
  reducers: {
    getAllBeds: (state, action) => {
      state.beds = action.payload;
    },
    createBedChange: (state, action) => {
      state.createBeds = action.payload;
    },
    updateBedsChange: (state, action) => {
      state.updateBeds = action.payload;
    },
    deleteBedsChange: (state, action) => {
      state.deleteBeds = action.payload;
    },
  },
});

export const {
  getAllBeds,
  createBedChange,
  updateBedsChange,
  deleteBedsChange,
} = bedSlice.actions;

export default bedSlice.reducer;
