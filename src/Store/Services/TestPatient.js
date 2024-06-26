import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testOfPatientService = createApi({
  reducerPath: "testOfPatient",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllTestOfPatient: builder.query({
      query: () => {
        return {
          url: "TestOfPatient-GET-ALL",
          method: "GET",
        };
      },
    }),
    getTestOfPatientById: builder.query({
      query: (id) => {
        return {
          url: `TestOfPatient-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),
    createTestOfPatient: builder.mutation({
      query: (newData) => {
        return {
          url: `TestOfPatient-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),
    updateTestOfPatientById: builder.mutation({
      query: (updateData) => {
        return {
          url: `TestOfPatient-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteTestOfPatientById: builder.mutation({
      query: (id) => {
        return {
          url: `TestOfPatient-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateTestOfPatientMutation,
  useDeleteTestOfPatientByIdMutation,
  useGetAllTestOfPatientQuery,
  useGetTestOfPatientByIdQuery,
  useUpdateTestOfPatientByIdMutation,
} = testOfPatientService;
