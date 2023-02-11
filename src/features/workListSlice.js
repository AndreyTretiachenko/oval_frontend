import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const workListSlice = createSlice({
  name: "workList",
  initialState,
  reducers: {
    setWorklist: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { setWorklist } = workListSlice.actions;

export default workListSlice.reducer;
