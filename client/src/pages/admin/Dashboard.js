import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
} from '@mui/material';
import {
  People,
  School,
  Assessment,
  Settings,
  Add as AddIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const StatCard = ({ title, value, icon, color }) => (
  <Card
    sx={{
      height: '100%',
      background: 'rgba(30, 30, 30, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton
          sx={{
            backgroundColor: `${color}20`,
            color: color,
            mr: 2,
            '&:hover': {
              backgroundColor: `${color}30`,
            },
          }}
        >
          {icon}
        </IconButton>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { adminEmail } = useSelector((state) => state.admin);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, Admin
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {adminEmail}
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value="1,234"
              icon={<People />}
              color="#7C4DFF"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Courses"
              value="56"
              icon={<School />}
              color="#00E5FF"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Revenue"
              value="$12,345"
              icon={<Assessment />}
              color="#FF4081"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Tasks"
              value="23"
              icon={<Settings />}
              color="#FFC400"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Recent Activities</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #6B3FE7 30%, #00CCE5 90%)',
                    },
                  }}
                >
                  Add New
                </Button>
              </Box>
              {/* Add your activity list or chart here */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<People />}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Manage Users
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<School />}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Manage Courses
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Assessment />}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    View Reports
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Settings />}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Settings
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard; 