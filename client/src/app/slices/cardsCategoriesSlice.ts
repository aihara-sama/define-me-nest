import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardsCategory } from '../../interfaces/common';

interface IInitialState {
  items: ICardsCategory[];
}

const initialState: IInitialState = {
  items: [],
};

const cardsCategoriesSlice = createSlice({
  initialState,
  name: 'cardsCategories',
  reducers: {
    setCardsCategories(state, action: PayloadAction<ICardsCategory[]>) {
      state.items = action.payload;
    },
    addCardsCategory(state, action: PayloadAction<ICardsCategory>) {
      const cardsCategory = action.payload;
      if (!state.items.find((cat) => cat.id === cardsCategory.id)) {
        const _cardsCategories = state.items;
        _cardsCategories.unshift(cardsCategory);

        state.items = _cardsCategories;
      }
    },
    editCardsCategory(state, action: PayloadAction<ICardsCategory>) {
      const cardsCategory = action.payload;

      state.items = state.items.map((_cardsCategory) => {
        if (cardsCategory.id === _cardsCategory.id) {
          _cardsCategory = cardsCategory;
        }
        return _cardsCategory;
      });
    },
    removeCardsCategory(state, action: PayloadAction<number>) {
      const cardsCategoryId = action.payload;

      state.items = state.items.filter(
        (cardsCategory) => cardsCategory.id !== cardsCategoryId,
      );
    },
  },
});
export default cardsCategoriesSlice;
