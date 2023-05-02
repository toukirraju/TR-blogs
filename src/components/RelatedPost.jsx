import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRelatedBlogs } from "../RTK/features/relatedBlogs/relatedBlogsSlice";
import Loading from "./Loading";

const RelatedPost = ({ currentBlogId, tags }) => {
  const dispatch = useDispatch();

  const { relatedBlogs, loading, isError, error } = useSelector(
    (state) => state.relatedBlogs
  );

  useEffect(() => {
    dispatch(fetchRelatedBlogs({ tags, id: currentBlogId }));
  }, [dispatch, tags, currentBlogId]);

  let content = null;
  if (loading) content = <Loading />;

  if (!loading && isError) content = <div className="col-span-12">{error}</div>;

  if (!isError && !loading && relatedBlogs?.length === 0) {
    content = <div className="col-span-12">No related blog found!</div>;
  }

  if (!isError && !loading && relatedBlogs?.length > 0) {
    content = relatedBlogs.map((blog) => (
      <div className="card">
        <Link to={`/blog/${blog.id}`}>
          <img src={blog.image} className="card-image" alt="" />
        </Link>
        <div className="p-4">
          <Link
            to={`/blog/${blog.id}`}
            className="text-lg post-title lws-RelatedPostTitle"
          >
            {blog.title}
          </Link>
          <div className="mb-0 tags">
            {blog.tags?.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </div>
          <p>{blog.createdAt}</p>
        </div>
      </div>
    ));
  }

  return (
    <>
      {/* <!-- related post  --> */}
      {content}
      {/* <!-- related post ends --> */}
    </>
  );
};

export default RelatedPost;
