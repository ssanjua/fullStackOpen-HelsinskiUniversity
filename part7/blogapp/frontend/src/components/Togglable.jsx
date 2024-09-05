import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Box, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Box sx={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
          endIcon={<ExpandMoreIcon />}
        >
          {props.buttonLabel}
        </Button>
      </Box>
      <Paper elevation={3} sx={{ padding: 3, mt: 2, display: showWhenVisible.display }}>
        {props.children}
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVisibility}
          startIcon={<ExpandLessIcon />}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Paper>
    </Box>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;