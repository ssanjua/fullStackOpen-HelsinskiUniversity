import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, addComment } from '../reducers/blogReducer';
import { Typography, TextField, Button, List, ListItem, ListItemText, Paper, Box, Avatar, ListItemAvatar, Divider } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector(state => state.blogs.find(b => b.id === id));
  const [comment, setComment] = useState('');

  if (!blog) {
    return <Typography variant="h6" color="error">Blog not found</Typography>;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(addComment(id, comment));
    setComment('');
  };

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {blog.likes} likes
          </Typography>
          <Button variant="contained" color="primary" startIcon={<ThumbUpIcon />} onClick={handleLike}>
            Like
          </Button>
        </Box>
        <Typography variant="body1" gutterBottom>
          added by {blog.user.name}
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          Comments
        </Typography>
        <Paper elevation={1} sx={{ padding: 2, mb: 2 }}>
          <List>
            {blog.comments.map((c, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      <CommentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={c} />
                </ListItem>
                {index < blog.comments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
        <form onSubmit={handleComment}>
          <TextField
            label="Add a comment"
            fullWidth
            margin="normal"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type="submit" variant="contained" color="primary" startIcon={<CommentIcon />}>
            Add Comment
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default BlogDetail;