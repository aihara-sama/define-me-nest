import { RootState } from './store';

export const cardsSelector = (state: RootState) => state.cards;
export const modalsSelector = (state: RootState) => state.modals;
