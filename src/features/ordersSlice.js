import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
