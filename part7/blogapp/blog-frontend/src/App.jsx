import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setBlogs, addBlog } from './reducers/blogReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user);
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      dispatch(setNotification({ message: `${username} logged in`, type: "success" }))
    } catch (error) {
      dispatch(setNotification({ message: "wrong credentials", type: "error" }))
    }
  }

  const handleLogout = () => {
    setUser(null);
    dispatch(setNotification({ message: "logged out", type: "success" }))
    window.localStorage.removeItem("loggedUser")
  }

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    const confirmDelete = window.confirm(`Do you want to delete ${blogToDelete.title} by ${blogToDelete.author}?`);
    if (confirmDelete) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        dispatch(setNotification({ message: "post deleted", type: "success" }))
      } catch (error) {
        console.error("Failed to delete blog:", error.response?.data || error.message);
      }
    }
  }

  const sortBlogsByLikes = (blogs) => {
    return blogs.slice().sort((a, b) => b.likes - a.likes)
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      dispatch(setNotification({ message: "a new blog has been added", type: "success" }))
    })
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <p>
            <span>{user.name} logged in </span>
          </p>
          {user !== null && <BlogForm addBlog={addBlog} />}
          {sortBlogsByLikes(blogs).map((blog) => (
            <Blog
              user={user}
              key={blog.id}
              blog={blog}
              username={user.username}
              handleDelete={() => handleDelete(blog.id)}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
