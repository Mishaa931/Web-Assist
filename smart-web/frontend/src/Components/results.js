import React from 'react';
import axios from 'axios';
const Results = ({ results, query,onItemClick }) => {
  const handleItemClick = (result) => {
    console.log('hello')

    // Perform your desired function with the clicked result
    // console.log('Item clicked:', result);
    // You can call the provided onItemClick function if it's passed as a prop
    // if (onItemClick) {
    //   onItemClick(result);
    console.log(query)
      axios.post('http://localhost:8000/createsearchhistory/',{
      link: result.url,//this.state.credentials.empname,
      query: query,
      email: localStorage.getItem('email'),//this.state.credentials.email,
      
    })
      .then(response => {
        console.log('**********')
        console.log(response)
        if (response.status == 201) {
          // window.location.reload();

                 }



      })
      .catch(error => {
        console.error('There was an error!', error);
      });
   
  };

  return (
   
    <div className="results">
      <ul>
        {results.map((result, index) => (
          <li key={index} onClick={() => handleItemClick(result)}>
            <div id="r1" className="wrapper">
              <div className="iconContainer">
                <img src={result.icon} className="siteicon" alt='' />
              </div>
              <div className="textContainer">
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="site">{result.site}</a>
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="link">{result.sitelink}</a>
              </div>
            </div>
            <div className="r2">
              <a href={result.url} target="_blank" rel="noopener noreferrer" className="title">{result.title}</a>
              <p className="text">{result.snippet}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
