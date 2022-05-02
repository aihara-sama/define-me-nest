import { RootState } from './store';

export const cardsSelector = (state: RootState) => state.cards;
export const cardsCategoriesSelector = (state: RootState) =>
  state.cardsCategories;
export const modalsSelector = (state: RootState) => state.modals;
