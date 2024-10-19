import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, Divider, InputAdornment, IconButton, Alert } from '@mui/material';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import leaf from '../assests/leaf.jpg';
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext); // Get login function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      console.log('Logged in:', response.data);

      // Save the token and update the auth state
      login(response.data.token);

      // Redirect to home page or dashboard
      navigate('/Home');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }} // Updated styling for page background
      >
        <Box
          display="flex"
          sx={{
            width: '900px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          {/* Left Side - Login Form */}
          <Box
            sx={{
              width: '50%',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" textAlign="left" mb={2} style={{paddingBottom : '30px'}}>
              Welcome Back!
            </Typography>
  
            {error && <Alert severity="error">{error}</Alert>}
  
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
  
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
  
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{ mb: 2, backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }}}
              >
              Login
            </Button>
  
            <Divider sx={{ width: '100%', my: 3 }}> or </Divider>
  
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{ color: 'green', borderColor: 'green', '&:hover': { borderColor: 'darkgreen' } }}
              >
              Login with Google
            </Button> <br />
            <Button
              variant="outlined"
              startIcon={<AppleIcon />}
              fullWidth
              sx={{ mt: 2, color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'gray' } }}
            >
              Login with Apple
            </Button> <br />
            <Typography textAlign="center" sx={{ mt: 2 }}>
              Have an account?{' '}
              <Link to="/register" style={{ color: 'blue', textDecoration: 'none' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
  
          {/* Right Side - Image */}
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0 10px 10px 0', // Rounds only the right side
              overflow: 'hidden',
            }}
          >
            <img
              src={leaf} // Example image, replace with your own
              alt="Login Visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </Box>
    );
  }
  
  export default Login;