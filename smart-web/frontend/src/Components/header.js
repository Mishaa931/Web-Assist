// frontend/src/Components/Header.js
import './css/header.css';
import logo from '../img/webassist-logo.png'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faTimes, faFilter, faPencil} from '@fortawesome/free-solid-svg-icons';

const Header = ({ query, setQuery, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearQuery = () => {
    setQuery('');
    setSearchIconVisible(false);
  };

  const [isNavbar, setIsNavbar] = useState(false);
  const [searchIconVisible, setSearchIconVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 6 * 16;
      setIsNavbar(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header${isNavbar ? ' navbar show' : ''}`}>
      <img src={logo} width={60} height={10} alt='WebAssist'></img>
      <div
        className="search-bar"
        onFocus={() => {
          setSearchIconVisible(true);
          document.querySelector('.search-bar').classList.add('focused');
        }}
        onBlur={() => {
          setSearchIconVisible(query !== '');
          document.querySelector('.search-bar').classList.remove('focused');
        }}
      >
        {searchIconVisible && (
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        )}
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {query && (
          <>
            <button onClick={handleClearQuery}>
              <span title="Clear">
                <FontAwesomeIcon icon={faTimes} className="clear-icon" />
              </span>
            </button>
            <span className='separation'></span>
          </>
        )}
        <button>
          <span title="Filter">
            <FontAwesomeIcon icon={faFilter} className='filter-icon' />
          </span>
        </button>
        <button>
          <span title="Rewrite Query">
            <FontAwesomeIcon icon={faPencil} className='rewrite-icon' />
          </span>
        </button>
        <button onClick={handleSearch}>
          <span title="Search">
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;