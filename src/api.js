import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ovalApi = createApi({
  reducerPath: "ovalAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/v1/",
    headers: { Authorization: "basic dXNlcjp1c2Vy" },
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "order",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "order", id })),
              { type: "order", id: "LIST" },
            ]
          : [{ type: "order", id: "LIST" }],
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: "order",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "order", id: "LIST" }],
    }),
    getClient: builder.query({
      query: () => ({
        url: "client",
      }),
    }),
    getCompany: builder.query({
      query: () => ({
        url: "company",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetClientQuery,
  useGetCompanyQuery,
} = ovalApi;
