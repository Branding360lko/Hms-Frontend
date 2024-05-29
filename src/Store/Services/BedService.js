import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BedService = createApi({
  reducerPath: "beds",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllBeds: builder.query({
      query: () => {
        return {
          url: `ManageBeds-GET-ALL`,
          method: "GET",
        };
      },
    }),
    getBedById: builder.query({
      query: (id) => {
        return {
          url: `ManageBeds-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),
    createBed: builder.mutation({
      query: (newData) => {
        return {
          url: `ManageBeds-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),
    updateBedIsAppointmentApplicable: builder.mutation({
      query: (updateData) => {
        return {
          url: `ManageBeds-PUT-IsAppointmentApplicable/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteBedById: builder.mutation({
      query: (id) => {
        return {
          url: `ManageBeds-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateBedAvailability: builder.mutation({
      query: (updateData) => {
        return {
          url: `ManageBeds-PUT-IsBedAvailableOrNot/${updateData.bedId}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
  }),
});

export const {
  useCreateBedMutation,
  useDeleteBedByIdMutation,
  useGetAllBedsQuery,
  useGetBedByIdQuery,
  useUpdateBedIsAppointmentApplicableMutation,
  useUpdateBedAvailabilityMutation,
} = BedService;
