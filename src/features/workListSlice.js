import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const workListSlice = createSlice({
  name: "workList",
  initialState,
  reducers: {
    setWorklist: (state, action) => {
      return { ...state, data: action.payload };
    },
    setDefaulWorkList: (state, action) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWorklist, setDefaulWorkList } = workListSlice.actions;

export default workListSlice.reducer;
