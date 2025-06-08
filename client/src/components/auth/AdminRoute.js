import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useSelector((state) => state.admin);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)',
        }}
      >
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute; 