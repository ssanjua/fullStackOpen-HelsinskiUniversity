import React, { useRef, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleDelete, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [updatedBlog, setUpdatedBlog] = useState(blog)
  const [showDetail, setShowDetail] = useState(false)

  const handleLike = async () => {
    const updatedBlogData = { ...updatedBlog, likes: updatedBlog.likes + 1 }
    await blogService.updateLikes(updatedBlog.id, updatedBlogData)
    setUpdatedBlog(updatedBlogData)
  }

  return (
    <div style={blogStyle}>
      <div>
        <h3>
          <strong data-testid="blog-title">{updatedBlog.title}</strong>
        </h3>
        <p data-testid="blog-author">by {updatedBlog.author}</p>
        <div>
          <button data-testid="toggleButton" onClick={() => setShowDetail(!showDetail)}>
            {showDetail ? 'Hide' : 'View'}
          </button>
        </div>
      </div>

      {showDetail && (
        <div style={{ display: 'block' }}>
          <p data-testid="blog-url">{updatedBlog.url}</p>
          <p data-testid="blog-likes">
            Likes {updatedBlog.likes}{' '}
            <button onClick={handleLike} data-testid="button-like">Like</button>
          </p>
          {updatedBlog.user.username === username && (
            <button data-testid="blog-remove" onClick={handleDelete}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
