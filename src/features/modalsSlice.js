import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    modal: 1,
    open: false,
  },
  {
    modal: 2,
    open: false,
  },
  {
    modal: 3,
    open: false,
  },
  {
    modal: 4,
    open: false,
  },
];

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateModals: (state, action) => {
      return [...state].map((item) => {
        if (item.modal === action.payload.modal)
          return { ...item, open: !item.open };
        else return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateModals } = modalsSlice.actions;

export default modalsSlice.reducer;
