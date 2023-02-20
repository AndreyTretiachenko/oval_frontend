import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ovalApi = createApi({
  reducerPath: "ovalAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://188.225.73.44:5001/api/v1/",
    headers: { Authorization: "basic dXNlcjp1c2Vy" },
  }),
  tagTypes: ["order", "worklist", "works", "company", "person"],
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
    getCompany: builder.query({
      query: () => "company",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "company", id })),
              { type: "company", id: "LIST" },
            ]
          : [{ type: "company", id: "LIST" }],
    }),
    addCompany: builder.mutation({
      query: (body) => ({
        url: "company",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "company", id: "LIST" }],
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
      query: () => "person",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "person", id })),
              { type: "person", id: "LIST" },
            ]
          : [{ type: "person", id: "LIST" }],
    }),
    addPerson: builder.mutation({
      query: (body) => ({
        url: "person",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "person", id: "LIST" }],
    }),
    getPayments: builder.query({
      query: () => ({
        url: "payment",
      }),
    }),
    getWorks: builder.query({
      query: () => "works",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "works", id })),
              { type: "works", id: "LIST" },
            ]
          : [{ type: "works", id: "LIST" }],
    }),
    addWorks: builder.mutation({
      query: (body) => ({
        url: "works",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "works", id: "LIST" },
        { type: "order", id: "LIST" },
      ],
    }),
    getWorklist: builder.query({
      query: () => "worklist",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "worklist", id })),
              { type: "worklist", id: "LIST" },
            ]
          : [{ type: "worklist", id: "LIST" }],
    }),
    addWorkList: builder.mutation({
      query: (body) => ({
        url: "worklist",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "worklist", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetCompanyQuery,
  useGetWorkQuery,
  useGetTransportQuery,
  useGetPersonQuery,
  useGetPaymentsQuery,
  useGetMaterialQuery,
  useGetWorksQuery,
  useGetWorklistQuery,
  useAddWorkListMutation,
  useAddWorksMutation,
  useAddCompanyMutation,
  useAddPersonMutation,
} = ovalApi;
