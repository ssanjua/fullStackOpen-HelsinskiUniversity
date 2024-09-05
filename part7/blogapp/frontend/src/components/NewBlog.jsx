import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NewBlog = ({ doCreate }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doCreate({ title, url, author });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Create a New Blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={handleTitleChange}
            data-testid="title"
          />
          <TextField
            label="URL"
            fullWidth
            margin="normal"
            value={url}
            onChange={handleUrlChange}
            data-testid="url"
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            value={author}
            onChange={handleAuthorChange}
            data-testid="author"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewBlog;