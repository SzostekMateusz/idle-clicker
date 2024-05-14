// functions.js
import { useState } from 'react';

export const useGameFunctions = () => {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const handleClick = () => {
    setCount(count + multiplier);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 80);
  };

  const increaseValue = (amount) => {
    setMultiplier(prevMultiplier => prevMultiplier + amount);
  };

  const addOne = () => {
    const reqCoins = multiplier * 10;
    if (count >= reqCoins) {
      setMultiplier(prevMultiplier => prevMultiplier + 1);
      setCount(count - reqCoins);
    } else {
      alert("Not enough credits. You need " + reqCoins + " coins.");
    }
  };

  return { clicked, count, multiplier, handleClick, increaseValue, addOne };
};