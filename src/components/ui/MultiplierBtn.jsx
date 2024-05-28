import React from 'react';
import './multiplierBtn.css';

const MultiplierBtn = ({ multiplier, onClick }) => {
  return (
    <div className='btn-container'>
      <button className='btn' onClick={onClick}>X{multiplier}</button>
    </div>
  );
}

export default MultiplierBtn;
