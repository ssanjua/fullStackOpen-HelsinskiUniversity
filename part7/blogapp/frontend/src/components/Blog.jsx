import React, { useState } from 'react';
import PropTypes from 'prop-types';
import storage from '../services/storage';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';

const Blog = ({ blog, handleVote, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const nameOfUser = blog.user ? blog.user.name : 'anonymous';
  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component={Link} to={`/blogs/${blog.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
          {blog.title} by {blog.author}
        </Typography>
        {expanded && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {blog.likes} likes
              <IconButton color="primary" onClick={() => handleVote(blog)} sx={{ ml: 1 }}>
                <ThumbUpIcon />
              </IconButton>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              added by {nameOfUser}
            </Typography>
            {canRemove && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(blog)}
                sx={{ mt: 1 }}
              >
                Remove
              </Button>
            )}
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={toggleExpanded}>
          {expanded ? 'Hide' : 'View'}
        </Button>
      </CardActions>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;