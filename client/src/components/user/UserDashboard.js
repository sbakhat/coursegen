import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Avatar,
  Stack,
  Chip,
  IconButton,
} from '@mui/material';
import {
  PlayCircle,
  AutoAwesome,
  School,
  TrendingUp,
  MoreVert,
  Bookmark,
  Star,
} from '@mui/icons-material';

const CourseCard = ({ course }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box
      sx={{
        position: 'relative',
        height: 140,
        background: `linear-gradient(45deg, ${course.color} 30%, ${course.color}90 90%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        sx={{
          width: 60,
          height: 60,
          bgcolor: 'white',
          color: course.color,
        }}
      >
        {course.icon}
      </Avatar>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'white',
        }}
      >
        <MoreVert />
      </IconButton>
    </Box>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        {course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {course.description}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={course.progress}
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {course.progress}% Complete
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        startIcon={<PlayCircle />}
        sx={{ mt: 'auto' }}
      >
        Continue Learning
      </Button>
    </CardContent>
  </Card>
);

const StatCard = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main` }}>
          {icon}
        </Avatar>
        <Typography variant="h6" sx={{ ml: 2 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const UserDashboard = () => {
  const courses = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Learn modern web development with React, Node.js, and MongoDB',
      progress: 75,
      color: '#2196f3',
      icon: <School />,
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master data analysis and visualization with Python',
      progress: 45,
      color: '#4caf50',
      icon: <TrendingUp />,
    },
    {
      id: 3,
      title: 'Machine Learning Basics',
      description: 'Introduction to ML algorithms and applications',
      progress: 30,
      color: '#ff9800',
      icon: <AutoAwesome />,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesome sx={{ color: 'primary.main' }} />
          Welcome back, User!
        </Typography>
        <Button
          variant="contained"
          startIcon={<AutoAwesome />}
          onClick={() => window.location.href = '/generate'}
        >
          Generate New Course
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Courses in Progress"
            value="3"
            icon={<School />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Completed Courses"
            value="5"
            icon={<Star />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Learning Streak"
            value="7 days"
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Saved Courses"
            value="12"
            icon={<Bookmark />}
            color="info"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Continue Learning
          </Typography>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Progress
              </Typography>
              <Box sx={{ height: 300 }}>
                {/* Add Chart Component Here */}
                <Stack spacing={2}>
                  {courses.map((course) => (
                    <Box key={course.id}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{course.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recommended Courses
              </Typography>
              <Stack spacing={2}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 1,
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'action.hover',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      <School />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">
                        Advanced JavaScript
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        12 modules • 8 hours
                      </Typography>
                    </Box>
                    <Chip size="small" label="New" color="primary" />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard; 