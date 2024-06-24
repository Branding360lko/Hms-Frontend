import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentService = createApi({
  reducerPath: "departments",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: () => {
        return {
          url: `ManageDepartment-GET-ALL`,
          method: "GET",
        };
      },
    }),
    getDepartmentById: builder.query({
      query: (id) => {
        return {
          url: `ManageDepartment-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),
    createDepartment: builder.mutation({
      query: (newData) => {
        return {
          url: `ManageDepartment-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),
    updateManageDepartmentIsAppointmentApplicableById: builder.mutation({
      query: (updateData) => {
        return {
          url: `ManageDepartment-IsAppointmentApplicable/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteDepartmentById: builder.mutation({
      query: (id) => {
        return {
          url: `ManageDepartment-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useDeleteDepartmentByIdMutation,
  useGetAllDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useUpdateManageDepartmentIsAppointmentApplicableByIdMutation,
} = departmentService;
