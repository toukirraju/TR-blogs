import { getRelatedBlogs } from "./relatedBlogsApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  relatedBlogs: [],
  loading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchRelatedBlogs = createAsyncThunk(
  "relatedBlogs/fetchRelatedBlogs",
  async ({ tags, id }) => {
    const relatedBlogs = await getRelatedBlogs({ tags, id });
    return relatedBlogs;
  }
);

const relatedBlogsSlice = createSlice({
  name: "relatedBlogs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedBlogs.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(fetchRelatedBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedBlogs = action.payload;
      })
      .addCase(fetchRelatedBlogs.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.relatedBlogs = [];
      });
  },
});

export default relatedBlogsSlice.reducer;
