import React from "react";
import { Link } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import logoSrc from "../assests/ecoscope.png"; // Ensure correct path
import './style.css'


function Navbar() {

  return (
    <div className="home">
    <header
      className="navbar"
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "1000",
        backgroundColor: "white",
        borderBottom: "5px solid transparent",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px 2px green",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        boxSizing: "border-box",
      }}
    >
      <div className="logo">
        <img src={logoSrc} alt="ecoScope Logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <Link to="/Home" className="nav-item">HOME</Link>
        <Link to="/suggestion" className="nav-item">SUGGESTIONS</Link>
        <Link to="/data-entry" className="nav-item">DATA ENTRY</Link>
        <IconButton component={Link} to="/profile" sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: "grey" }}></Avatar>
        </IconButton>
      </nav>
    </header>
    <style>{`
        .nav-item{
            overflow : hidden;
        }
    `}</style>
    </div>
  );
}

export default Navbar;
