import axios from "../../../utils/axios";

export const getBlogs = async () => {
  const response = await axios.get("/blogs");

  return response.data;
};

export const updateBlog = async (blog) => {
  const response = await axios.patch(`/blogs/${blog.id}`, {
    ...blog,
    likes: blog.likes + 1,
  });

  return response.data;
};
