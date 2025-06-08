import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material';
import { fetchCourses } from '../../store/slices/courseSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const featuredCourses = courses.slice(0, 3);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            Welcome to Course Generator
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Create, learn, and share knowledge with our powerful course platform.
            Whether you're an instructor or a student, we've got you covered.
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/courses"
            >
              Browse Courses
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={RouterLink}
              to="/register"
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Courses Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Courses
        </Typography>
        <Grid container spacing={4}>
          {featuredCourses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://source.unsplash.com/random/400x200?${course.category}`}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Typography>
                    {course.description.length > 100
                      ? `${course.description.substring(0, 100)}...`
                      : course.description}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {course.level}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${course.price}
                    </Typography>
                  </Box>
                </CardContent>
                <Button
                  component={RouterLink}
                  to={`/courses/${course._id}`}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 'auto' }}
                >
                  View Course
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 