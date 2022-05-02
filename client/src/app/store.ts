import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cardsCategoriesApi } from './services/cards-categories';
import { cardsApi } from './services/cards-service';
import cardsCategoriesSlice from './slices/cardsCategoriesSlice';
import cardsSlice from './slices/cardsSlice';
import modalsSlice from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    cardsCategories: cardsCategoriesSlice.reducer,
    modals: modalsSlice.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [cardsCategoriesApi.reducerPath]: cardsCategoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cardsApi.middleware,
      cardsCategoriesApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
