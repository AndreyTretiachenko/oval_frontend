import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      return {
        ...state,
        clients: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setClients } = clientsSlice.actions;

export default clientsSlice.reducer;
