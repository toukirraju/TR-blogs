import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { likeBlog } from "../RTK/features/blogs/blogsSlice";
const Post = ({ data = {} }) => {
  const { id, title, description, image, tags, likes, isSaved, createdAt } =
    data;

  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(likeBlog(data));
  };
  return (
    <div className="lws-card">
      <Link to={`blog/${id}`}>
        <img src={image} className="lws-card-image" alt={title} />
      </Link>
      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p
            className="lws-likeCount"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <i className="fa-regular fa-thumbs-up"></i>
            {likes}
          </p>
        </div>
        <Link to={`blog/${id}`} className="lws-postTitle">
          {" "}
          {title}
        </Link>
        <div style={{ display: "flex", flexWrap: "wrap" }} className="lws-tags">
          {tags?.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </div>
        {/* <!-- Show this element if post is saved --> */}
        <div className="flex gap-2 mt-4">
          {isSaved && <span className="lws-badge"> Saved </span>}
        </div>
        {/* <!-- Show this element if post is saved Ends --> */}
      </div>
    </div>
  );
};

export default Post;
