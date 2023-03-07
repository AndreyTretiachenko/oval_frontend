import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ovalApi = createApi({
  reducerPath: "ovalAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://andreytretiachenko.ru:5001/api/v1/",
    headers: { Authorization: "basic dXNlcjp1c2Vy" },
  }),
  tagTypes: [
    "order",
    "worklist",
    "works",
    "company",
    "person",
    "transport",
    "work",
  ],
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
      query: () => "work",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "work", id })),
              { type: "work", id: "LIST" },
            ]
          : [{ type: "work", id: "LIST" }],
    }),
    addWork: builder.mutation({
      query: (body) => ({
        url: "work",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "work", id: "LIST" }],
    }),
    getMaterial: builder.query({
      query: () => ({
        url: "material",
      }),
    }),
    getMaterials: builder.query({
      query: () => ({
        url: "materials",
      }),
    }),
    addMaterials: builder.mutation({
      query: (body) => ({
        url: "materials",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "materials", id: "LIST" },
        { type: "order", id: "LIST" },
      ],
    }),
    deleteMaterials: builder.mutation({
      query: (body) => ({
        url: "materials",
        method: "DELETE",
        body,
      }),
      invalidatesTags: [
        { type: "works", id: "LIST" },
        { type: "order", id: "LIST" },
      ],
    }),
    getMateriallist: builder.query({
      query: () => ({
        url: "materiallist",
      }),
    }),
    addMateriallist: builder.mutation({
      query: (body) => ({
        url: "materiallist",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "materiallist", id: "LIST" }],
    }),
    getTransport: builder.query({
      query: () => "transport",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "transport", id })),
              { type: "transport", id: "LIST" },
            ]
          : [{ type: "transport", id: "LIST" }],
    }),
    addTransport: builder.mutation({
      query: (body) => ({
        url: "transport",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "transport", id: "LIST" },
        { type: "person", id: "LIST" },
        { type: "company", id: "LIST" },
      ],
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
    getGoogleCalendar: builder.query({
      query: (token) => ({
        baseUrl: "",
        url:
          "https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=" +
          token,
      }),
    }),
    getGoogleTokenInfo: builder.query({
      query: (token) => ({
        baseUrl: "",
        url: "https://oauth2.googleapis.com/tokeninfo?access_token=" + token,
      }),
    }),
    getGoogleOauthToken: builder.mutation({
      query: (body) => ({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "https://oauth2.googleapis.com/token",
        body,
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
    deleteWorks: builder.mutation({
      query: (body) => ({
        url: "works",
        method: "DELETE",
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
    getUnit: builder.query({
      query: () => ({
        url: "unit",
      }),
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
  useGetMaterialQuery,
  useGetWorksQuery,
  useGetWorklistQuery,
  useAddWorkListMutation,
  useAddWorksMutation,
  useAddCompanyMutation,
  useAddPersonMutation,
  useAddMateriallistMutation,
  useAddMaterialsMutation,
  useAddTransportMutation,
  useGetUnitQuery,
  useDeleteWorksMutation,
  useDeleteMaterialsMutation,
  useAddWorkMutation,
  useLazyGetGoogleCalendarQuery,
  useGetGoogleOauthTokenMutation,
  useLazyGetGoogleTokenInfoQuery,
} = ovalApi;
