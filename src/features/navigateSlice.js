import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: "Заказы",
  keyAction: 1,
};

export const navigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    updateHeader: (state, action) => {
      return {
        ...state,
        header: action.payload.header,
        keyAction: action.payload.keyAction,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateHeader } = navigateSlice.actions;

export default navigateSlice.reducer;
