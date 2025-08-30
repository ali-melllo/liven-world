import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type CustomQueryArgs = string | (FetchArgs & { baseUrl?: string });

// ✅ Define baseQuery once, not inside customBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      console.log("Token in prepareHeaders:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  CustomQueryArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const dynamicBaseUrl =
    typeof args === 'string' ? BASE_URL : args.baseUrl ?? BASE_URL;

  // ✅ override baseUrl dynamically if needed
  const cleanedArgs =
    typeof args === 'string' ? args : { ...args, baseUrl: dynamicBaseUrl };

  const result = await baseQuery(cleanedArgs, api, extraOptions);

  if (result.error) {
    const status = result.error.status || 'Error';
    const errorMessage =
      (result.error.data as { message?: string })?.message ||
      'Error While Fetching To Server';

    toast(`${status} : ${errorMessage}`);

    // if (Number(status) === 401 || Number(status) === 403) {
    //   toast('Session Expired. Please Login');
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("userId");
    //   window.location.href = '/intro';
    // }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
