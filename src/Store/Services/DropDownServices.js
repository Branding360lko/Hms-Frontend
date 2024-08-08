import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DropDownServices = createApi({
  reducerPath: "IPDPatients",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.React_App_Base_url,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getDropdownPatients: builder.query({
      query: () => {
        return {
          url: "DropdownData-Patient",
          method: "GET",
          params: { query: "" },
        };
      },
    }),
    getDropdownDoctors: builder.query({
      query: () => {
        return {
          url: "DropdownData-Doctor",
          method: "GET",
          params: { query: "" },
        };
      },
    }),
    getDropdownNurses: builder.query({
      query: (query) => {
        return {
          url: "DropdownData-Nurse",
          method: "GET",
          params: query,
        };
      },
    }),
  }),
});

export const {
  useGetDropdownDoctorsQuery,
  useGetDropdownNursesQuery,
  useGetDropdownPatientsQuery,
} = DropDownServices;
