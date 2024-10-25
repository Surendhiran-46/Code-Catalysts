// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Typography, TextField, Button, Grid, Paper, Alert, Card, CardContent } from '@mui/material';
// import { FaWater, FaBolt, FaRecycle, FaTree } from 'react-icons/fa';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';  // Import Bar chart
// import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// import envidataVideo from '../assests/envidata.mp4';  // Importing video from assets folder

// // Register Chart.js components
// Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// function DataEntry() {
//   const [data, setData] = useState({
//     projectName: '',
//     energyConsumption: '',
//     carbonEmissions: '',
//     waterUsage: '',
//     wasteGenerated: '',
//   });

//   const [carbonEstimate, setCarbonEstimate] = useState(null);  // Store the CO2 estimate
//   const [isSubmitted, setIsSubmitted] = useState(false);  // Track form submission
//   const [error, setError] = useState('');  // Track errors
//   const chartInstance = useRef(null);  // Chart instance to persist across renders

//   // Handle form data change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send the environmental data to your internal API
//       const response = await axios.post('http://localhost:5000/api/calculate-co2', {
//         energyConsumption: data.energyConsumption,
//         carbonEmissions: data.carbonEmissions,
//         waterUsage: data.waterUsage,
//         wasteGenerated: data.wasteGenerated
//       });

//       // Store the full analysis report from the backend
//       setCarbonEstimate(response.data);
//       setIsSubmitted(true);
//       setError('');
//     } catch (err) {
//       setError('Failed to process environmental data');
//       setIsSubmitted(false);
//     }
//   };

//   // Data for Bar Chart
//   const chartData = {
//     labels: ['Energy Consumption (kWh)', 'Carbon Emissions (kg CO2)', 'Water Usage (liters)', 'Waste Generated (kg)'],
//     datasets: [
//       {
//         label: 'Environmental Impact',
//         data: [
//           data.energyConsumption || 0,
//           data.carbonEmissions || 0,
//           data.waterUsage || 0,
//           data.wasteGenerated || 0,
//         ],
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//           'rgba(255, 99, 132, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for Bar Chart
//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   useEffect(() => {
//     const currentChartInstance = chartInstance.current;
  
//     // Cleanup chart instance when component unmounts
//     return () => {
//       if (currentChartInstance) {
//         currentChartInstance.destroy();
//       }
//     };
//   }, []);
  

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         minHeight: '100vh',
//         position: 'relative',
//       }}
//     >
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           zIndex: -1,
//         }}
//       >
//         <source src={envidataVideo} type="video/mp4" />
//       </video>

//       <Paper
//         sx={{
//           padding: 4,
//           maxWidth: '600px',
//           margin: '0 auto',
//           backgroundColor: '#f9f9f9',  // Light gray background
//           borderRadius: 3,  // Rounded corners
//           boxShadow: 6,  // Deeper shadow
//           zIndex: 1,
//         }}
//       >
//         <Typography
//           variant="h3"
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             color: 'black',
//             marginBottom: 4,
//             textAlign: 'center',  // Centered title
//           }}
//         >
//           Environmental Data
//         </Typography>

//         {/* Display success message and CO2 estimate if form submitted */}
//         {isSubmitted && carbonEstimate && (
//           <Alert severity="success" sx={{ mb: 4 }}>
//             Data Submitted Successfully!
//           </Alert>
//         )}

//         {/* Error message */}
//         {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Project Name"
//                 variant="outlined"
//                 fullWidth
//                 type="text"
//                 name="projectName"
//                 value={data.projectName}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   borderRadius: 2,  // Rounded TextField corners
//                   '& .MuiInputBase-root': {
//                     padding: '10px',  // Increased padding inside input fields
//                   }
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   required: false,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Energy Consumption (kWh)"
//                 variant="outlined"
//                 fullWidth
//                 name="energyConsumption"
//                 value={data.energyConsumption}
//                 onChange={handleChange}
//                 type="number"
//                 required
//                 sx={{
//                   borderRadius: 2,
//                   '& .MuiInputBase-root': {
//                     padding: '10px',
//                   }
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   required: false,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Carbon Emissions (kg CO2)"
//                 variant="outlined"
//                 fullWidth
//                 name="carbonEmissions"
//                 value={data.carbonEmissions}
//                 onChange={handleChange}
//                 type="number"
//                 required
//                 sx={{
//                   borderRadius: 2,
//                   '& .MuiInputBase-root': {
//                     padding: '10px',
//                   }
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   required: false,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Water Usage (liters)"
//                 variant="outlined"
//                 fullWidth
//                 name="waterUsage"
//                 value={data.waterUsage}
//                 onChange={handleChange}
//                 type="number"
//                 required
//                 sx={{
//                   borderRadius: 2,
//                   '& .MuiInputBase-root': {
//                     padding: '10px',
//                   }
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   required: false,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Waste Generated (kg)"
//                 variant="outlined"
//                 fullWidth
//                 name="wasteGenerated"
//                 value={data.wasteGenerated}
//                 onChange={handleChange}
//                 type="number"
//                 required
//                 sx={{
//                   borderRadius: 2,
//                   '& .MuiInputBase-root': {
//                     padding: '10px',
//                   }
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   required: false,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 fullWidth
//                 sx={{
//                   backgroundColor: '#4caf50',
//                   '&:hover': {
//                     backgroundColor: '#388e3c',
//                   },
//                   borderRadius: 2,  // Rounded corners for button
//                   padding: '12px',  // Increased padding for the button
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Submit Data
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>

