import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice";
import blogsReducer from "../features/blogs/blogsSlice";
import filterReducer from "../features/filter/filterSlice";
import relatedBlogsReducer from "../features/relatedBlogs/relatedBlogsSlice";
import sortReducer from "../features/sort/sortSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    blog: blogReducer,
    relatedBlogs: relatedBlogsReducer,
    sort: sortReducer,
    filter: filterReducer,
  },
});
