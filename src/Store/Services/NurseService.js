import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NurseService = createApi({
  reducerPath: "nurse",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllNurses: builder.query({
      query: () => {
        return {
          url: `Nurse-GET-ALL`,
          method: "GET",
        };
      },
    }),

    getNurseById: builder.query({
      query: (id) => {
        return {
          url: `Nurse-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),

    createNurse: builder.mutation({
      query: (newData) => {
        return {
          url: `Nurse-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),

    updateNurseById: builder.mutation({
      query: (updateData) => {
        return {
          url: `Nurse-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    deleteNurseById: builder.mutation({
      query: (id) => {
        return {
          url: `Nurse-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateNurseMutation,
  useDeleteNurseByIdMutation,
  useGetAllNursesQuery,
  useGetNurseByIdQuery,
  useUpdateNurseByIdMutation,
} = NurseService;
