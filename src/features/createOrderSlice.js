import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  client_id: 0,
  company_id: 0,
  comment: "",
  workList: [],
  materialList: [],
};

export const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    setDataCreateOrder: (state, action) => {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataCreateOrder } = createOrderSlice.actions;

export default createOrderSlice.reducer;
