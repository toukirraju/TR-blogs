import { getBlogs, updateBlog } from "./blogsApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading: false,
  isLiked: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const blogs = await getBlogs();

  return blogs;
});

export const likeBlog = createAsyncThunk("blog/likeBlog", async (blog) => {
  const data = await updateBlog(blog);
  return data;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.blogs = [];
      });

    //like blog

    builder
      .addCase(likeBlog.pending, (state) => {
        state.isLiked = false;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.isLiked = true;
        const likedBlog = state.blogs.map((blog) => {
          if (blog.id === action.payload.id) {
            return {
              ...blog,
              likes: blog.likes + 1,
            };
          }
          return blog;
        });

        state.blogs = likedBlog;
      })
      .addCase(likeBlog.rejected, (state, action) => {
        state.isLiked = false;
      });
  },
});

export default blogsSlice.reducer;
