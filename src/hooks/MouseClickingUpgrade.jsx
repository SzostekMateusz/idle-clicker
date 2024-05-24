// MouseClickingUpgrade.js
import { useState } from "react";
import useSound from "../hooks/useSound";

export const useMouseClickingUpgrade = () => {
  const upgradeSoundEffect = useSound();

  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [addOneLevel, setAddOneLevel] = useState(0);
  const [addOneUpgradeCost, setAddOneUpgradeCost] = useState(10);

  const handleClick = () => {
    setCount(count + multiplier); 
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 80);
  };

  const increaseValue = (amount) => {
    setMultiplier((prevMultiplier) => prevMultiplier + amount);
  };

  const addOne = () => {
    const reqCoins = multiplier * 10;
    if (count >= addOneUpgradeCost) {
      setMultiplier((prevMultiplier) => prevMultiplier + 1);
      setAddOneLevel((prevAddOneLevel) => prevAddOneLevel + 1);
      setCount((prevCount) => prevCount - addOneUpgradeCost);
      setAddOneUpgradeCost((prevAddOneUpgradeCost) => prevAddOneUpgradeCost + reqCoins);
      upgradeSoundEffect();
    } else {
      alert(`Not enough credits. You need ${addOneUpgradeCost} coins.`);
    }
  };

  return {
    clicked,
    count,
    setCount,
    multiplier,
    handleClick,
    increaseValue,
    addOne,
    addOneLevel,
    addOneUpgradeCost,
  };
};