//       {isSubmitted && carbonEstimate && (
//         <>
//           <Card sx={{ marginBottom: 3 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
//                 <FaBolt /> Energy Consumption
//               </Typography>
//               <Typography variant="body1">
//                 Your project consumed {data.energyConsumption} kWh of energy, which is equivalent to{' '}
//                 {carbonEstimate.co2Estimate} kg of CO2 emissions.
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
//                 {carbonEstimate.recommendations.energyEfficiency}
//               </Typography>
//             </CardContent>
//           </Card>

//           <Card sx={{ marginBottom: 3 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
//                 <FaWater /> Water Usage
//               </Typography>
//               <Typography variant="body1">
//                 Your project used {data.waterUsage} liters of water, which is equivalent to{' '}
//                 {carbonEstimate.waterUsageEquivalent} showers.
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
//                 {carbonEstimate.recommendations.waterConservation}
//               </Typography>
//             </CardContent>
//           </Card>

//           <Card sx={{ marginBottom: 3 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
//                 <FaRecycle /> Waste Generated
//               </Typography>
//               <Typography variant="body1">
//                 Your project generated {data.wasteGenerated} kg of waste, of which{' '}
//                 {carbonEstimate.wasteRecyclingPotential} kg can be recycled.
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
//                 {carbonEstimate.recommendations.wasteManagement}
//               </Typography>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
//                 <FaTree /> CO2 Emissions Analysis
//               </Typography>
//               <Typography variant="body1">
//                 Your project’s energy consumption results in {carbonEstimate.co2Estimate} kg of CO2 emissions,
//                 which is equivalent to driving {carbonEstimate.carKmEquivalent} km.
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
//                 {carbonEstimate.recommendations.co2Reduction}
//               </Typography>
//             </CardContent>
//           </Card>
//           <Box sx={{ maxWidth: '800px', margin: '30px auto', padding: 4 ,backgroundColor:'white'}}>
//             <Card sx={{ mb: 3 }}>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom>CO2 Estimate</Typography>
//                 <Typography variant="body1">Carbon Dioxide Estimate: {carbonEstimate.co2Estimate} kg CO2</Typography>
//                 <Typography variant="body1">Your data shows a total energy consumption of {data.energyConsumption} kWh, carbon emissions of {data.carbonEmissions} kg CO2, water usage of {data.waterUsage} liters, and waste generated at {data.wasteGenerated} kg.</Typography>
//               </CardContent>
//             </Card>
//             {/* Bar Chart to represent environmental data */}
//             <Bar data={chartData} options={chartOptions} ref={chartInstance} />
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// }

// export default DataEntry;


import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert, Card, CardContent } from '@mui/material';
import { FaWater, FaBolt, FaRecycle, FaTree } from 'react-icons/fa';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';  // Import Bar chart
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import envidataVideo from '../assests/envidata.mp4';  // Importing video from assets folder
import './style.css'
import Navbar from './NavBar';


// // Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
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
  const chartInstance = useRef(null);  // Chart instance to persist across renders

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
        projectName: data.projectName,
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

  
  // Data for Bar Chart
  const chartData = {
    labels: ['Energy Consumption (kWh)', 'Water Usage (liters)', 'Waste Generated (kg)'],
    datasets: [
      {
        label: 'Environmental Impact' ,
        data: [
          data.energyConsumption || 0,
          data.waterUsage || 0,
          data.wasteGenerated || 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar Chart
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const currentChartInstance = chartInstance.current;
  
    // Cleanup chart instance when component unmounts
    return () => {
      if (currentChartInstance) {
        currentChartInstance.destroy();
      }
    };
  }, []);
  


  return (
    <>
    <Navbar />
    <Box
      sx={{
        padding: 4,
        minHeight: '100vh',
        position: 'relative',
        marginTop : '60px'
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={envidataVideo} type="video/mp4" />
      </video>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={envidataVideo} type="video/mp4" />
      </video>

      <Paper
        sx={{
          padding: 4,
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#f9f9f9',  // Light gray background
          borderRadius: 3,  // Rounded corners
          boxShadow: 6,  // Deeper shadow
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 4,
            textAlign: 'center',  // Centered title
          }}
        >
          Environmental Data
        </Typography>

        {/* Display success message and CO2 estimate if form submitted */}
        {isSubmitted && carbonEstimate && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Data Submitted Successfully!
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
                sx={{
                  borderRadius: 2,  // Rounded TextField corners
                  '& .MuiInputBase-root': {
                    padding: '10px',  // Increased padding inside input fields
                  }
                }}
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
                sx={{
                  borderRadius: 2,
                  '& .MuiInputBase-root': {
                    padding: '10px',
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                  required: false,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                label="Carbon Emissions (kg CO2)"
                variant="outlined"
                fullWidth
                name="carbonEmissions"
                value={data.carbonEmissions}
                onChange={handleChange}
                type="number"
                required
                sx={{
                  borderRadius: 2,
                  '& .MuiInputBase-root': {
                    padding: '10px',
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                  required: false,
                }}
              /> */}
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
                sx={{
                  borderRadius: 2,
                  '& .MuiInputBase-root': {
                    padding: '10px',
                  }
                }}
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
                sx={{
                  borderRadius: 2,
                  '& .MuiInputBase-root': {
                    padding: '10px',
                  }
                }}
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
                  borderRadius: 2,  // Rounded corners for button
                  padding: '12px',  // Increased padding for the button
                  fontWeight: 'bold',
                }}
              >
                Submit Data
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Display the results in a visually appealing way */}

      {/* Display the results in a visually appealing way */}
      {isSubmitted && carbonEstimate && (
        <Box sx={{ maxWidth: '800px', margin: '30px auto', padding: 3 }}>
          <Typography variant="h5" color = "white" sx={{ fontWeight: 'bold', marginBottom: 2,font:'white' }}>
            Environmental Impact Report for {data.projectName}
          </Typography>

          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                <FaBolt /> Energy Consumption
              </Typography>
              <Typography variant="body1">
                Your project consumed {data.energyConsumption} kWh of energy, which is equivalent to{' '}
                {carbonEstimate.co2Estimate} kg of CO2 emissions.
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
                {carbonEstimate.recommendations.energyEfficiency}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                <FaWater /> Water Usage
              </Typography>
              <Typography variant="body1">
                Your project used {data.waterUsage} liters of water, which is equivalent to{' '}
                {carbonEstimate.waterUsageEquivalent} showers.
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
                {carbonEstimate.recommendations.waterConservation}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ marginBottom: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                <FaRecycle /> Waste Generated
              </Typography>
              <Typography variant="body1">
                Your project generated {data.wasteGenerated} kg of waste, of which{' '}
                {carbonEstimate.wasteRecyclingPotential} kg can be recycled.
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
                {carbonEstimate.recommendations.wasteManagement}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                <FaTree /> CO2 Emissions Analysis
              </Typography>
              <Typography variant="body1">
                Your project’s energy consumption results in {carbonEstimate.co2Estimate} kg of CO2 emissions,
                which is equivalent to driving {carbonEstimate.carKmEquivalent} km.
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
                {carbonEstimate.recommendations.co2Reduction}
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ maxWidth: '800px', margin: '30px auto', padding: 4 ,backgroundColor:'white'}}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>CO2 Estimate</Typography>
                <Typography variant="body1">Carbon Dioxide Estimate: {carbonEstimate.co2Estimate} kg CO2</Typography>
                <Typography variant="body1">Your data shows a total energy consumption of {data.energyConsumption} kWh, water usage of {data.waterUsage} liters, and waste generated at {data.wasteGenerated} kg.</Typography>
              </CardContent>
            </Card>
            {/* Bar Chart to represent environmental data */}
            <Bar data={chartData} options={chartOptions} ref={chartInstance} />
          </Box>
        </Box>
      )}
    </Box>
    </>
  );
}

export default DataEntry;

