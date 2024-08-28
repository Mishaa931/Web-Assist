// src/Components/loadingscreen.js
import ReactLoading from 'react-loading';
import './css/loadingscreen.css';
import React from 'react';

// Rest of your code...


function LoadingScreen() {
  return (
    <div className="loading-screen">
      <ReactLoading type="spinningBubbles" color="#031C30" height={80} width={80} />
    </div>
  );
}

export default LoadingScreen;
