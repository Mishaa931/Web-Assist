import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Recents = ({ handleSearch, logout }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch search history when the component mounts
    fetchSearchHistory();
  }, []);

  logout=()=>{
    console.log('logout');
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      text: 'Are you sure you want to Logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('access_token');
        window.location.reload();
      }
    });
  }

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search_history/?email=${localStorage.getItem('email')}`);
      setSearchHistory(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching search history:', error.response.data);
    }
  };

  const getDaysDifference = (timestamp) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const currentDate = new Date();
    const searchDate = new Date(timestamp);

    const daysDifference = Math.round(Math.abs((currentDate - searchDate) / oneDay));

    return daysDifference;
  };

  const categorizeSearch = (daysDifference, timestamp) => {
    if (daysDifference === 0) {
      return 'Today';
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else if (daysDifference <= 7) {
      return 'Previous 7 Days';
    } else if (daysDifference <= 30) {
      return 'Previous 30 Days';
    } else if (daysDifference <= 365) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex =  Math.floor(daysDifference / 30);
      return months[monthIndex];
    } else {
      return new Date(timestamp).getFullYear().toString(); // Display the full year
    }
  };

  const handleSearchClick = (query) => {
    handleSearch(query);
  };

  const logoutClick = (query) => {
    logout();
  };

  

  return (
    <div className="recents-panel">
      <h3>Recents</h3><button onClick={logoutClick} className="logout-button">Logout</button>
      <Link to="/history">
      <button  className="check-history-button">

        {/* Replace 'your-icon-class' with your actual icon class */}
        <span className="your-icon-class"></span> Check History
      </button>
      </Link>
      {['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Older'].map((category) => {
        const searchesForCategory = searchHistory.filter((search) => {
          const { timestamp } = search;
          const daysDifference = getDaysDifference(timestamp);
          const searchCategory = categorizeSearch(daysDifference, timestamp);
          return searchCategory === category;
        });

        if (searchesForCategory.length > 0) {
          return (
            <div key={category}>
              <h4>{category}</h4>
             
              <ul>
                {searchesForCategory.map((search) => (
                  <li key={search.id} onClick={() => handleSearchClick(search.query)}>
                   {search.query} <br />
                 <a href={search.link} target="_blank" rel="noopener noreferrer" className="light-link">{search.link} </a> <br />
                 
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return null;
      })}
      
    </div>
  );
};

export default Recents;
