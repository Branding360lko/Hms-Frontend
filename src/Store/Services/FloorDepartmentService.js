import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const floorDepartmentServices = createApi({
  reducerPath: "floorDepartments",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllFloorDepartments: builder.query({
      query: () => {
        return {
          url: `FloorsDepartment-GET-ALL`,
          method: "GET",
        };
      },
    }),
    getFloorDepartmentById: builder.query({
      query: (id) => {
        return {
          url: `FloorsDepartment-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),
    createFloorDepartment: builder.mutation({
      query: (newData) => {
        return {
          url: `FloorsDepartment-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),
    updateFloorDepartmentIsAppointmentApplicableById: builder.mutation({
      query: (updateData) => {
        return {
          url: `FloorDepartment-PUT-IsAppointmentApplicable/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteFloorDepartmentById: builder.mutation({
      query: (id) => {
        return {
          url: `FloorsDepartment-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateFloorDepartmentMutation,
  useDeleteFloorDepartmentByIdMutation,
  useGetAllFloorDepartmentsQuery,
  useGetFloorDepartmentByIdQuery,
  useUpdateFloorDepartmentIsAppointmentApplicableByIdMutation,
} = floorDepartmentServices;
