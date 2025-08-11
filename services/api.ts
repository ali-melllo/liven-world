import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type CustomQueryArgs = string | (FetchArgs & { baseUrl?: string }); // 👈 allow optional custom baseUrl

const customBaseQuery: BaseQueryFn<
  CustomQueryArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Extract baseUrl if provided per-request
  const dynamicBaseUrl =
    typeof args === 'string' ? BASE_URL : args.baseUrl ?? BASE_URL;

  const baseQuery = fetchBaseQuery({
    baseUrl: dynamicBaseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Remove baseUrl from args before passing to fetchBaseQuery
  const cleanedArgs =
    typeof args === 'string' ? args : { ...args, baseUrl: undefined };

  const result = await baseQuery(cleanedArgs, api, extraOptions);

  if (result.error) {
    const status = result.error.status || 'Error';
    const errorMessage =
      (result.error.data as { message?: string })?.message ||
      'Error While Fetching To Server';

    toast(`${status} : ${errorMessage}`);

    if (Number(status) === 401 || Number(status) === 403) {
      toast('Session Expired. Please Login');
      window.location.href = '/login';
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
