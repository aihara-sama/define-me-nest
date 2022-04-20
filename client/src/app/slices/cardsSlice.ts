import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../interfaces/cards.interface';

interface IInitialState {
  items: ICard[];
}

const initialState: IInitialState = {
  items: [],
};

const cardsSlice = createSlice({
  initialState,
  name: 'cards',
  reducers: {
    setCards(state, action: PayloadAction<IInitialState['items']>) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    // searchCards(title: string){}
  },
});

export default cardsSlice;
