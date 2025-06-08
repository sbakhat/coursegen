import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Layout Components
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import AdminLogin from './components/admin/AdminLogin';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Course Components
import CourseGenerator from './components/courses/CourseGenerator';
import CourseList from './components/courses/CourseList';
import CourseDetail from './components/courses/CourseDetail';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourses from './components/admin/AdminCourses';
import AdminUsers from './components/admin/AdminUsers';

// Package Components
import PaymentPackages from './components/packages/PaymentPackages';

// User Components
import UserDashboard from './components/user/UserDashboard';
import UserProfile from './components/user/UserProfile';
import UserSettings from './components/user/UserSettings';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/packages" element={<PaymentPackages />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Protected User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/courses" element={
            <ProtectedRoute>
              <CourseList />
            </ProtectedRoute>
          } />
          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
          <Route path="/generate" element={
            <ProtectedRoute>
              <CourseGenerator />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/courses" element={
            <AdminRoute>
              <AdminCourses />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 