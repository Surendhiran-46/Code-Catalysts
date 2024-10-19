import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Alert, TextField, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

function Profile() {
  const { userId } = useContext(AuthContext); // Get the user ID from context
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; // Prevent fetching if no user ID is present
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setFormData({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          companyName: response.data.company_name,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setSubmitError('Failed to load user data.');
      }
    };
    fetchUserData();
  }, [userId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/${userId}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        companyName: formData.companyName,
      });
      console.log('Form updated:', response.data);
      setSuccessMessage('User details updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating form:', error);
      setSubmitError('Failed to update user details.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <Box
        sx={{
          width: '600px',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <Avatar
          alt="Profile Picture"
          sx={{ width: 100, height: 100, margin: '0 auto 20px' }}
        >
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h4" mb={2}>
          Profile
        </Typography>
        {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        {!editMode ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">First Name:</Typography>
              <Typography variant="body1">{formData.firstName}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Last Name:</Typography>
              <Typography variant="body1">{formData.lastName}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Email:</Typography>
              <Typography variant="body1">{formData.email}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Company Name:</Typography>
              <Typography variant="body1">{formData.companyName}</Typography>
            </Box>
          </>
        ) : (
          <>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </>
        )}

        {!editMode ? (
          <Button
            variant="contained"
            onClick={() => setEditMode(true)}
            fullWidth
            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            Edit Profile
          </Button>
        ) : (
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => setEditMode(false)}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
