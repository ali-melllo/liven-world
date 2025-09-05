// lib/services/myHeroApi.ts
import { api } from '../../api';
import { MyHeroPost, MyHeroComment } from './types';

export const myHeroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<MyHeroPost, { type: string; content: string }>({
      query: (newPost) => ({
        url: 'myhero/post',
        method: 'POST',
        body: newPost,
      }),
    }),

    getPosts: builder.query<MyHeroPost[], unknown>({
      query: () => ({
        url: 'myhero/posts',
        method: 'GET',
      }),
    }),

    getPostById: builder.query<MyHeroPost, string>({
      query: (id) => ({
        url: `myhero/posts/${id}`,
        method: 'GET',
      }),
    }),

    toggleLike: builder.mutation<MyHeroPost, string>({
      query: (id) => ({
        url: `myhero/posts/${id}/like`,
        method: 'POST',
      }),
    }),

    addComment: builder.mutation<MyHeroComment, { postId: string; content: string }>({
      query: ({ postId, content }) => ({
        url: `myhero/posts/${postId}/comments`,
        method: 'POST',
        body: { content },
      }),
    }),

    getComments: builder.query<MyHeroComment[], string>({
      query: (postId) => ({
        url: `myhero/posts/${postId}/comments`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useToggleLikeMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
} = myHeroApi;
