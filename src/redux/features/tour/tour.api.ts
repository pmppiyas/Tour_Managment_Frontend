import { baseApi } from "@/redux/baseApi";

export const tourTypeAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (userInfo) => ({
        url: "/tour/create",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["TOUR"],
    }),

    getTour: builder.query({
      query: (args: { page?: number } = {}) => {
        const { page = 1 } = args;
        return {
          url: `/tour?page=${page}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["TOUR"],
    }),
    getATour: builder.query({
      query: (slug: string) => ({
        url: `/tour/single/${slug}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),

    updateTour: builder.mutation({
      query: (userInfo) => ({
        url: `/tour/${userInfo.tour}`,
        method: "PATCH",
        data: userInfo.name,
      }),
      invalidatesTags: ["TOUR"],
    }),
    deleteTour: builder.mutation({
      query: (tourId: string) => ({
        url: `/tour/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const {
  useAddTourMutation,
  useGetTourQuery,
  useGetATourQuery,
  useUpdateTourMutation,
  useDeleteTourMutation,
} = tourTypeAPi;
