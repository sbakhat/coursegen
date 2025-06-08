import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 4,
            background: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '4px solid',
                borderColor: 'primary.main',
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              {user?.name || 'User Profile'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={user?.name || ''}
                disabled
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ''}
                disabled
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={4}
                value={user?.bio || ''}
                disabled
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #6B3FE7 30%, #00CCE5 90%)',
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfile; 