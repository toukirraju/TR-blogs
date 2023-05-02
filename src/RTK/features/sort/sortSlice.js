import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortType: "",
  filterType: "all",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sortBlogs: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { sortBlogs } = sortSlice.actions;
export default sortSlice.reducer;
