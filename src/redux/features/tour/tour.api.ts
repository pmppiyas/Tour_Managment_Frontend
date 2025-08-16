import { baseApi } from "@/redux/baseApi";

export const tourAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourtype: builder.mutation({
      query: (userInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: userInfo,
      }),
    }),

    getTourtype: builder.query({
      query: () => ({
        url: "/tour/tour_types",
        method: "GET",
      }),
      transformResponse: (arg) => arg.data,
      providesTags: ["TOUR"],
    }),

    updateTourtype: builder.mutation({
      query: (userInfo) => ({
        url: `/tour/tour_types/${userInfo.tour}`,
        method: "PATCH",
        data: userInfo.name,
      }),
    }),
    deleteTourtype: builder.mutation({
      query: (tourId: string) => ({
        url: `/tour/tour_types/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const {
  useAddTourtypeMutation,
  useGetTourtypeQuery,
  useUpdateTourtypeMutation,
  useDeleteTourtypeMutation,
} = tourAPi;
