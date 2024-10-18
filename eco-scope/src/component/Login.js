import React from 'react';
import { TextField, Button, Box, Typography, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; 

function Login() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back!
        </Typography>

        <Typography align="center" variant="body1" gutterBottom>
          Log in with your email and password
        </Typography>

        {/* Email input */}
        <TextField 
          fullWidth 
          label="Email address" 
          variant="outlined" 
          margin="normal" 
          type="email" 
        />

        {/* Password input */}
        <TextField 
          fullWidth 
          label="Password" 
          variant="outlined" 
          margin="normal" 
          type="password" 
        />
        
        {/* Forgot Password link moved to left */}
        <Typography 
          align="left" 
          color="primary" 
          variant="body2" 
          sx={{ marginTop: 1, cursor: 'pointer', marginLeft: 1 }}
        >
          Forgot Password?
        </Typography>

        {/* Login button */}
        <Button 
          variant="contained" 
          fullWidth 
          color="success" 
          sx={{ marginTop: 2 }}
        >
          Log In
        </Button>

        {/* Divider */}
        <Divider sx={{ marginY: 2 }} />

        <Typography align="center" variant="body2">
          OR
        </Typography>

        {/* Google Login Button */}
        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<GoogleIcon />}  // Material UI Google icon
          sx={{ marginTop: 2 }}
        >
          Log in with Google
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
