import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: "",
  keyModal: 0,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateModals: (state, action) => {
      return {
        ...state,
        modal: action.payload.modal,
        keyModal: action.payload.keyModal,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateModals } = modalsSlice.actions;

export default modalsSlice.reducer;
