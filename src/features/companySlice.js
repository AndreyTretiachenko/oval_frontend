import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      return {
        ...state,
        company: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
