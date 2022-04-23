import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICard } from '../../interfaces/cards.interface';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<string, FormData>({
      query: (body) => ({
        url: 'file',
        method: 'PUT',
        body,
      }),

      transformResponse: (response: { fileName: string }) => response.fileName,
    }),
    editCard: builder.mutation<
      ICard,
      { card: Omit<ICard, 'id'>; cardId: string }
    >({
      query: ({ card, cardId }) => ({
        url: `cards/${cardId}`,
        method: 'PUT',
        body: card,
      }),
    }),
    createCard: builder.mutation<ICard, Omit<ICard, 'id'>>({
      query: (card) => ({
        url: 'cards',
        method: 'POST',
        body: card,
      }),
    }),
    removeCard: builder.mutation<void, string>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
    }),
    getCardsByTitleAndCat: builder.mutation<
      ICard[],
      { search: string; category: string; offset?: number }
    >({
      query: ({ search, category, offset = 0 }) =>
        `/search?search=${search}&category=${category}&offset=${offset}`,
    }),
  }),
});

export const {
  useGetCardsByTitleAndCatMutation,
  useUploadImageMutation,
  useCreateCardMutation,
  useRemoveCardMutation,
  useEditCardMutation,
} = cardsApi;
