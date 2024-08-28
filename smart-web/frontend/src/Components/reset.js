// frontend/src/Components/ResetPassword.js
import './css/reset.css';
import logo from '../img/webassist-logo.png'
import React, { useState } from 'react';
import Swal from 'sweetalert2';


const ResetPassword = ({ query, setQuery, handleSearch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Fetch request for authentication
      fetch('http://localhost:8000/reset-password//', {
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
          localStorage.setItem('ResetPassword', true);
          Swal.fire({
            title: 'ResetPassword',
            type: 'success',
            text: 'Successfully ResetPassword',
            icon: 'success',
          });
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
              <h1>Forgot your password?</h1>
              <div className="text-center">
            
                
                 
           
                <div class="text-center">
            Enter the email address associated with your account 
            and we'll send you an email with instructions to reset your password.
        </div>
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
            
       
            <button type="submit" className="submit form-group">
            Reset Password
            </button>
           
          </div>
        </form>
      </div>
      {/* Sign In Form */}
    </div>
  );
};

export default ResetPassword;
