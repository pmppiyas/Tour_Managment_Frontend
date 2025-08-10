import { envVars } from "@/config/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: envVars.VITE_BACKEND_URL }),
  endpoints: () => ({}),
});
