import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nurses: [],
  createNurse: "",
  updateNurse: "",
  deleteNurse: "",
  page: 1,
  limit: 10,
  totalPages: 1,
  nurseIdForSearching: "",
  nurseNameForSearching: "",
  nurseMobileNoForSearching: "",
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
    pageChange: (state, action) => {
      state.page = action.payload;
    },
    limitChange: (state, action) => {
      state.limit = action.payload;
    },
    totalPagesChange: (state, action) => {
      state.totalPages = action.payload;
    },
    nurseIdForSearchingChange: (state, action) => {
      state.nurseIdForSearching = action.payload;
    },
    nurseNameForSearchingChange: (state, action) => {
      state.nurseNameForSearching = action.payload;
    },
    nurseMobileNoForSearchingChange: (state, action) => {
      state.nurseMobileNoForSearching = action.payload;
    },
  },
});

export const {
  getAllNurses,
  createNurseChange,
  updateNurseChange,
  deleteNurseChange,
  pageChange,
  limitChange,
  totalPagesChange,
  nurseIdForSearchingChange,
  nurseNameForSearchingChange,
  nurseMobileNoForSearchingChange,
} = nurseSlice.actions;

export default nurseSlice.reducer;
