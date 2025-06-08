import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Stack,
  Alert,
  Paper,
} from '@mui/material';
import { AutoAwesome, School, Psychology } from '@mui/icons-material';

const CourseGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedCourse, setGeneratedCourse] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a course topic');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedCourse(null);

    try {
      // TODO: Replace with actual Gemini API call
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResponse = {
        title: `${prompt} Course`,
        description: `A comprehensive course on ${prompt} covering all essential topics and practical applications.`,
        modules: [
          {
            title: 'Introduction to ' + prompt,
            topics: ['Overview', 'Key Concepts', 'Basic Principles'],
          },
          {
            title: 'Advanced ' + prompt,
            topics: ['Advanced Techniques', 'Best Practices', 'Case Studies'],
          },
          {
            title: 'Practical Applications',
            topics: ['Real-world Examples', 'Hands-on Projects', 'Industry Applications'],
          },
        ],
        duration: '8 weeks',
        level: 'Intermediate',
        prerequisites: ['Basic knowledge of related field', 'Eagerness to learn'],
      };

      setGeneratedCourse(mockResponse);
    } catch (err) {
      setError('Failed to generate course. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesome sx={{ color: 'primary.main' }} />
            AI Course Generator
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Enter a topic and let our AI create a comprehensive course structure for you.
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Describe the course you want to create (e.g., 'A beginner-friendly course on web development with React')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerate}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Psychology />}
            sx={{ minWidth: 200 }}
          >
            {loading ? 'Generating...' : 'Generate Course'}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {generatedCourse && (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <School sx={{ color: 'secondary.main' }} />
            {generatedCourse.title}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {generatedCourse.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Chip label={generatedCourse.duration} color="primary" />
            <Chip label={generatedCourse.level} color="secondary" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            Course Modules
          </Typography>

          {generatedCourse.modules.map((module, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {module.title}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {module.topics.map((topic, topicIndex) => (
                    <Chip
                      key={topicIndex}
                      label={topic}
                      size="small"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Prerequisites
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {generatedCourse.prerequisites.map((prereq, index) => (
              <Chip
                key={index}
                label={prereq}
                variant="outlined"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary">
              Save Course
            </Button>
            <Button variant="outlined" color="primary">
              Edit Course
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CourseGenerator; 