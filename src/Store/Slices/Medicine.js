import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  medicineData: [],
};
export const getMedicineDataHandle = createAsyncThunk(
  "getMedicineDataHandle",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_url + "GET-ALL-Medicine"}`
    );
    console.log(data);
    return data;
  }
);
export const Medicine = createSlice({
  name: "Medicine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMedicineDataHandle.fulfilled, (state, action) => {
      state.medicineData = action.payload;
    });
  },
});
export default Medicine.reducer;
