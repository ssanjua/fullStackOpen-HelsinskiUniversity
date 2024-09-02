import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { setNotification } from './reducers/notificationReducer';
import { setBlogs,  createBlog } from './reducers/blogReducer';
import { setUser, reset } from './reducers/userReducer';
import Users from "./components/Users";

const App = () => {
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs));
    });
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification({ message: `${username} logged in`, type: "success" }));
      setUsernameInput("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification({ message: "wrong credentials", type: "error" }));
    }
  };

  const handleLogout = () => {
    dispatch(reset());
    dispatch(setNotification({ message: "logged out", type: "success" }));
  };

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    const confirmDelete = window.confirm(`Do you want to delete ${blogToDelete.title} by ${blogToDelete.author}?`);
    if (confirmDelete) {
      try {
        await blogService.deleteBlog(id);
        dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
        dispatch(setNotification({ message: "post deleted", type: "success" }));
      } catch (error) {
        console.error("Failed to delete blog:", error.response?.data || error.message);
      }
    }
  };

  const sortBlogsByLikes = (blogs) => {
    return blogs.slice().sort((a, b) => b.likes - a.likes);
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(addBlog(returnedBlog));
      dispatch(setNotification({ message: "a new blog has been added", type: "success" }));
    });
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.username === null ? (
        <LoginForm
          username={username}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsernameInput(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <p>
            <span>{user.username} logged in </span>
          </p>
          {user.username !== null && <BlogForm addBlog={addBlog} />}
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
  );
};

export default App;