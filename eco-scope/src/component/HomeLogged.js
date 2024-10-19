
import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import videoSrc from '../assests/environ.mp4';
import logoSrc from '../assests/ecoscope.png'; // Importing the logo
import { Avatar, IconButton } from '@mui/material';
import './style.css'


function Home() {
  // Scroll to the About section when the "ABOUT" link is clicked
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="home">
      {/* Navbar */}
      <header className="navbar" style={{ 
        position: 'fixed', 
        top: '0', 
        width: '100%', 
        zIndex: '1000', 
        backgroundColor: 'white', 
        borderBottom: '5px solid transparent',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px 2px green',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 20px',
        boxSizing: 'border-box'
      }}>
        <div className="logo">
          <img src={logoSrc} alt="ecoScope Logo" className="logo-img" /> {/* Logo Image */}
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-item">HOME</Link> {/* Home link */}
          <button onClick={scrollToAbout} className="nav-item">ABOUT</button> {/* About button */}
          <IconButton component={Link} to="/profile" sx={{ p: 0 }}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar> {/* 'S' for example */}
        </IconButton>
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>Services</h2>
        <div className="goal-boxes">
          <Link to="/data-entry" className="goal-box"> {/* Link to Data Entry Page */}
            <h3>Data Entry</h3>
            <p>Track and input data for sustainability metrics.</p>
          </Link>
          <div className="goal-box">
            <h3>Flowchart</h3>
            <p>Visualize processes and their environmental impact.</p>
          </div>
          <Link to="/suggestion" className="goal-box"> {/* Link to Suggestions Page */}
            <h3>Suggestions</h3>
            <p>Get personalized recommendations for improvement.</p>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2>What Do People Think About Us?</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"EcoScope has revolutionized how our company tracks its carbon footprint. It's incredibly easy to use!"</p>
            <h4>- John Doe, CEO of GreenTech</h4>
          </div>
          <div className="testimonial-card">
            <p>"The data visualization tools are phenomenal. Our sustainability reports are clearer than ever before."</p>
            <h4>- Jane Smith, Sustainability Officer at EcoWorld</h4>
          </div>
          <div className="testimonial-card">
            <p>"Thanks to EcoScope, we've identified key areas where we can improve our environmental impact."</p>
            <h4>- Mark Brown, Operations Manager at EarthCo</h4>
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
            gap: 20px; /* Spacing between each item */
            align-items: center; /* Ensure all items are vertically aligned */
            justify-content: center; /* Center the items horizontally */
          }

          .nav-links a, .nav-links button {
            color: #00a676;
            font-size: 16px;
            border: none;
            background: none;
            cursor: pointer;
            padding: 10px; /* Add padding for better clickability */
            display: inline-flex; /* Ensure items are treated as inline elements */
            align-items: center;
            justify-content: center;
          }

          .nav-links a:hover, .nav-links button:hover {
            color: #fff; /* Optional: Change color on hover */
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
            box-shadow: 0 0 20px rgba(0, 166, 118, 0.8);
          }

          .goal-box h3 {
            font-size: 24px;
            color: #006400;
            margin-bottom: 15px;
            font-weight: bold;
          }

          .goal-box p {
            font-size: 16px;
            color: #555;
          }

        `}
      </style>
    </div>
  );
}

export default Home;


