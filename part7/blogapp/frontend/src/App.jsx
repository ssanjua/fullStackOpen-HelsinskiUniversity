import { useState, useEffect, createRef } from 'react';
import React from 'react';
import loginService from './services/login';
import storage from './services/storage';
import Login from './components/Login';
import Blog from './components/Blog';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initializeUsers } from './reducers/userReducer';
import Users from "./components/Users";
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import { Container, Typography, AppBar, Toolbar, Button } from '@mui/material';

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  const notify = (message, type = 'success') => {
    dispatch(showNotification(message, type, 5));
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const blogFormRef = createRef();

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify('Wrong credentials', 'error');
    }
  };

  const handleCreate = async (blog) => {
    try {
      dispatch(createBlog(blog));
      dispatch(showNotification(`Blog created: ${blog.title}, ${blog.author}`, 'success', 5));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(showNotification('Failed to create blog', 'error', 5));
    }
  };

  const handleVote = async (blog) => {
    try {
      dispatch(likeBlog(blog));
      dispatch(showNotification(`You liked ${blog.title} by ${blog.author}`, 'success', 5));
    } catch (error) {
      dispatch(showNotification('Failed to like blog', 'error', 5));
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(showNotification(`Blog ${blog.title}, by ${blog.author} removed`, 'success', 5));
      } catch (error) {
        dispatch(showNotification('Failed to delete blog', 'error', 5));
      }
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Blogs
        </Typography>
        <Notification />
        <Login doLogin={handleLogin} />
      </Container>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color="inherit" component={Link} to="/">Blogs</Button>
            <Button color="inherit" component={Link} to="/users">Users</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Notification />
        <Routes>
          <Route path="/" element={
            <>
              <Typography variant="h2" component="h1" align="center" gutterBottom>
                Blogs
              </Typography>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlog doCreate={handleCreate} />
              </Togglable>
              {[...blogs].sort(byLikes).map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleVote={() => handleVote(blog)}
                  handleDelete={() => handleDelete(blog)}
                />
              )}
            </>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;