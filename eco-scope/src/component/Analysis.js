import React, { useRef } from 'react';
import { Typography, Card, CardContent, Box, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {  FaBolt } from 'react-icons/fa';
import jsPDF from 'jspdf';  // Import jsPDF for PDF generation
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Analysis({ data, carbonEstimate }) {
  const chartRef = useRef(null);

  // Bar chart data
  const chartData = {
    labels: ['Energy Consumption (kWh)', 'Carbon Emissions (kg CO2)', 'Water Usage (liters)', 'Waste Generated (kg)'],
    datasets: [
      {
        label: 'Environmental Impact',
        data: [
          data.energyConsumption || 0,
          data.carbonEmissions || 0,
          data.waterUsage || 0,
          data.wasteGenerated || 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Download chart as PDF
  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Environmental Impact Data", 20, 20);

    // Convert chart to base64 image
    const chart = chartRef.current.toBase64Image();
    pdf.addImage(chart, 'PNG', 15, 40, 180, 100); // Image coordinates

    pdf.save("environmental_data.pdf");
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: '30px auto', padding: 4 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>CO2 Estimate</Typography>
          <Typography variant="body1">
            Carbon Dioxide Estimate: {carbonEstimate.co2Estimate} kg CO2
          </Typography>
        </CardContent>
      </Card>

      {/* Environmental Impact Analysis Cards */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
            <FaBolt /> Energy Consumption
          </Typography>
          <Typography variant="body1">
            Your project consumed {data.energyConsumption} kWh of energy, equivalent to {carbonEstimate.co2Estimate} kg CO2.
          </Typography>
        </CardContent>
      </Card>

      {/* Add other cards here for Water Usage, Waste Generated, etc. */}

      {/* Bar Chart */}
      <Bar data={chartData} options={chartOptions} ref={chartRef} />

      {/* Download button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={downloadPDF}
      >
        Download Chart as PDF
      </Button>
    </Box>
  );
}

export default Analysis;
