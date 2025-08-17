import { baseApi } from "@/redux/baseApi";

export const tourTypeAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTourType: builder.mutation({
      query: (dividion) => ({
        url: "/tour/craete-tour-type",
        method: "POST",
        data: dividion,
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    getTourtype: builder.query({
      query: () => ({
        url: "/tour/tour_types",
        method: "GET",
      }),
      transformResponse: (arg) => arg.data,
      providesTags: ["TOURTYPE"],
    }),

    updateTourtype: builder.mutation({
      query: (userInfo) => ({
        url: `/tour/tour_types/${userInfo.tour}`,
        method: "PATCH",
        data: userInfo.name,
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    deleteTourtype: builder.mutation({
      query: (tourId: string) => ({
        url: `/tour/tour_types/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOURTYPE"],
    }),
  }),
});

export const {
  useCreateTourTypeMutation,
  useGetTourtypeQuery,
  useUpdateTourtypeMutation,
  useDeleteTourtypeMutation,
} = tourTypeAPi;
