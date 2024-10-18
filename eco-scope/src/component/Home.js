import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@mui/system';
import ecoscopeLogo from '../assests/ecoscope.png';
import enviImage from '../assests/envi.jpeg';

// Define the background gradient animation with green shades (similar to the logo)
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Define fade-in animation for text
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px); 
  }
  100% {
    opacity: 1;
    transform: translateY(0); 
  }
`;

// Define sliding-in animation from the left
const slideInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px); 
  }
  100% {
    opacity: 1;
    transform: translateX(0); 
  }
`;

function Home() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${enviImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        height: '100vh',
        animation: `${gradientAnimation} 10s ease infinite`,
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #000000, #434343)', boxShadow: 'none', padding: '10px 30px' }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
            <img src={ecoscopeLogo} alt="EcoScope Logo" height="50" />
          </Box>
          <Box>
            <Button color="inherit" component={Link} to="/login" sx={{ borderRadius: '20px', margin: '0 10px', padding: '8px 16px' }}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register" sx={{ borderRadius: '20px', margin: '0 10px', padding: '8px 16px' }}>
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" minHeight="calc(100vh - 64px)" textAlign="left" color="black" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ animation: `${fadeIn} 2s ease-out`, marginBottom: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 700, color: 'white' }}>
          Sustainable Future
        </Typography>
        <Typography variant="h6" color="white" gutterBottom sx={{ animation: `${slideInFromLeft} 3s ease-out`, marginBottom: 2, fontFamily: '"Lora", serif', fontWeight: 500 }}>
          Aligning Corporate Sustainability Initiatives
        </Typography>
        <Typography variant="body1" color="white" paragraph sx={{ animation: `${fadeIn} 4s ease-out`, marginBottom: 2, fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: '1.2rem' }}>
          Track your organization’s environmental footprint and ensure alignment with your sustainability goals.
        </Typography>
      </Box>

      {/* Additional Boxes */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, padding: 4 }}>
        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Data Entry</Typography>
            <Typography variant="body2">Enter your organization's environmental data such as energy consumption, carbon emissions, and more.</Typography>
            <Button variant="contained" color="primary" component={Link} to="/data-entry" sx={{ marginTop: 2 }}>
              Add Data
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Report Generation</Typography>
            <Typography variant="body2">Generate comprehensive sustainability reports based on the data you have entered.</Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Generate Report</Button>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Flowchart Display</Typography>
            <Typography variant="body2">Visualize the flow of sustainability metrics and organizational processes through interactive charts.</Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>View Flowchart</Button>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Suggestions</Typography>
            <Typography variant="body2">Get personalized sustainability suggestions based on your organization's data and goals.</Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Get Suggestions</Button>
          </CardContent>
        </Card>
      </Box>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: 6, textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>About EcoScope</Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          EcoScope is dedicated to helping organizations track and reduce their environmental footprint through comprehensive data collection, analysis, and reporting tools.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Services We Provide</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Data Entry & Tracking</Typography>
            <Typography variant="body2">Easy data entry and tracking for all your sustainability metrics.</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Report Generation</Typography>
            <Typography variant="body2">Generate detailed sustainability reports based on your data.</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Flowchart Visualization</Typography>
            <Typography variant="body2">Visualize the flow of your sustainability data through dynamic flowcharts.</Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 4, marginBottom: 2 }}>Contact Us</Typography>
        <Typography variant="body1">
          For more information, reach out to us at: <br />
          Email: info@ecoscope.com <br />
          Phone: +123 456 7890
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
