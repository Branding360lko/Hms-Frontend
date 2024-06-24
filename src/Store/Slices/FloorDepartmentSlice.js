import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  floorDepartments: [],
  createFloorDepartment: "",
  updateFloorDepartment: "",
  deleteFloorDepartment: "",
};

const floorDepartmentSlice = createSlice({
  name: "floorsDepartments",
  initialState,
  reducers: {
    getAllFloorDepartments: (state, action) => {
      state.floorDepartments = action.payload;
    },
    createFloorDepartmentChange: (state, action) => {
      state.createFloorDepartment = action.payload;
    },
    updateFloorDepartmentChange: (state, action) => {
      state.updateFloorDepartment = action.payload;
    },
    deleteFloorDepartmentChange: (state, action) => {
      state.deleteFloorDepartment = action.payload;
    },
  },
});

export const {
  getAllFloorDepartments,
  createFloorDepartmentChange,
  updateFloorDepartmentChange,
  deleteFloorDepartmentChange,
} = floorDepartmentSlice.actions;
export default floorDepartmentSlice.reducer;
