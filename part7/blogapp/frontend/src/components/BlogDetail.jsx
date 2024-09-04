import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'

function BlogDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  if (!blog) {
    return <div>blog not found</div>
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
      <div>added by {blog.user.name}</div>
    </>
  )
}

export default BlogDetail