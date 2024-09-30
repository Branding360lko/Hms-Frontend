import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const IPDPatientService = createApi({
  reducerPath: "IPDPatients",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),

  endpoints: (builder) => ({
    getAllIPDPatients: builder.query({
      query: (limit, page, query) => {
        return {
          url: "IPDPatient-GET-ALL",
          method: "GET",
          params: limit,
          page,
          query,
        };
      },
    }),

    getIPDPatientById: builder.query({
      query: (id) => {
        return {
          url: `IPDPatient-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),

    createIPDPatient: builder.mutation({
      query: (newData) => {
        return {
          url: `IPDPatient-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),

    updateIPDPatientById: builder.mutation({
      query: (updateData) => {
        return {
          url: `IPDPatient-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    deleteIPDPatientById: builder.mutation({
      query: (id) => {
        return {
          url: `IPDPatient-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),

    addIPDPatientBalanceById: builder.mutation({
      query: (updateData) => {
        return {
          url: `IPDPatient-PUT-UpdateDepositAmount/${updateData.ipdPatientMainId}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    ipdPatientDischargeRequest: builder.mutation({
      query: (id) => {
        return {
          url: `IPDPatientDischargeRequest-PUT/${id}`,
          method: "PUT",
          // body: updateData.data,
        };
      },
    }),

    ipdPatientMedDocLabChargesGetById: builder.mutation({
      query: (id) => {
        return {
          url: `get-one-ipd-data-total/${id}`,
          method: "GET",
          // body: updateData.data,
        };
      },
    }),

    ipdPatientFinalBalanceCalGetAll: builder.query({
      query: () => {
        return {
          url: `IPDPatient-Balance-GET-ALL`,
          method: "GET",
          // body: updateData.data,
        };
      },
    }),
    ipdPatientFinalBalanceCalGetById: builder.mutation({
      query: (id) => {
        return {
          url: `IPDPatient-Balance-GET/${id}`,
          method: "GET",
          // body: updateData.data,
        };
      },
    }),
    ipdPatientFinalDischargeById: builder.mutation({
      query: (id) => {
        return {
          url: `IPDPatient-PUT-DISCHARGE/${id}`,
          method: "PUT",
          // body: updateData.data,
        };
      },
    }),
    ipdPatientMedLabDocDetailById: builder.mutation({
      query: (id) => {
        return {
          url: `get-one-ipd-data/${id}`,
          method: "GET",
          // body: updateData.data,
        };
      },
    }),
    ipdPatientDischargeReceiptGetById: builder.mutation({
      query: (id) => {
        return {
          url: `IPDPatientDischargeReciept-GET-ONE/${id}`,
          method: "GET",
          // body: updateData.data,
        };
      },
    }),
    ipdPatientChangeBedById: builder.mutation({
      query: (data) => {
        return {
          url: `IPDPatient-PUT-ChangeBed/${data?.id}`,
          method: "PUT",
          body: data?.newBedId,
        };
      },
    }),
  }),
});

export const {
  useGetAllIPDPatientsQuery,
  useGetIPDPatientByIdQuery,
  useCreateIPDPatientMutation,
  useUpdateIPDPatientByIdMutation,
  useDeleteIPDPatientByIdMutation,
  useAddIPDPatientBalanceByIdMutation,
  useIpdPatientDischargeRequestMutation,
  useIpdPatientMedDocLabChargesGetByIdMutation,
  useIpdPatientFinalBalanceCalGetAllQuery,
  useIpdPatientFinalDischargeByIdMutation,
  useIpdPatientMedLabDocDetailByIdMutation,
  useIpdPatientFinalBalanceCalGetByIdMutation,
  useIpdPatientDischargeReceiptGetByIdMutation,
  useIpdPatientChangeBedByIdMutation,
} = IPDPatientService;
