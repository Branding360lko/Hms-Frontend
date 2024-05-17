import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const IPDPatientBalanceService = createApi({
  reducerPath: "IPDPatientsBalance",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),

  endpoints: (builder) => ({
    getIPDPatientBalanceById: builder.query({
      query: (id) => {
        return {
          url: `IPDPatient-Balance-GET/${id}`,
          method: "GET",
        };
      },
    }),

    updateIPDPatientDepositAmountById: builder.mutation({
      query: (updateData) => {
        return {
          url: `IPDPatient-PUT-UpdateDepositAmount/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    updateIPDPatientMedicalChargesById: builder.mutation({
      query: (updateData) => {
        return {
          url: `IPDPatient-PUT-AddItemCharges/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    updateIPDPatientLabTestChargesById: builder.mutation({
      query: (updateData) => {
        return {
          url: `IPDPatient-PUT-AddLabTestCharges/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
  }),
});

export const {
  useGetIPDPatientBalanceByIdQuery,
  useUpdateIPDPatientDepositAmountByIdMutation,
  useUpdateIPDPatientLabTestChargesByIdMutation,
  useUpdateIPDPatientMedicalChargesByIdMutation,
} = IPDPatientBalanceService;
