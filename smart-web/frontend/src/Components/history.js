// HistoryPage.js
import './css/history.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch search history when the component mounts
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search_history/?email=${localStorage.getItem('email')}`);
      setSearchHistory(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching search history:', error.response.data);
    }
  };

  return (
    <div className="history-container">
      <h1>Browser History <div className="history-icon" onClick={() => console.log('Show history')}>
        {/* Add your history icon here */}
        🕒
      </div></h1>
      <ul className="history-list">
        {searchHistory.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const HistoryItem = ({ item }) => {
  return (
    <li className="history-item">
      <div className="history-item-info">
        <h3>{item.query}</h3>
        <p className="link"><a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
      </div>
      <div className="history-item-timestamp">
        {item.timestamp.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
      </div>
    </li>
  );
};

export default HistoryPage;
