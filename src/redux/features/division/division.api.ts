import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDivision: builder.mutation({
      query: (userInfo) => ({
        url: "/division/create",
        method: "POST",
        data: userInfo,
      }),
    }),

    getAllDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["USER"],
    }),

    getADivision: builder.query({
      query: (slug: string) => ({
        url: `/division/${slug}`,
        method: "POST",
      }),
      providesTags: ["USER"],
    }),

    updateDivision: builder.mutation({
      query: (userInfo) => ({
        url: `division/${userInfo.id}`,
        method: "PATCH",
        data: userInfo.data,
      }),
    }),

    deleteTour: builder.mutation({
      query: (divisionId: string) => ({
        url: `/tour/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const {
  useCreateDivisionMutation,
  useGetAllDivisionQuery,
  useGetADivisionQuery,
  useUpdateDivisionMutation,
  useDeleteTourMutation,
} = divisionApi;
