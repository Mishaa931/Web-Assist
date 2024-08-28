// frontend/src/Components/auth.js
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export const signup = async (fullName, email, password, setIsAuthenticated) => {
  try { 
    await axios.post('http://localhost:8000/api/signup/', {
      fullName: fullName,
      email: email,
      password: password,
    }).then(response => {
      if (response.status === 200){
        NotificationManager.success('Sign-up success', 'Success', undefined, true);
        localStorage.setItem('authToken', response.data.token);
        setIsAuthenticated(true);
      }
    });
  } 
  catch (error) {
    console.error('Sign-up error:', error.response.data);
    if (error.response && error.response.status === 400 && error.response.data.error === 'Email is already registered') {
      NotificationManager.error('User with this email already exists. Please use a different email or log in.', 'Error');
    } else {
      NotificationManager.error('An error occurred during sign-up. Please try again later.', 'Error');
    }
  }
};

export const login = async (email, password, setIsAuthenticated) => {
  try {
    await axios.post('http://localhost:8000/api/login/', {
      email: email,
      password: password,
    }).then(response => {
      if (response.status === 200){
        NotificationManager.success('Login success', 'Success', undefined, true); 
        localStorage.setItem('authToken', response.data.token);
        setIsAuthenticated(true);    
      }
    });
  }
  catch (error) {
    console.error('Login error:', error.response.data);
    if (error.response && error.response.status === 400 && error.response.data.error === 'Invalid credentials') {
      NotificationManager.error('Invalid credentials. Please check your email and password.', 'Error');
    } else {
      NotificationManager.error('An error occurred during login. Please try again later.', 'Error');
    }
  }
};