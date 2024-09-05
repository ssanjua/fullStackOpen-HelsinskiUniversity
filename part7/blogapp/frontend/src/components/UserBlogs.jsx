import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper, Box, Avatar, ListItemAvatar } from '@mui/material';
import { blue } from '@mui/material/colors';
import PostAddIcon from '@mui/icons-material/PostAdd';

const UserBlogs = () => {
  const { id } = useParams();
  const user = useSelector(state => state.users.find(u => u.id === id));

  if (!user) {
    return <Typography variant="h6" color="error">User not found</Typography>;
  }

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Added blogs
      </Typography>
      <Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', mt: 2, padding: 2 }}>
        <List>
          {user.blogs.map(blog => (
            <ListItem key={blog.id} component={Link} to={`/blogs/${blog.id}`} button>
              <ListItemAvatar>
                <PostAddIcon />
              </ListItemAvatar>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default UserBlogs;