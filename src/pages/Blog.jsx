import "../style/main.css";
import PostDetails from "../components/PostDetails";
import RelatedPost from "../components/RelatedPost";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div>
      {/* <!-- Go Home / Go Back --> */}
      <div className="container mt-8">
        <Link
          to="/"
          className="inline-block text-gray-600 home-btn"
          id="lws-goHome"
        >
          <i className="mr-2 fa-solid fa-house"></i>Go Home
        </Link>
      </div>
      <section className="post-page-container">
        <PostDetails />
      </section>
    </div>
  );
};

export default Blog;
