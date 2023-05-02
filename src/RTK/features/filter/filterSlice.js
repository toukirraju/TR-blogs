import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterType: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBlogs: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const { filterBlogs } = filterSlice.actions;
export default filterSlice.reducer;
