import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  createDepartment: "",
  updateDepartment: "",
  deleteDepartment: "",
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    getAllDepartments: (state, action) => {
      state.departments = action.payload;
    },
    createDepartmentChange: (state, action) => {
      state.createDepartment = action.payload;
    },
    updateDepartmentChange: (state, action) => {
      state.updateDepartment = action.payload;
    },
    deleteDepartmentChange: (state, action) => {
      state.deleteDepartment = action.payload;
    },
  },
});

export const {
  getAllDepartments,
  createDepartmentChange,
  updateDepartmentChange,
  deleteDepartmentChange,
} = departmentSlice.actions;

export default departmentSlice.reducer;
