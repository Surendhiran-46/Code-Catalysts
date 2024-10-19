// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, Divider, Alert, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import leaf from '../assests/leaf.jpg';


function Register() {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleUserTypeSelection = (e) => {
    setUserType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password should be at least 8 characters';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must contain at least one uppercase letter';
    else if (!/[a-z]/.test(formData.password)) newErrors.password = 'Password must contain at least one lowercase letter';
    else if (!/[0-9]/.test(formData.password)) newErrors.password = 'Password must contain at least one number';
    else if (!/[!@#$%^&*]/.test(formData.password)) newErrors.password = 'Password must contain at least one special character';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (userType === 'Company' && !formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }
    if (userType) {
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
            });
            console.log('Form submitted:', response.data);
            navigate('/Home');  // Redirect to the home page
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError('Failed to register. Email already exists or server error.');
        }
    } else {
        setSubmitError('Please select a user type.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSignInClick = () => {
    navigate('/login');  // Redirect to the login page
  };

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up");
  };
  const handleAppleSignUp = () => {
    console.log("Apple Sign Up");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}  // Page background styling
    >
      <Box
        display="flex"
        sx={{
          margin : '',
          width: '900px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
        }}
      >
        {/* Left Side - Image */}
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px 0 0 10px',  // Rounds only the left side
            overflow: 'hidden',
          }}
        >
          <img
            src={leaf}  // Example image, replace with your own
            alt="Sign Up Visual"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        {/* Right Side - Registration Form */}
        <Box
          sx={{

            width: '50%',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" textAlign="left" mb={2}>
            Get Started Now!
          </Typography>

          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

          <Box display="flex" gap={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <TextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />

          <RadioGroup value={userType} onChange={handleUserTypeSelection} sx={{ mt: 2 }}>
            <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
            <FormControlLabel value="Company" control={<Radio />} label="Company" />
          </RadioGroup>

          {userType === 'Company' && (
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.companyName}
              helperText={errors.companyName}
              InputLabelProps={{ shrink: true }}
            />
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 3, backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
            >
            Sign Up
          </Button>

          <Divider sx={{ width: '100%', my: 3 }} />

          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignUp}
            fullWidth
            sx={{ color: 'green', borderColor: 'green', '&:hover': { borderColor: 'darkgreen' } }}
          >
            Sign Up with Google
          </Button>
          <Button
            variant="contained"
            startIcon={<AppleIcon />}
            onClick={handleAppleSignUp}
            fullWidth
            sx={{ mt: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'gray' } }}
          >
            Sign Up with Apple
          </Button> 

          {/* Sign In link */}
          <Typography textAlign="center" sx={{ mt: 2 }}>
            Have an account?{' '}
            <Link onClick={handleSignInClick} sx={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;