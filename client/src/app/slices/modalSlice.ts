import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TModal = 'create-card' | 'edit-card' | null;

interface IInitialState {
  open: boolean;
  modal: TModal;
}

const initialState: IInitialState = {
  open: false,
  modal: null,
};

const modalsSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    openModal(state, action: PayloadAction<TModal>) {
      state.modal = action.payload;
      state.open = true;
    },
    closeModal(state) {
      state.open = false;
      state.modal = null;
    },
  },
});
export default modalsSlice;
