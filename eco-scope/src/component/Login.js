import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, InputAdornment, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // Error state for form validation

  const navigate = useNavigate(); // useNavigate hook for navigation

  // Function to handle form submission
  const handleSubmit = () => {
    if (!email || !password) {
      setError('Both username and password are required.');
    } else {
      setError('');
      // Simulate login logic (e.g., API call)
      console.log('Logging in with:', { email, password });

      // Redirect to Home page after successful login
      navigate('/');
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Simulate Google login logic
    console.log('Logging in with Google');

    // Redirect to Home page after successful Google login
    navigate('/');
  };

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

        {/* Username input */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={!!error && !email}
          helperText={!!error && !email ? 'Username is required' : ''}
          InputLabelProps={{
            required: false, // Prevents the '*' from showing
            shrink: true, // Ensures that the label doesn't collapse
            style: { fontWeight: 'normal' },
          }}
        />

        {/* Password input */}
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={!!error && !password}
          helperText={!!error && !password ? 'Password is required' : ''}
          InputLabelProps={{
            required: false, // Prevents the '*' from showing
            shrink: true, // Ensures that the label doesn't collapse
            style: { fontWeight: 'normal' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot Password link moved to the right */}
        <Typography
          align="right"
          color="primary"
          variant="body2"
          sx={{ marginTop: 1, cursor: 'pointer', marginRight: 1 }}
        >
          Forgot Password?
        </Typography>

        {/* Error message */}
        {error && (
          <Typography color="error" align="center" variant="body2" sx={{ marginTop: 1 }}>
            {error}
          </Typography>
        )}

        {/* Login button */}
        <Button
          variant="contained"
          fullWidth
          color="success"
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
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
          startIcon={<GoogleIcon />} // Material UI Google icon
          sx={{ marginTop: 2 }}
          onClick={handleGoogleLogin}  // Handle Google login
        >
          Log in with Google
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
