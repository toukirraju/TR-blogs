import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { fetchBlogs } from "../RTK/features/blogs/blogsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading, isError, error } = useSelector(
    (state) => state.blogs
  );
  const { sortType } = useSelector((state) => state.sort);

  const { filterType } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  let content;
  if (loading) content = <Loading />;

  if (!loading && isError) content = <div className="col-span-12">{error}</div>;

  if (!isError && !loading && blogs?.length === 0) {
    content = <div className="col-span-12">No blogs found!</div>;
  }

  // if (!isError && !loading && blogs?.length > 0) {
  //   content = blogs.map((blog) => <Post key={blog.id} data={blog} />);
  // }
  if (!isError && !loading && blogs?.length > 0) {
    //sorting
    switch (sortType || filterType) {
      case "newest":
        const newestBlogs = blogs.reduce((acc, cur) => {
          if (!acc.length) {
            return [cur];
          }
          const idx = acc.findIndex((item) => item.createdAt < cur.createdAt);
          if (idx === -1) {
            return [...acc, cur];
          }
          return [...acc.slice(0, idx), cur, ...acc.slice(idx)];
        }, []);

        content = newestBlogs?.map((blog) => (
          <Post key={blog.id} data={blog} />
        ));
        break;
      case "most_liked":
        const mostLikedBlogs = blogs.reduce((acc, cur) => {
          if (!acc.length) {
            return [cur];
          }
          const idx = acc.findIndex((item) => item.likes < cur.likes);
          if (idx === -1) {
            return [...acc, cur];
          }
          return [...acc.slice(0, idx), cur, ...acc.slice(idx)];
        }, []);

        content = mostLikedBlogs?.map((blog) => (
          <Post key={blog.id} data={blog} />
        ));

        break;

      case "saved":
        content = blogs
          .filter((item) => item.isSaved)
          ?.map((blog) => <Post key={blog.id} data={blog} />);
        break;

      default:
        content = blogs.map((blog) => <Post key={blog.id} data={blog} />);
        break;
    }
  }

  return (
    <section className="wrapper">
      {" "}
      <Sidebar />
      {/* <!-- posts container  --> */}
      <main className="post-container" id="lws-postContainer">
        {/* <!-- single post --> */}
        {content}
        {/* <!-- Single Post Ends --> */}
      </main>
    </section>
  );
};

export default Home;
