import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { createCourse } from '../../store/slices/courseSlice';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    price: '',
    modules: [{ title: '', content: '', duration: '' }],
  });

  const { title, description, category, level, price, modules } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index, e) => {
    const newModules = [...modules];
    newModules[index][e.target.name] = e.target.value;
    setFormData({ ...formData, modules: newModules });
  };

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [...modules, { title: '', content: '', duration: '' }],
    });
  };

  const removeModule = (index) => {
    const newModules = modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: newModules });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCourse(formData)).then(() => {
      navigate('/dashboard');
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Course
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Course Title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Course Description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="Web Development">Web Development</MenuItem>
                  <MenuItem value="Mobile Development">Mobile Development</MenuItem>
                  <MenuItem value="Data Science">Data Science</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={level}
                  label="Level"
                  onChange={handleChange}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Price ($)"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Course Modules
              </Typography>
              {modules.map((module, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Module Title"
                        name="title"
                        value={module.title}
                        onChange={(e) => handleModuleChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={3}
                        label="Module Content"
                        name="content"
                        value={module.content}
                        onChange={(e) => handleModuleChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="number"
                        label="Duration (minutes)"
                        name="duration"
                        value={module.duration}
                        onChange={(e) => handleModuleChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                          color="error"
                          onClick={() => removeModule(index)}
                          disabled={modules.length === 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Button
                startIcon={<AddIcon />}
                onClick={addModule}
                variant="outlined"
                sx={{ mb: 3 }}
              >
                Add Module
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Creating Course...' : 'Create Course'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCourse; 