import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@mui/system'; // Import keyframes for animation
import ecoscopeLogo from '../assests/ecoscope.png'; // Import the logo image

// Define the background gradient animation with green shades
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function Home() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #66ff66, #009900)', // Green gradient colors
        height: '100vh',
        animation: `${gradientAnimation} 10s ease infinite`, // Apply animation
        backgroundSize: '400% 400%',
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#808080', boxShadow: 'none' }}> {/* Grey navbar */}
        <Toolbar sx={{ justifyContent: 'space-between' }}> {/* Align the navbar */}
          {/* Logo Image */}
          <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
            <img src={ecoscopeLogo} alt="EcoScope Logo" height="50" /> {/* Logo height can be adjusted */}
          </Box>

          {/* Navbar Links */}
          <Box>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        color="white"
      >
        {/* Welcome Message */}
        <Typography variant="h3" gutterBottom>
          Environmental Impact Assessment Platform
        </Typography>

        <Typography variant="h6" color="lightgrey" gutterBottom>
          Aligning Corporate Sustainability Initiatives
        </Typography>

        {/* Description */}
        <Typography variant="body1" color="lightgrey" paragraph>
          Track your organization’s environmental footprint and ensure alignment with your sustainability goals.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
