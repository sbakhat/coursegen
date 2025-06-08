import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import {
  People,
  School,
  AttachMoney,
  TrendingUp,
  Add,
  MoreVert,
  AutoAwesome,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main` }}>
          {icon}
        </Avatar>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>
      <Typography variant="h4" component="div" gutterBottom>
        {value}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {title}
      </Typography>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" color="success.main">
            {trend}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const RecentActivity = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <Stack spacing={2}>
        {[1, 2, 3].map((item) => (
          <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.light' }}>
              <People />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">
                New user registered
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>
            <Chip size="small" label="New" color="primary" />
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

const QuickActions = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            sx={{ height: 100 }}
          >
            Create Course
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AutoAwesome />}
            sx={{ height: 100 }}
          >
            Generate Course
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesome sx={{ color: 'primary.main' }} />
          Admin Dashboard
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          New Course
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Users"
            value="1,234"
            icon={<People />}
            color="primary"
            trend="+12% this week"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Active Courses"
            value="56"
            icon={<School />}
            color="secondary"
            trend="+5% this month"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Revenue"
            value="$12,345"
            icon={<AttachMoney />}
            color="success"
            trend="+8% this month"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Completion Rate"
            value="78%"
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Performance
              </Typography>
              <Box sx={{ height: 300 }}>
                {/* Add Chart Component Here */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="body2">Web Development</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2">75%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="body2">Data Science</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2">60%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2">Machine Learning</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={90}
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2">90%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <RecentActivity />
            <QuickActions />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard; 