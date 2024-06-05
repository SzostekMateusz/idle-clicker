import React from 'react';
import './multiplierBtn.css';

const MultiplierBtn = ({ multiplier, onClick, isSelected  }) => {
  return (
    <div className='btn-container'>
      <button
      className={`btn ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      X{multiplier}
    </button>
    </div>
  );
}

export default MultiplierBtn;
