import React, { useRef, useState } from 'react';
import Toggable from './Toggable';
import blogService from '../services/blogs';

const Blog = ({ blog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const viewButtonRef = useRef(null)

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

  console.log(user)

  return (
    <div style={blogStyle}>
      <span><strong>{blog.title}</strong></span>
      <Toggable buttonLabel='view' cancelLabel='hide' ref={viewButtonRef}>
        <p>{blog.url}</p>
        <span>likes: {updatedBlog.likes}</span>
        <button onClick={handleLike}>like</button>
        <h3>{blog.author}</h3>
        
          <button onClick={handleDelete}>delete</button>
      
      </Toggable>
    </div>
  )
}

export default Blog;
