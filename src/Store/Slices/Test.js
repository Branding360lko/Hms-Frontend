import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  testData: [],
};
export const getTestDataHandle = createAsyncThunk(
  "getTestDataHandle",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_url + "GET-ALL-Avaliable-Test"}`
    );
    return data;
  }
);
export const Test = createSlice({
  name: "Test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTestDataHandle.fulfilled, (state, action) => {
      state.testData = action.payload;
    });
  },
});
export default Test.reducer;
