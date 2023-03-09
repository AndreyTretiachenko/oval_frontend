import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  client_id: 0,
  person_id: 0,
  company_id: 0,
  comment: "",
  transport_id: 0,
  worklist: [],
  materiallist: [],
};

export const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    setCreateOrderValue: (state, action) => {
      return (state = action.payload);
    },
    setDefaultCreateOrderValue: (state, action) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCreateOrderValue, setDefaultCreateOrderValue } =
  createOrderSlice.actions;

export default createOrderSlice.reducer;
