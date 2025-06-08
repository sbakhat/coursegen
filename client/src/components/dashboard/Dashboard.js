import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { fetchCourses } from '../../store/slices/courseSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses, loading } = useSelector((state) => state.courses);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userCourses = courses.filter(
    (course) => course.instructor._id === user?._id
  );

  const enrolledCourses = courses.filter((course) =>
    user?.enrolledCourses.includes(course._id)
  );

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
      <Grid container spacing={3}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">{user?.name}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Role
              </Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                {user?.role}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              component={RouterLink}
              to="/profile"
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Course Management */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="My Courses" />
                <Tab label="Enrolled Courses" />
              </Tabs>
            </Box>

            {tabValue === 0 && (
              <>
                {user?.role === 'instructor' && (
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/create-course"
                    sx={{ mb: 3 }}
                  >
                    Create New Course
                  </Button>
                )}

                <List>
                  {userCourses.map((course) => (
                    <React.Fragment key={course._id}>
                      <ListItem>
                        <ListItemText
                          primary={course.title}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {course.category} • {course.level}
                              </Typography>
                              <br />
                              {course.description.length > 100
                                ? `${course.description.substring(0, 100)}...`
                                : course.description}
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            component={RouterLink}
                            to={`/courses/${course._id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}

            {tabValue === 1 && (
              <List>
                {enrolledCourses.map((course) => (
                  <React.Fragment key={course._id}>
                    <ListItem>
                      <ListItemText
                        primary={course.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {course.category} • {course.level}
                            </Typography>
                            <br />
                            {course.description.length > 100
                              ? `${course.description.substring(0, 100)}...`
                              : course.description}
                          </>
                        }
                      />
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/courses/${course._id}`}
                      >
                        Continue Learning
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 