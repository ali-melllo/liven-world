import { api } from "@/services/api";

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation<{ answer: string ,sessionId: string }, { question: string; topic: string, sessionId?: string }>({
            query: (body) => ({
                url: "rag/ask",
                method: "POST",
                body,
            }),
        }),
        getSessionList: builder.query<any, any>({
            query: () => ({
                url: `rag/sessionList`,
                method: 'GET',
            }),
        }),
        getSessionDetail: builder.query<any, any>({
            query: ({ id }) => ({
                url: `rag/chatList/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useSendMessageMutation,
    useGetSessionListQuery,
    useGetSessionDetailQuery
} = chatApi;
