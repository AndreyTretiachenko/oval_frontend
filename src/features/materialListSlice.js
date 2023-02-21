import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const materialListSlice = createSlice({
  name: "materialList",
  initialState,
  reducers: {
    setMateriallist: (state, action) => {
      return { ...state, data: action.payload };
    },
    setDefaulMaterialList: (state, action) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMateriallist, setDefaulMaterialList } =
  materialListSlice.actions;

export default materialListSlice.reducer;
