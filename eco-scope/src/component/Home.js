// import React from 'react';
// import { AppBar, Toolbar, Button, Box, Typography, Card, CardContent, Grid } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { keyframes } from '@mui/system';
// import ecoscopeLogo from '../assests/ecoscope.png';
// import enviImage from '../assests/envi.jpeg';

// // Define the background gradient animation with green shades (similar to the logo)
// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// // Define fade-in animation for text
// const fadeIn = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateY(20px); 
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0); 
//   }
// `;

// // Define sliding-in animation from the left
// const slideInFromLeft = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateX(-50px); 
//   }
//   100% {
//     opacity: 1;
//     transform: translateX(0); 
//   }
// `;

// function Home() {
//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${enviImage})`, 
//         backgroundSize: 'cover',
//         backgroundPosition: 'center', 
//         height: '100vh',
//         animation: `${gradientAnimation} 10s ease infinite`,
//       }}
//     >
//       {/* Navbar */}
//       <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #000000, #434343)', boxShadow: 'none', padding: '10px 30px' }}>
//         <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
//             <img src={ecoscopeLogo} alt="EcoScope Logo" height="50" />
//           </Box>
//           <Box>
//             <Button color="inherit" component={Link} to="/login" sx={{ borderRadius: '20px', margin: '0 10px', padding: '8px 16px' }}>
//               Login
//             </Button>
//             <Button color="inherit" component={Link} to="/register" sx={{ borderRadius: '20px', margin: '0 10px', padding: '8px 16px' }}>
//               Register
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" minHeight="calc(100vh - 64px)" textAlign="left" color="black" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 4, borderRadius: 2 }}>
//         <Typography variant="h3" gutterBottom sx={{ animation: `${fadeIn} 2s ease-out`, marginBottom: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 700, color: 'white' }}>
//           Sustainable Future
//         </Typography>
//         <Typography variant="h6" color="white" gutterBottom sx={{ animation: `${slideInFromLeft} 3s ease-out`, marginBottom: 2, fontFamily: '"Lora", serif', fontWeight: 500 }}>
//           Aligning Corporate Sustainability Initiatives
//         </Typography>
//         <Typography variant="body1" color="white" paragraph sx={{ animation: `${fadeIn} 4s ease-out`, marginBottom: 2, fontFamily: '"Roboto", sans-serif', fontWeight: 400, fontSize: '1.2rem' }}>
//           Track your organization’s environmental footprint and ensure alignment with your sustainability goals.
//         </Typography>
//       </Box>

//       {/* Additional Boxes */}
//       <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, padding: 4 }}>
//         <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Data Entry</Typography>
//             <Typography variant="body2">Enter your organization's environmental data such as energy consumption, carbon emissions, and more.</Typography>
//             <Button variant="contained" color="primary" component={Link} to="/login" sx={{ marginTop: 2 }}>
//               Add Data
//             </Button>
//           </CardContent>
//         </Card>

//         <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Report Generation</Typography>
//             <Typography variant="body2">Generate comprehensive sustainability reports based on the data you have entered.</Typography>
//             <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Generate Report</Button>
//           </CardContent>
//         </Card>

//         <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Flowchart Display</Typography>
//             <Typography variant="body2">Visualize the flow of sustainability metrics and organizational processes through interactive charts.</Typography>
//             <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>View Flowchart</Button>
//           </CardContent>
//         </Card>

//         <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Suggestions</Typography>
//             <Typography variant="body2">Get personalized sustainability suggestions based on your organization's data and goals.</Typography>
//             <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Get Suggestions</Button>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Footer Section */}
//       <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: 6, textAlign: 'center', marginTop: 4 }}>
//         <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>About EcoScope</Typography>
//         <Typography variant="body1" sx={{ marginBottom: 3 }}>
//           EcoScope is dedicated to helping organizations track and reduce their environmental footprint through comprehensive data collection, analysis, and reporting tools.
//         </Typography>
//         <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Services We Provide</Typography>
//         <Grid container spacing={4} justifyContent="center">
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Data Entry & Tracking</Typography>
//             <Typography variant="body2">Easy data entry and tracking for all your sustainability metrics.</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Report Generation</Typography>
//             <Typography variant="body2">Generate detailed sustainability reports based on your data.</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Flowchart Visualization</Typography>
//             <Typography variant="body2">Visualize the flow of your sustainability data through dynamic flowcharts.</Typography>
//           </Grid>
//         </Grid>

//         <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 4, marginBottom: 2 }}>Contact Us</Typography>
//         <Typography variant="body1">
//           For more information, reach out to us at: <br />
//           Email: info@ecoscope.com <br />
//           Phone: +123 456 7890
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default Home;
import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import videoSrc from '../assests/environ.mp4';
import logoSrc from '../assests/ecoscope.png'; // Importing the logo
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import icons

