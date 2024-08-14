import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorService = createApi({
  reducerPath: "doctors",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: (params) => {
        return {
          url: `Doctor-GET-ALL`,
          method: "GET",
          params: {
            page: params?.page,
            limit: params?.limit,
            doctorNameForSearch: params?.doctorNameForSearch,
            doctorMobileNumberForSearch: params?.doctorMobileNumberForSearch,
            doctorIdForSearch: params?.doctorIdForSearch,
          },
        };
      },
    }),
    getDoctorById: builder.query({
      query: (id) => {
        return {
          url: `Doctor-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),
    getAllDoctorProfessionalDetails: builder.query({
      query: (params) => {
        return {
          url: `DoctorProfDetails-GET-ALL`,
          method: "GET",
          params: {
            page: params?.page,
            limit: params?.limit,
            query: params?.query,
          },
        };
      },
    }),
    createDoctor: builder.mutation({
      query: (newData) => {
        return {
          url: `Doctor-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),
    updateDoctorById: builder.mutation({
      query: (updateData) => {
        return {
          url: `Doctor-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteDoctorById: builder.mutation({
      query: (id) => {
        return {
          url: `Doctor-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllDoctorsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorByIdMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorByIdMutation,
  useGetAllDoctorProfessionalDetailsQuery,
} = doctorService;
