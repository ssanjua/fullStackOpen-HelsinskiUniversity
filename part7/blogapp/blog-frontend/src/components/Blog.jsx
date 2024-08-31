import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    console.log("Like button clicked for blog:", blog.id);
    dispatch(likeBlog(blog.id));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`);
    if (confirmDelete) {
      dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <h3>
          <strong data-testid="blog-title">{blog.title}</strong>
        </h3>
        <p data-testid="blog-author">by {blog.author}</p>
        <div>
          <button
            data-testid="toggleButton"
            onClick={() => setShowDetail(!showDetail)}
          >
            {showDetail ? "Hide" : "View"}
          </button>
        </div>
      </div>

      {showDetail && (
        <div style={{ display: "block" }}>
          <p data-testid="blog-url">{blog.url}</p>
          <p data-testid="blog-likes">
            Likes {blog.likes}{" "}
            <button onClick={handleLike} data-testid="button-like">
              Like
            </button>
          </p>
          {blog.user.username === username && (
            <button data-testid="blog-remove" onClick={handleDelete}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;