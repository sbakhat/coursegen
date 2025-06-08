import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit,
  Save,
  Notifications,
  Language,
  Security,
  Payment,
  AutoAwesome,
  School,
  Star,
  Bookmark,
} from '@mui/icons-material';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Passionate learner and tech enthusiast',
    location: 'New York, USA',
    website: 'https://johndoe.com',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    language: 'English',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Handle save action
    console.log('Save profile:', profileData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferenceChange = (name) => (event) => {
    setPreferences({
      ...preferences,
      [name]: event.target.checked,
    });
  };

  const stats = [
    { icon: <School />, label: 'Courses Enrolled', value: '12' },
    { icon: <Star />, label: 'Completed Courses', value: '5' },
    { icon: <Bookmark />, label: 'Saved Courses', value: '8' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesome sx={{ color: 'primary.main' }} />
          Profile Settings
        </Typography>
        {!isEditing ? (
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                {profileData.name[0]}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {profileData.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {profileData.email}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {stats.map((stat, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {stat.icon}
                    <Typography variant="body2">
                      {stat.label}: {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={profileData.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive email updates about your courses"
                  />
                  <Switch
                    edge="end"
                    checked={preferences.emailNotifications}
                    onChange={handlePreferenceChange('emailNotifications')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive push notifications on your device"
                  />
                  <Switch
                    edge="end"
                    checked={preferences.pushNotifications}
                    onChange={handlePreferenceChange('pushNotifications')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Language />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Switch between light and dark theme"
                  />
                  <Switch
                    edge="end"
                    checked={preferences.darkMode}
                    onChange={handlePreferenceChange('darkMode')}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText
                    primary="Security Settings"
                    secondary="Manage your password and security preferences"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Payment />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payment Methods"
                    secondary="Manage your payment methods and billing"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile; 