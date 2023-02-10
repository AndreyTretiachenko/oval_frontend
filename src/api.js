import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ovalApi = createApi({
  reducerPath: "ovalAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://188.225.73.44:5001/api/v1/",
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
    getWork: builder.query({
      query: () => ({
        url: "work",
      }),
    }),
    getMaterial: builder.query({
      query: () => ({
        url: "material",
      }),
    }),
    getTransport: builder.query({
      query: () => ({
        url: "transport",
      }),
    }),
    getPerson: builder.query({
      query: () => ({
        url: "person",
      }),
    }),
    getPayments: builder.query({
      query: () => ({
        url: "payment",
      }),
    }),
    getWorks: builder.query({
      query: () => ({
        url: "works",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetClientQuery,
  useGetCompanyQuery,
  useGetWorkQuery,
  useGetTransportQuery,
  useGetPersonQuery,
  useGetPaymentsQuery,
  useGetMaterialQuery,
} = ovalApi;
