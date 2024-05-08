import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const WardService = createApi({
  reducerPath: "wards",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllWards: builder.query({
      query: () => {
        return {
          url: `ManageWard-GET-ALL`,
          method: "GET",
        };
      },
    }),
    getWardById: builder.query({
      query: (id) => {
        return {
          url: `ManageWard-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),
    createWard: builder.mutation({
      query: (newData) => {
        return {
          url: `ManageWard-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),
    updateWardIsAppointmentApplicable: builder.mutation({
      query: (updateData) => {
        return {
          url: `ManageWard-PUT-IsAppointmentApplicable/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteWardById: builder.mutation({
      query: (id) => {
        return {
          url: `ManageWard-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateWardMutation,
  useDeleteWardByIdMutation,
  useGetAllWardsQuery,
  useGetWardByIdQuery,
  useUpdateWardIsAppointmentApplicableMutation,
} = WardService;
