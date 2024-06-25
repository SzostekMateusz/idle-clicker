// ConfettiComponent.js
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ConfettiComponent = ({ trigger }) => {
  const { width, height } = useWindowSize();

  return trigger ? <Confetti width={width} height={height} /> : null;
};

export default ConfettiComponent;
