import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emergencyPatientService = createApi({
  reducerPath: "emergencyPatient",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllEmergencyPatient: builder.query({
      query: () => {
        return {
          url: "EmergencyPatient-GET-ALL",
          method: "GET",
        };
      },
    }),
    getEmergencyPatientById: builder.query({
      query: (id) => {
        return {
          url: `EmergencyPatient-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),

    getEmergencyPatientBalanceById: builder.query({
      query: (id) => {
        return {
          url: `EmergencyPatient-Balance-GET/${id}`,
          method: "GET",
        };
      },
    }),
    getAllEmergencyPatientBalance: builder.query({
      query: () => {
        return {
          url: `EmergencyPatient-Balance-GET-ALL`,
          method: "GET",
        };
      },
    }),
    getEmergencyPatientMedDocLabDetailsById: builder.query({
      query: (id) => {
        return {
          url: `get-one-emergency-patients-data/${id}`,
          method: "GET",
        };
      },
    }),

    getEmergencyPatientMedDocLabTotalById: builder.query({
      query: (id) => {
        return {
          url: `get-one-emergency-patients-data-total/${id}`,
          method: "GET",
        };
      },
    }),
    createEmergencyPatient: builder.mutation({
      query: (newData) => {
        return {
          url: `EmergencyPatient-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),
    updateEmergencyPatientById: builder.mutation({
      query: (updateData) => {
        return {
          url: `EmergencyPatient-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteEmergencyPatientById: builder.mutation({
      query: (id) => {
        return {
          url: `EmergencyPatient-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
    addEmergencyPatientExtraChargesById: builder.mutation({
      query: (updateData) => {
        return {
          url: `EmergencyPatient-PUT-AddItemCharges/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    addEmergencyPatientBalanceById: builder.mutation({
      query: (updateData) => {
        return {
          url: `EmergencyPatient-PUT-UpdateDepositAmount/${updateData.emergencyPatientMainId}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
  }),
});

export const {
  useCreateEmergencyPatientMutation,
  useDeleteEmergencyPatientByIdMutation,
  useGetAllEmergencyPatientQuery,
  useGetEmergencyPatientByIdQuery,
  useUpdateEmergencyPatientByIdMutation,
  useGetAllEmergencyPatientBalanceQuery,
  useGetEmergencyPatientBalanceByIdQuery,
  useGetEmergencyPatientMedDocLabDetailsByIdQuery,
  useGetEmergencyPatientMedDocLabTotalByIdQuery,
  useAddEmergencyPatientExtraChargesByIdMutation,
  useAddEmergencyPatientBalanceByIdMutation,
} = emergencyPatientService;
