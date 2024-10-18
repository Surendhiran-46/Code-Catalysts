import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import forestsImage from '../assests/forests.jpg';  // Importing image from assets folder

function DataEntry() {
  const [data, setData] = useState({
    projectName: '',
    energyConsumption: '',
    carbonEmissions: '',
    waterUsage: '',
    wasteGenerated: '',
  });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the data to your API or backend
    console.log('Form Data Submitted: ', data);
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',  // Light background color
        backgroundImage: `url(${forestsImage})`,  // Adding the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        sx={{
          padding: 4,
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',  // White background for the form container
          boxShadow: 3,  // Subtle shadow for the form
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
                  shrink: true,  // Keeps the label inside the text field
                  required: false,  // Prevents the asterisk (*) from appearing next to the label
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
                  shrink: true,  // Keeps the label inside the text field
                  required: false,  // Prevents the asterisk (*) from appearing next to the label
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
                  shrink: true,  // Keeps the label inside the text field
                  required: false,  // Prevents the asterisk (*) from appearing next to the label
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
                  shrink: true,  // Keeps the label inside the text field
                  required: false,  // Prevents the asterisk (*) from appearing next to the label
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
                  shrink: true,  // Keeps the label inside the text field
                  required: false,  // Prevents the asterisk (*) from appearing next to the label
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"  // Green color for the button
                fullWidth
                sx={{
                  backgroundColor: '#4caf50',  // Green button color
                  '&:hover': {
                    backgroundColor: '#388e3c',  // Darker green on hover
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
