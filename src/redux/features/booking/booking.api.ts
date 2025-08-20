import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (info) => ({
        url: "/booking", // ✅ Make sure this matches your backend route
        method: "POST",
        data: info, // ✅ Correct key for request payload
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = bookingApi;
