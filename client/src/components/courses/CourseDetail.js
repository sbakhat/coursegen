import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchCourseById } from '../../store/slices/courseSlice';

const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCourse: course, loading, error } = useSelector((state) => state.courses);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [review, setReview] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [dispatch, id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Add review submission logic here
  };

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

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container>
        <Alert severity="info">Course not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Course Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={course.rating} readOnly precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({course.reviews.length} reviews)
              </Typography>
            </Box>
            <Typography variant="h6" color="primary" gutterBottom>
              ${course.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" size="large">
                Enroll Now
              </Button>
              {isAuthenticated && user?.role === 'instructor' && (
                <Button variant="outlined" color="primary" size="large">
                  Edit Course
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Course Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Course Content
            </Typography>
            <List>
              {course.modules.map((module, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={module.title}
                      secondary={`Duration: ${module.duration} minutes`}
                    />
                  </ListItem>
                  {index < course.modules.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Course Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Level
              </Typography>
              <Typography variant="body1">{course.level}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Category
              </Typography>
              <Typography variant="body1">{course.category}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Instructor
              </Typography>
              <Typography variant="body1">{course.instructor.name}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Reviews Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Reviews
            </Typography>
            {isAuthenticated && (
              <Box component="form" onSubmit={handleReviewSubmit} sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Write a Review
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Rating
                    value={review.rating}
                    onChange={(event, newValue) => {
                      setReview({ ...review, rating: newValue });
                    }}
                  />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Review"
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained">
                  Submit Review
                </Button>
              </Box>
            )}
            <List>
              {course.reviews.map((review, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" component="span">
                            {review.user.name}
                          </Typography>
                          <Rating value={review.rating} readOnly size="small" sx={{ ml: 1 }} />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ display: 'block', mt: 1 }}
                          >
                            {review.comment}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 1 }}
                          >
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < course.reviews.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail; 