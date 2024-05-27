import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`${username} logged in`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setSuccessMessage(`logged out`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    window.localStorage.removeItem('loggedUser')
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    if (name === 'title') setNewTitle(value)
    else if (name === 'author') setNewAuthor(value)
    else if (name === 'url') setNewUrl(value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setSuccessMessage(`a new blog ${newTitle} by ${newAuthor}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
      })
  }

  const blogForm = () => {
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type='text'
              value={newTitle}
              name='title'
              onChange={handleBlogChange}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={newAuthor}
              name='author'
              onChange={handleBlogChange}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={newUrl}
              name='url'
              onChange={handleBlogChange}
            />
          </div>
          <button type='submit'>
            create
          </button>
        </form>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {
        user === null ? (
          loginForm()
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
            <p>
              <span>{user.name} logged in </span>
            </p>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </>
        )
      }

      {user !== null ? blogForm() : null}
    </div>
  )
}

export default App