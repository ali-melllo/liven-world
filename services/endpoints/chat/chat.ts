import { api } from "@/services/api";

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation<{ answer: string }, { question: string; topic: string }>({
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
    }),
});

export const {
    useSendMessageMutation,
    useGetSessionListQuery
} = chatApi;
