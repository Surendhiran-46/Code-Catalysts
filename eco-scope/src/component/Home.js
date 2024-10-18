import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
    >
      {/* Welcome Message */}
      <Typography variant="h3" gutterBottom>
        Environmental Impact Assessment Platform
      </Typography>

      <Typography variant="h6" color="textSecondary" gutterBottom>
        Aligning Corporate Sustainability Initiatives
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="textSecondary" paragraph>
        Track your organization’s environmental footprint and ensure alignment with your sustainability goals.
      </Typography>

      {/* User Registration and Authentication */}
      <Box marginY={2}>
        <Typography variant="h6">User Registration and Authentication</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Create an account to start tracking your environmental data and manage your corporate sustainability initiatives.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link} to="/login"
          sx={{ margin: 1 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link} to="/register"
          sx={{ margin: 1 }}
        >
          Register
        </Button>
      </Box>

      {/* Data Entry and Tracking */}
      <Box marginY={2}>
        <Typography variant="h6">Data Entry and Tracking</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Enter your environmental footprint data such as energy usage, water consumption, and carbon emissions to track your progress over time.
        </Typography>
        <Button
          variant="contained"
          color="success"
          component={Link} to="/data-entry"
        >
          Start Data Entry
        </Button>
      </Box>

      {/* Admin Access */}
      <Box marginY={2}>
        <Typography variant="h6">Admin Access</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Admins can manage user access and privileges to ensure secure access to sensitive data.
        </Typography>
        <Button
          variant="contained"
          color="warning"
          component={Link} to="/admin"
        >
          Admin Dashboard
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
