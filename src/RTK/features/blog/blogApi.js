import axios from "../../../utils/axios";

export const getBlog = async (id) => {
  const response = await axios.get(`/blogs/${id}`);

  return response.data;
};

export const updateBlog = async (blog) => {
  const response = await axios.patch(`/blogs/${blog.id}`, blog);

  return response.data;
};
