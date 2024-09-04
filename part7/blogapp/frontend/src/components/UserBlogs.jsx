import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlogs = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)

  if (!user) {
    return <div>user not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <Link to={`/blogs/${blog.id}`}>
            <li key={blog.id}>{blog.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs