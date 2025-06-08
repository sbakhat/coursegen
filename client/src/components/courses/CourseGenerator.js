import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { generateCourse } from '../../services/geminiService';
import { saveCourse } from '../../services/courseService';
import { useSelector } from 'react-redux';

const CourseGenerator = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedCourse, setGeneratedCourse] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a course topic');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedCourse(null);

    try {
      const courseData = await generateCourse(prompt);
      setGeneratedCourse(courseData);
    } catch (err) {
      setError(err.message || 'Failed to generate course');
      console.error('Course generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedCourse) return;

    setLoading(true);
    try {
      await saveCourse(generatedCourse, user._id);
      navigate('/courses'); // Navigate to courses list after saving
    } catch (err) {
      setError('Failed to save course. Please try again.');
      console.error('Error saving course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAnother = () => {
    setGeneratedCourse(null);
    setPrompt('');
    setError(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            background: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            AI Course Generator
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Enter a topic and let AI generate a comprehensive course structure for you.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Course Topic"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Introduction to Machine Learning"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={loading}
              sx={{
                background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #6B3FE7 30%, #00CCE5 90%)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Course'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {generatedCourse && (
            <Box>
              <Typography variant="h5" gutterBottom>
                {generatedCourse.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {generatedCourse.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Chip
                  label={`Duration: ${generatedCourse.duration}`}
                  sx={{ mr: 1, mb: 1 }}
                />
                <Chip
                  label={`Level: ${generatedCourse.level}`}
                  sx={{ mr: 1, mb: 1 }}
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                Learning Objectives
              </Typography>
              <ul>
                {generatedCourse.objectives.map((objective, index) => (
                  <li key={index}>
                    <Typography variant="body1">{objective}</Typography>
                  </li>
                ))}
              </ul>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Course Modules
              </Typography>
              <Grid container spacing={2}>
                {generatedCourse.modules.map((module, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card
                      sx={{
                        background: 'rgba(30, 30, 30, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Module {index + 1}: {module.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {module.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #6B3FE7 30%, #00CCE5 90%)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Course'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleGenerateAnother}
                  disabled={loading}
                >
                  Generate Another
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default CourseGenerator; 