function Home() {
  // Scroll to the About section when the "ABOUT" link is clicked
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={logoSrc} alt="ecoScope Logo" className="logo-img" /> {/* Logo Image */}
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-item">HOME</Link> {/* Home link */}
          <button onClick={scrollToAbout} className="nav-item">ABOUT</button> {/* About button */}
          <Link to="/login" className="nav-item">LOGIN <FaSignInAlt className="nav-icon" /></Link> {/* Login link */}
          <Link to="/register" className="nav-item">REGISTER <FaUserPlus className="nav-icon" /></Link> {/* Register link */}
        </nav>
      </header>

      {/* Background Video */}
      <section id="home" className="hero">
        <video autoPlay loop muted className="background-video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content">
          <h1 className="welcome-heading">Welcome To EcoScope</h1>
          <p className="welcome-text">Your platform to track, reduce, and report environmental impact.</p>
          <br />
          <div className="cta-buttons">
            <Link to="/register" className="cta-btn">Get Started</Link> {/* Get Started Button */}
          </div>
        </div>
      </section>

      {/* About Section: Goals */}
      <section id="about" className="about">
        <h2>Goals</h2>
        <div className="goal-boxes">
          <Link to="/data-entry" className="goal-box"> {/* Link to Data Entry Page */}
            <h3>Data Entry</h3>
            <p>Track and input data for sustainability metrics.</p>
          </Link>
          <div className="goal-box">
            <h3>Flowchart</h3>
            <p>Visualize processes and their environmental impact.</p>
          </div>
          <div className="goal-box">
            <h3>Suggestions</h3>
            <p>Get personalized recommendations for improvement.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or need more information, feel free to reach out to us!</p>

        <div className="contact-details">
          
            <h3>Contact</h3>
            <p>Email: <a href="mailto:contact@ecoscope.com">contact@ecoscope.com</a></p>
            <p>Phone: +1 234 567 890</p>
          
        </div>
      </section>

      {/* CSS Styling (Inline) */}
      <style>
        {`
          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* General styles */
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: white;
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          .home {
            display: flex;
            flex-direction: column;
          }

          /* Navbar Styling */
          .navbar {
            background: linear-gradient(90deg, #000000, #333333);
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0px 4px 10px rgba(0, 255, 0, 0.6);
            border: 2px solid #006400;
          }

          .logo-img {
            height: 40px;
          }

          .nav-links {
            display: flex;
            gap: 30px;
          }

          .nav-links a, .nav-links button {
            color: #00a676;
            font-size: 16px;
            border: none;
            background: none;
            cursor: pointer;
          }

          /* Hero Section */
          .hero {
            position: relative;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            color: white;
          }

          .background-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
          }

          .hero-content {
            animation: slide-up 1s ease-out;
          }

          /* Slide-up transition for the "Welcome to EcoScope" heading */
          @keyframes slide-up {
            0% {
              transform: translateY(100px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .welcome-heading {
            font-size: 48px;
            margin-bottom: 20px;
          }

          .welcome-text {
            font-size: 20px;
            margin-bottom: 20px;
            animation: slide-side 1s ease-out;
          }

          /* Side transition for the text below */
          @keyframes slide-side {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .cta-btn {
            background-color: #fff;
            color: #00a676;
            padding: 15px 40px;
            border-radius: 5px;
            font-size: 18px;
            transition: background-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
            border: 2px solid rgba(255, 255, 0, 0.8);
            box-shadow: 0 0 10px rgba(255, 255, 0, 0.6);
          }

          /* Gradient green background on hover */
          .cta-btn:hover,
          .cta-btn:focus {
            background: linear-gradient(135deg, #00a676, #006400); /* Gradient green color */
            color: white;
            box-shadow: 0 0 20px rgba(255, 255, 0, 0.9);
          }

          /* About Section Styling */
          .about {
            padding: 70px 30px;
            text-align: center;
            color: white;
            position: relative;
            margin-top: 10px;
          }

          .about h2 {
            font-size: 36px;
            color: #00a676;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0, 166, 118, 0.4);
            font-weight: bold;
          }

          .goal-boxes {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
          }

          .goal-box {
            background-color: #fff;
            padding: 30px;
            width: 22%;
            border: 2px solid #00a676;
            border-radius: 10px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            color: #333;
          }

          .goal-box:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(0, 166, 118, 0.6);
          }

          .goal-box h3 {
            font-size: 24px;
            color: #00a676;
            margin-bottom: 15px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .goal-box p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            font-style: italic;
          }

          /* Contact Section Styling */
          .contact {
            background: linear-gradient(135deg, #006400, #004d00); /* Dark green gradient */
            color: white;
            text-align: center;
            padding: 30px 20px;  /* Reduced padding */
            height: auto;
          }

          .contact h2 {
            font-size: 30px; /* Reduced size for smaller heading */
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: bold;
          }

          .contact p {
            font-size: 16px; /* Smaller font size */
            margin-bottom: 10px;
          }

          .contact-details {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 20px;
          }

          .contact-section {
            background-color: #ffffff;
            color: #333;
            padding: 15px;  /* Reduced padding */
            border-radius: 8px;
            width: 250px; /* Adjusted width to be smaller */
          }

          .contact-section h3 {
            font-size: 20px;
            color: #006400;
            margin-bottom: 10px;
          }

          .contact-details a {
            color: #fff;
            font-weight: bold;
            text-decoration: underline;
          }

          .contact-details a:hover {
            color: #00a676;
          }
        `}
      </style>
    </div>
  );
}

export default Home;

