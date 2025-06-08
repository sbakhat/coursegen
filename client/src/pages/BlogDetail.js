import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Button,
  useTheme,
  CircularProgress,
  Alert,
  Divider,
  Grid,
} from '@mui/material';
import { getBlogBySlug } from '../services/blogService';
import { format } from 'date-fns';

const BlogDetail = () => {
  const theme = useTheme();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const data = await getBlogBySlug(slug);
      setBlog(data);
    } catch (err) {
      setError('Failed to fetch blog');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || 'Blog not found'}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/blog')}
          sx={{
            background: 'linear-gradient(45deg, #7C4DFF 30%, #00E5FF 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #6B3FE7 30%, #00CCE5 90%)',
            },
          }}
        >
          Back to Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.default,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/blog')}
            sx={{ mb: 4 }}
          >
            ← Back to Blogs
          </Button>

          <Typography variant="h3" component="h1" gutterBottom>
            {blog.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              src={blog.author.avatar}
              alt={blog.author.name}
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">
                {blog.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {format(new Date(blog.publishedAt), 'MMMM d, yyyy')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            {blog.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Box
            component="img"
            src={blog.featuredImage}
            alt={blog.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: 2,
              mb: 4,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              '& p': { mb: 2 },
              '& h2': { mt: 4, mb: 2 },
              '& h3': { mt: 3, mb: 2 },
              '& ul, & ol': { mb: 2, pl: 4 },
              '& li': { mb: 1 },
              '& blockquote': {
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 2,
                py: 1,
                my: 2,
                fontStyle: 'italic',
              },
            }}
          >
            {blog.content}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              About the Author
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  sx={{ width: 64, height: 64 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  {blog.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.author.bio || 'No bio available'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetail; 