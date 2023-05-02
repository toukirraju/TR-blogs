import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlog, saveBlog } from "../RTK/features/blog/blogSlice";
import { likeBlog } from "../RTK/features/blogs/blogsSlice";
import RelatedPost from "./RelatedPost";

const PostDetails = () => {
  const dispatch = useDispatch();

  const [likeCount, setLikeCount] = useState(0);

  const { blogid } = useParams();

  const { blog } = useSelector((state) => state.blog);

  const { id, title, description, image, tags, likes, isSaved } = blog;

  useEffect(() => {
    dispatch(fetchBlog(blogid));
  }, [dispatch, blogid]);

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  const handleClick = () => {
    dispatch(likeBlog(blog));
    setLikeCount(likes + 1);
  };

  const handleSave = () => {
    dispatch(saveBlog({ ...blog, isSaved: isSaved === true ? false : true }));
  };
  return (
    <>
      {/* <!-- detailed post  --> */}
      <main className="post">
        <img
          src={image}
          alt={title}
          className="w-full rounded-md"
          id="lws-megaThumb"
        />
        <div>
          <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
            {title}
          </h1>
          <div className="tags" id="lws-singleTags">
            {tags?.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </div>
          <div className="btn-group">
            {/* <!-- handle like on button click --> */}
            <button
              onClick={() => handleClick()}
              className="like-btn"
              id="lws-singleLinks"
            >
              <i className="fa-regular fa-thumbs-up"></i> {likeCount}
            </button>
            {/* <!-- handle save on button click --> */}
            {/* <!-- use ".active" className and "Saved" text  if a post is saved, other wise "Save" --> */}
            <button
              onClick={handleSave}
              className={isSaved ? "active save-btn" : "save-btn"}
              id="lws-singleSavedBtn"
            >
              <i className="fa-regular fa-bookmark"></i> Saved
            </button>
          </div>
          <div className="mt-6">
            <p>{description}</p>
          </div>
        </div>
      </main>
      {/* <!-- detailed post ends --> */}
      {/* <!-- related posts --> */}
      <aside>
        <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
          Related Posts
        </h4>
        <div className="space-y-4 related-post-container">
          {/* <!-- related post  --> */}
          <RelatedPost currentBlogId={id} tags={tags} />
          {/* <!-- related post ends --> */}
        </div>
      </aside>
      {/* <!-- related posts ends --> */}
    </>
  );
};

export default PostDetails;
