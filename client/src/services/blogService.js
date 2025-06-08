import axios from 'axios';
import Blog from '../models/Blog';
import connectDB from '../utils/mongodb';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${API_URL}/blogs`, blogData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const getBlogs = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/blogs`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

export const updateBlog = async (slug, blogData) => {
  try {
    const response = await axios.put(`${API_URL}/blogs/${slug}`, blogData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

export const deleteBlog = async (slug) => {
  try {
    const response = await axios.delete(`${API_URL}/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

export const publishBlog = async (blogId) => {
  try {
    await connectDB();
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { 
        status: 'published',
        publishedAt: Date.now(),
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  } catch (error) {
    console.error('Error publishing blog:', error);
    throw new Error('Failed to publish blog');
  }
};

export const unpublishBlog = async (blogId) => {
  try {
    await connectDB();
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { 
        status: 'draft',
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  } catch (error) {
    console.error('Error unpublishing blog:', error);
    throw new Error('Failed to unpublish blog');
  }
};

export const getBlogCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
};

export const getBlogTags = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs/tags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    throw error;
  }
};

export const searchBlogs = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching blogs:', error);
    throw error;
  }
}; 