import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { fetchCourses } from '../../store/slices/courseSlice';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses = [], loading } = useSelector((state) => state.courses || {});
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const categories = [...new Set(courses.map((course) => course.category))];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    const matchesLevel = level === 'all' || course.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Courses
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={level}
                label="Level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value="all">All Levels</MenuItem>
                {levels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={4}>
        {filteredCourses.map((course) => (
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
  );
};

export default CourseList; 