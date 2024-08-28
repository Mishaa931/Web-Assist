import React, { useState } from 'react';
// import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './Components/header.js';
import Results from './Components/results.js';
import Footer from './Components/footer.js';
import Recents from './Components/recents.js';
import HistoryPage from './Components/history.js';
import ResetPassword from './Components/reset.js';
import GetStarted from './Components/welcome.js';


import Login from './Components/login.js';
import SignUpPage from './Components/signup.js';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,

} from 'react-router-dom';

function App() {
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

 <BrowserRouter>
       <Routes>
       {localStorage.getItem('access_token')==null?
                <Route path='/' element={<GetStarted/>}/>            
                 :               
                  <Route path='/' element={ <div className="App">
     
                  <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
                  
                  
                  <div className="main">
                    <Results results={results} query={query}/>
                    {results.length > 0 && 
                      <Footer currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                    }
                    <Recents handleSearch={handleSearch} recentSearches={recentSearches} />
                  </div>
            
                 </div>}/>}
        {/* <Route path='/signup' element={<Signup/>}/> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/history' element={<HistoryPage/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
        <Route path='/welcome' element={<GetStarted/>}/>
      </Routes>
    </BrowserRouter>
   
     </div>
  );
}

export default App;






