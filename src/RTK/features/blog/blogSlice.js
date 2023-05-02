import { getBlog, updateBlog } from "./blogApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
  loading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchBlog = createAsyncThunk("blog/fetchBlog", async (id) => {
  const blog = await getBlog(id);

  return blog;
});
// async thunk
export const saveBlog = createAsyncThunk("blog/saveBlog", async (blog) => {
  const data = await updateBlog(blog);

  return data;
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    // fetch blog
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.blog = {};
      });
    builder
      .addCase(saveBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(saveBlog.rejected, (state, action) => {
        state.error = action.error?.message;
        state.blog = {};
      });
  },
});

export default blogSlice.reducer;
