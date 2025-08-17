import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDivision: builder.mutation({
      query: (userInfo) => ({
        url: "/division/create",
        method: "POST",
        data: userInfo,
      }),

      invalidatesTags: ["DIVISION"],
    }),

    getAllDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DIVISION"],
    }),

    getADivision: builder.query({
      query: (slug: string) => ({
        url: `/division/${slug}`,
        method: "POST",
      }),
      providesTags: ["DIVISION"],
    }),

    updateDivision: builder.mutation({
      query: (userInfo) => ({
        url: `division/${userInfo.division}`,
        method: "PATCH",
        data: userInfo.name,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    deleteDivision: builder.mutation({
      query: (divisionId: string) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const {
  useCreateDivisionMutation,
  useGetAllDivisionQuery,
  useGetADivisionQuery,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
} = divisionApi;
