import React from 'react';
import { useSelector } from 'react-redux';
import { Alert, Box } from '@mui/material';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification) {
    return null;
  }

  const { message, type } = notification;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Alert severity={type} variant="filled">
        {message}
      </Alert>
    </Box>
  );
};

export default Notification;