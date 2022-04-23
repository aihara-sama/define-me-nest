import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cardsApi } from './services/cards-service';
import cardsSlice from './slices/cardsSlice';
import modalsSlice from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    modals: modalsSlice.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
