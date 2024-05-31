import React, { useRef, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Do you want to delete ${updatedBlog.title} by ${updatedBlog.author}?`)
    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog.id)
      } catch (error) {
        console.error('Failed to delete blog:', error)
      }
    }
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
          <button data-testid="blog-remove" onClick={handleDelete}>
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
