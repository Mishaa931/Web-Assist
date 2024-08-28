// frontend/src/Components/Login.js
import './css/Login.css';
import logo from '../img/webassist-logo.png'
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";




const Login = ({ query, setQuery, handleSearch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useNavigate();
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Fetch request for authentication
      fetch('http://localhost:8000/login_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Authentication failed');
          }
        })
        .then((body) => {
          console.log(body.access_token);
          localStorage.setItem('access_token', body.access_token);
          localStorage.setItem('email', username);
          localStorage.setItem('login', true);
          Swal.fire({
            title: 'Login',
            type: 'success',
            text: 'Successfully Login',
            icon: 'success',
          });
          history('/');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Authentication failed!',
          });
        });
    };
  return (
    <div >
      {/* Sign In Form */}
      <div className="Auth-form-container">
        <form onSubmit={handleSubmit} className="Auth-form" id="signinForm">
          <div className="Auth-form-content">
            <div className="Auth-form-title">
              <h1>Welcome back</h1>
              <div className="text-center">
                <h2>
                  Not registered yet?{' '}
                  <span className="link-primary">
                    <a href="/signup">Sign Up</a>
                  </span>
                </h2>
              </div>
            </div>
            <div className="input-group form-group mt-3">
              <legend>Email Address</legend>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group form-group mt-3">
              <legend>Password</legend>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit form-group">
              Continue
            </button>
            <p className="mt-2">
              <a href="/reset">Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
      {/* Sign In Form */}
    </div>
  );
};

export default Login;
