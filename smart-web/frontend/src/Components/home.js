import React, { useState } from 'react';
// import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../Components/header.js';
import Results from '../Components/results.js';
import Footer from '../Components/footer.js';
import Recents from '../Components/recents.js';
import Login from '../Components/login.js';
import '../App.css';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recentSearches, setRecentSearches] = useState([]);



  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search/${encodeURIComponent(query)}/?page=${currentPage}`);
      setResults(response.data.results);
      setTotalPages(response.data.total_pages);

      setRecentSearches((prevSearches) => [
        {
          id: prevSearches.length + 1,
          query,
          timestamp: new Date(),
        },
        ...prevSearches,
      ]);

      await axios.post(await axios.get(`http://localhost:8000/api/search_history/?email=${localStorage.getItem('email')}`));
    } catch (error) {
      console.error('Error fetching search results:', error.response.data);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSearch();
  };

  return (
   <div>
    {localStorage.getItem('access_token')==null?
    <div className="Home">
    <Login/>
    </div>:
    <div className="Home">
     
      <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
      
      
      <div className="main">
        <Results results={results} query={query}/>
        {results.length > 0 && 
          <Footer currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        }
        <Recents handleSearch={handleSearch} recentSearches={recentSearches} />
      </div>

     </div>}
     </div>
  );
}

export default Home;




