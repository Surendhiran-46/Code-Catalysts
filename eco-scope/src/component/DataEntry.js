import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert } from '@mui/material';
import forestsImage from '../assests/forests.jpg';  // Importing image from assets folder
import axios from 'axios';

function DataEntry() {
  const [data, setData] = useState({
    projectName: '',
    energyConsumption: '',
    carbonEmissions: '',
    waterUsage: '',
    wasteGenerated: '',
  });

  const [carbonEstimate, setCarbonEstimate] = useState(null);  // Store the CO2 estimate
  const [isSubmitted, setIsSubmitted] = useState(false);  // Track form submission
  const [error, setError] = useState('');  // Track errors

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send the environmental data to your internal API
      const response = await axios.post('http://localhost:5000/api/calculate-co2', {
        energyConsumption: data.energyConsumption,
        carbonEmissions: data.carbonEmissions,
        waterUsage: data.waterUsage,
        wasteGenerated: data.wasteGenerated
      });
  
      // Store the full analysis report from the backend
      setCarbonEstimate(response.data);
      setIsSubmitted(true);
      setError('');
    } catch (err) {
      setError('Failed to process environmental data');
      setIsSubmitted(false);
    }
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

        {/* Display success message and CO2 estimate if form submitted */}
        {isSubmitted && carbonEstimate && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Data Submitted Successfully!
            <Typography variant="body1" sx={{ mt: 2 }}>
              Project: {data.projectName} has an estimated CO2 emission of {carbonEstimate.co2e} kg CO2e based on the data provided.
            </Typography>
          </Alert>
        )}

        {/* Error message */}
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Project Name"
                variant="outlined"
                fullWidth
                type="text"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
      {isSubmitted && carbonEstimate && (
  <Alert severity="success" sx={{ mb: 4 }}>
    Data Submitted Successfully!
    <Typography variant="h5" sx={{ mt: 2 }}>
      Environmental Impact Report for {data.projectName}
    </Typography>
    <Typography variant="body1" sx={{ mt: 2 }}>
      Energy Consumption: {data.energyConsumption} kWh
      <br />
      Carbon Emissions: {carbonEstimate.co2Estimate} kg CO2
      <br />
      Water Usage: {data.waterUsage} liters (Equivalent to {carbonEstimate.waterUsageEquivalent} showers)
      <br />
      Waste Generated: {data.wasteGenerated} kg
      <br />
    </Typography>
    <Typography variant="h6" sx={{ mt: 2 }}>CO2 Emissions Analysis:</Typography>
    <Typography variant="body1">
      Your energy consumption results in an estimated {carbonEstimate.co2Estimate} kg of CO2 emissions,
      which is equivalent to driving {carbonEstimate.carKmEquivalent} km.
      <br />
      {carbonEstimate.recommendations.energyEfficiency}
    </Typography>
    <Typography variant="h6" sx={{ mt: 2 }}>Water Usage Impact:</Typography>
    <Typography variant="body1">
      Your project used {data.waterUsage} liters of water, equivalent to {carbonEstimate.waterUsageEquivalent} showers.
      <br />
      {carbonEstimate.recommendations.waterConservation}
    </Typography>
    <Typography variant="h6" sx={{ mt: 2 }}>Waste Generation:</Typography>
    <Typography variant="body1">
      Your project generated {data.wasteGenerated} kg of waste, {carbonEstimate.wasteRecyclingPotential} kg of which can be recycled.
      <br />
      {carbonEstimate.recommendations.wasteManagement}
    </Typography>
  </Alert>
)}
    </Box>
  );
}

export default DataEntry;
