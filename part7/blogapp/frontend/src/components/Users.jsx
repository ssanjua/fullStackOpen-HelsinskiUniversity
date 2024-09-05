import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} hover>
                <TableCell align="center">
                  <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align="center">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;