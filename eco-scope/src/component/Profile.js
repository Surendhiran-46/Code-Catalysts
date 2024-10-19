import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import './style.css'
import { Box, Typography, Button, Alert, TextField, Avatar, IconButton /*, Dialog, DialogActions, DialogContent, DialogTitle */} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

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
  // const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  // const [passwordData, setPasswordData] = useState({
  //   currentPassword: '',
  //   newPassword: '',
  // });
  const navigate = useNavigate();
  // const handlePasswordChange = async () => {
  //   try {
  //     await axios.put(`http://localhost:5000/api/user/${userId}/password`, {
  //       currentPassword: passwordData.currentPassword,
  //       newPassword: passwordData.newPassword,
  //     });
  //     setSuccessMessage('Password updated successfully!');
  //     setPasswordDialogOpen(false);
  
  //     // Reset password fields after success
  //     setPasswordData({ currentPassword: '', newPassword: '' });
  
  //   } catch (error) {
  //     console.error('Error changing password:', error);
  //     setSubmitError('Failed to change password.');
  //   }
  // };
  

  const handleLogout = () => {
    console.log('User Logged out');
    localStorage.removeItem('token'); // or sessionStorage.clear();
    navigate('/');
  };
  
  // const handlePasswordInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswordData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
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
      console.log('Form updated : ', response.data);
      setSuccessMessage('User details updated successfully!');
      setEditMode(false); // Exit edit mode
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
          position: 'relative'
        }}
      >
        <IconButton
          onClick={() => setEditMode(true)}
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          <EditIcon />
        </IconButton>
        <Typography variant="h4" mb={2} sx={{ textAlign: 'left', mt: '-20px' }} style={{paddingBottom: '30px'}}>
          About Me!
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="left" mb={2} style={{paddingLeft: '30px', paddingBottom: '30px'}}>
          <Avatar
            alt="Profile Picture"
            sx={{ width: 100, height: 100, mb: 2 }}
          >
            <PersonIcon sx={{ fontSize: 70 }} />
          </Avatar>
          <Box sx={{ textAlign: 'left', width: '100%' }} style={{ paddingTop: '20px'}}>
            <Typography variant="h6" mb={1}>
              <strong>Username:</strong> {formData.firstName} {formData.lastName}
            </Typography> 
            <Typography variant="h6" mb={1}>
              <strong>Email:</strong> {formData.email}
            </Typography>
            {formData.companyName && (
              <Typography variant="body1" mb={1}>
                <strong>Company Name:</strong> {formData.companyName}
              </Typography>
            )}
          </Box>
        </Box>
        {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {!editMode ? (
          <>
            {/* <Button
              variant="contained"
              onClick={() => setPasswordDialogOpen(true)}
              sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }, mt: 2, position: 'absolute', bottom: '30px', right: '150px' }}
            >
              Change Password
            </Button> */}

            <Box sx={{ textAlign: 'left', width: '100%' }} style={{ paddingTop: '20px' }}>
  {/* ... other profile information */}
  <Button
    variant="contained"
    color="error" // Set the color to red
    onClick={handleLogout}
    sx={{ mt: 2, position: 'absolute', bottom: '30px', right: '30px' }} // Position it to the right
  >
    Logout
  </Button>
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
            <Box display="flex" gap={2} mt={2}>
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
          </>
        )}
      </Box>
      {/* <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordChange} sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }} variant="contained">
            Save Password
          </Button>
          <Button onClick={() => setPasswordDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}

export default Profile;
