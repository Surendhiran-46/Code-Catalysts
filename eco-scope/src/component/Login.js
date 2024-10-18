import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, InputAdornment, IconButton, Alert } from '@mui/material';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
        setError('Both username and password are required.');
        return;
    }
    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            email,
            password
        });
        console.log('Logged in:', response.data);
        navigate('/'); // Redirect to the home page or dashboard
    } catch (error) {
        console.error('Login failed:', error);
        setError('Invalid email or password.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Box sx={{ width: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <Typography variant="h4" textAlign="center" mb={2}>Login</Typography>

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
            )
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{ mb: 2 }}
        >
          Login
        </Button>

        <Divider sx={{ width: '100%', my: 3 }} />

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ color: 'green', borderColor: 'green', '&:hover': { borderColor: 'darkgreen' } }}
        >
          Login with Google
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
