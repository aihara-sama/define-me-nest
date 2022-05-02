import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICardsCategory } from '../../interfaces/common';

export const cardsCategoriesApi = createApi({
  reducerPath: 'cardsCategoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: (builder) => ({
    createCardsCategory: builder.mutation<
      ICardsCategory,
      Omit<ICardsCategory, 'id'>
    >({
      query: (cardsCategory) => ({
        url: 'categories',
        method: 'POST',
        body: cardsCategory,
      }),
    }),
    editCardsCategory: builder.mutation<
      ICardsCategory,
      { cardsCategory: Omit<ICardsCategory, 'id'>; cardsCategoryId: number }
    >({
      query: ({ cardsCategory, cardsCategoryId }) => ({
        url: `categories/${cardsCategoryId}`,
        method: 'PUT',
        body: cardsCategory,
      }),
    }),

    removeCardsCategory: builder.mutation<void, number>({
      query: (cardsCategoryId) => ({
        url: `categories/${cardsCategoryId}`,
        method: 'DELETE',
      }),
    }),
    getCardsCategories: builder.query<ICardsCategory[], void>({
      query: () => `/categories`,
    }),
  }),
});

export const {
  useCreateCardsCategoryMutation,
  useEditCardsCategoryMutation,
  useGetCardsCategoriesQuery,
  useRemoveCardsCategoryMutation,
} = cardsCategoriesApi;
