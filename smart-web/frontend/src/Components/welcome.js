// Import necessary React components and styles
import React from 'react';
import { Link } from 'react-router-dom';
import './css/GetStarted.css';
import logo from '../img/webassist-logo.png';

// GetStarted component
const GetStarted = () => {
  return (
    <div className="get-started-container">
      {/* Logo */}
      <img src={logo} width={100} height={100} alt="Logo" className="logo" />

      {/* Get Started Heading with Animation */}
      <h1 className="get-started-heading">Welcome to WebAssist</h1>

      {/* Subheading */}
      <p className="subheading">Your Ultimate Web Companion</p>

      {/* Buttons with Animation */}
      <div className="button-container">
        {/* Login Button */}
        <Link to="/login" className="login-button">
          Login
        </Link>

        {/* Sign Up Button */}
        <Link to="/signup" className="signup-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
