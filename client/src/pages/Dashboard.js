import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import {
  PlayArrow,
  Bookmark,
  TrendingUp,
  EmojiEvents,
  Add as AddIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const CourseCard = ({ title, progress, image, onClick }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(30, 30, 30, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-8px)',
      },
    }}
  >
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt={title}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="h2">
        {title}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Progress: {progress}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
            },
          }}
        />
      </Box>
    </CardContent>
    <Box sx={{ p: 2, pt: 0 }}>
      <Button
        fullWidth
        variant="contained"
        startIcon={<PlayArrow />}
        onClick={onClick}
        sx={{
          background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #6B3FE7 30%, #00CCE5 90%)',
          },
        }}
      >
        Continue Learning
      </Button>
    </Box>
  </Card>
);

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 3,
      height: '100%',
      background: 'rgba(30, 30, 30, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
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
    <Typography variant="h4" component="div">
      {value}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const mockCourses = [
    {
      id: 1,
      title: 'Introduction to AI',
      progress: 75,
      image: '/course-1.jpg',
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      progress: 45,
      image: '/course-2.jpg',
    },
    {
      id: 3,
      title: 'Deep Learning Fundamentals',
      progress: 30,
      image: '/course-3.jpg',
    },
  ];

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
            Welcome back, {user?.name || 'User'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Continue your learning journey
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Courses in Progress"
              value="3"
              icon={<Bookmark />}
              color="#7C4DFF"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Hours Learned"
              value="24"
              icon={<TrendingUp />}
              color="#00E5FF"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Certificates"
              value="2"
              icon={<EmojiEvents />}
              color="#FF4081"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Achievement Rate"
              value="85%"
              icon={<TrendingUp />}
              color="#FFC400"
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">Your Courses</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/course-generator')}
              sx={{
                background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #6B3FE7 30%, #00CCE5 90%)',
                },
              }}
            >
              Generate New Course
            </Button>
          </Box>
          <Grid container spacing={3}>
            {mockCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <CourseCard
                  title={course.title}
                  progress={course.progress}
                  image={course.image}
                  onClick={() => navigate(`/courses/${course.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 