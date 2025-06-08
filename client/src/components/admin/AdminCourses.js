import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Visibility,
  AutoAwesome,
} from '@mui/icons-material';

const courses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    category: 'Programming',
    level: 'Beginner',
    students: 1200,
    status: 'Published',
    lastUpdated: '2024-03-15',
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    category: 'Data Science',
    level: 'Intermediate',
    students: 850,
    status: 'Draft',
    lastUpdated: '2024-03-14',
  },
  {
    id: 3,
    title: 'Machine Learning Basics',
    category: 'AI & ML',
    level: 'Advanced',
    students: 650,
    status: 'Published',
    lastUpdated: '2024-03-13',
  },
];

const categories = [
  'Programming',
  'Data Science',
  'AI & ML',
  'Business',
  'Design',
  'Marketing',
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

const AdminCourses = () => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    description: '',
  });

  const handleOpen = (course = null) => {
    if (course) {
      setSelectedCourse(course);
      setFormData({
        title: course.title,
        category: course.category,
        level: course.level,
        description: '',
      });
    } else {
      setSelectedCourse(null);
      setFormData({
        title: '',
        category: '',
        level: '',
        description: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesome sx={{ color: 'primary.main' }} />
          Course Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Create Course
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Chip
                        label={course.status}
                        color={course.status === 'Published' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{course.lastUpdated}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpen(course)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCourse ? 'Edit Course' : 'Create New Course'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  label="Level"
                >
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Course Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<AutoAwesome />}
          >
            {selectedCourse ? 'Update Course' : 'Create Course'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCourses; 