import { setUser } from '@/lib/store/slices/userSlice';
import { api } from '../../api';
import {
  AdminAttributesLoginParamsType,
  AdminAttributesResponse,
} from './types';

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUpUser: builder.mutation<
      AdminAttributesResponse,
      Partial<AdminAttributesLoginParamsType>>({
      query: (newUser) => ({
        url: 'auth/signup',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<
      AdminAttributesResponse,
      Partial<AdminAttributesLoginParamsType>>({
      query: (newUser) => ({
        url: 'auth/login',
        method: 'POST',
        body: newUser,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          dispatch(
            setUser({
              ...data.user,
            })
          );
        } catch {
          // Optional: handle error
        }
      },
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLoginUserMutation
} = adminApi;
