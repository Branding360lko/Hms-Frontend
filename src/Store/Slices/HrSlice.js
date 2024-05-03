import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  EmpoyeeData: [],
};
export const getEmployeeDataHandle = createAsyncThunk(
  "getEmployeeDataHandle",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_url + "Get-all-empolyee"}`
    );
    console.log(data, "data");
    return data;
  }
);
export const Employee = createSlice({
  name: "Employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeeDataHandle.fulfilled, (state, action) => {
      state.EmpoyeeData = action.payload;
    });
  },
});
export default Employee.reducer;
