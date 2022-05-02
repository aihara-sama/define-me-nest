import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CARD_IMAGE_NAME } from '../../constants';
import {
  ICard,
  TDraftCreateCard,
  TDraftEditCard,
} from '../../interfaces/cards.interface';

const draftCreateCardDefaultFields: TDraftCreateCard = {
  category: 'All',
  description: '',
  imageName: DEFAULT_CARD_IMAGE_NAME,
  title: '',
};
const draftEditCardDefaultFields: TDraftEditCard = {
  category: '',
  description: '',
  imageName: DEFAULT_CARD_IMAGE_NAME,
  title: '',
  id: '',
};

interface IInitialState {
  items: ICard[];
  draftCreateCard: TDraftCreateCard;
  draftEditCard: TDraftEditCard;
}

const initialState: IInitialState = {
  items: [],
  draftCreateCard: { ...draftCreateCardDefaultFields },
  draftEditCard: { ...draftEditCardDefaultFields },
};

const cardsSlice = createSlice({
  initialState,
  name: 'cards',
  reducers: {
    setDraftCreateCard(
      state,
      action: PayloadAction<IInitialState['draftCreateCard']>,
    ) {
      state.draftCreateCard = action.payload;
    },
    setDraftEditCard(
      state,
      action: PayloadAction<IInitialState['draftEditCard']>,
    ) {
      state.draftEditCard = action.payload;
    },
    resetDraftCreateCard(state) {
      state.draftCreateCard = { ...draftCreateCardDefaultFields };
    },
    resetDraftEditCard(state) {
      state.draftEditCard = { ...draftEditCardDefaultFields };
    },
    setCards(state, action: PayloadAction<IInitialState['items']>) {
      state.items = action.payload;
    },
    removeCard(state, action: PayloadAction<string>) {
      const cardId = action.payload;
      state.items = state.items.filter((card) => card.id !== cardId);
    },
    addCard(state, action: PayloadAction<ICard>) {
      const card = action.payload;
      const _cards = [card, ...state.items];

      state.items = _cards;
    },
    editCard(state, action: PayloadAction<ICard>) {
      const card = action.payload;

      state.items = state.items.map((_card) => {
        if (_card.id === card.id) {
          _card = card;
        }
        return _card;
      });
    },
  },
  extraReducers: {
    // searchCards(title: string){}
  },
});

export default cardsSlice;
