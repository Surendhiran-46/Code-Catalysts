// Register.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, Divider, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            navigate('/');  // Redirect to the home page
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

  // Placeholder for Google Sign Up
  const handleGoogleSignUp = () => {
    console.log("Google Sign Up");
    // Implement Google sign up logic here
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Box sx={{ width: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <Typography variant="h4" textAlign="center" mb={2}>Sign Up</Typography>

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
            )
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
            )
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
          onClick={handleGoogleSignUp}
          fullWidth
          sx={{ color: 'green', borderColor: 'green', '&:hover': { borderColor: 'darkgreen' } }}
        >
          Sign Up with Google
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
