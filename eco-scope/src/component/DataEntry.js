// DataEntry.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import forestsImage from '../assests/forests.jpg';  // Importing image from assets folder
import axios from 'axios';  // Import axios for making HTTP requests

function DataEntry() {
  const [data, setData] = useState({
    projectName: '',
    energyConsumption: '',
    carbonEmissions: '',
    waterUsage: '',
    wasteGenerated: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the environmental data to the server
    axios.post('http://localhost:5000/api/environmental-data', data)
      .then(response => {
        console.log('Data stored successfully:', response.data);
        // You can reset the form or show a success message here
      })
      .catch(error => {
        console.error('Error storing data:', error);
        // Handle error here
      });
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',  
        backgroundImage: `url(${forestsImage})`,  
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        sx={{
          padding: 4,
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'black', marginBottom: 4 }}>
          Environmental Data
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Project Name"
                variant="outlined"
                fullWidth
                name="projectName"
                value={data.projectName}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,  
                  required: false,  
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Energy Consumption (kWh)"
                variant="outlined"
                fullWidth
                name="energyConsumption"
                value={data.energyConsumption}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,  
                  required: false,  
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Carbon Emissions (kg CO2)"
                variant="outlined"
                fullWidth
                name="carbonEmissions"
                value={data.carbonEmissions}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,  
                  required: false,  
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Water Usage (liters)"
                variant="outlined"
                fullWidth
                name="waterUsage"
                value={data.waterUsage}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,  
                  required: false,  
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Waste Generated (kg)"
                variant="outlined"
                fullWidth
                name="wasteGenerated"
                value={data.wasteGenerated}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,  
                  required: false,  
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"  
                fullWidth
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  },
                }}
              >
                Submit Data
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default DataEntry;
