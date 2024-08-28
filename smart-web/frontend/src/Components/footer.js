// frontend/src/Components/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPageButtons = () => {
    const buttons = [];

    // Display "<" only if not on the first page
    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      );
    }

    // Display page numbers
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }

    // Display ">" only if not on the last page
    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="footer">
      <span>WebAssist</span>
      <div className="pagination">
        {renderPageButtons()}
      </div>
    </div>
  );
};

export default Footer;
