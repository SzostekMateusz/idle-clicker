import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import useSound from "../hooks/useSound";

const UpgradeContext = createContext();

export const useUpgrade = () => useContext(UpgradeContext);

export const UpgradeProvider = ({ children }) => {

  const upgradeSoundEffect = useSound()
  
// Mouse clicking upgrade
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [addOneLevel, setAddOneLevel] = useState(0);
  const [addOneUpgradeCost, setAddOneUpgradeCost] = useState(10)

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
      setAddOneUpgradeCost(prevAddOneUpgradeCost => prevAddOneUpgradeCost + reqCoins)
      upgradeSoundEffect();
    } else {
      alert(`Not enough credits. You need ${addOneUpgradeCost} coins.`);
    }
  };

  // Passive income upgrade
  const [intervalId, setIntervalId] = useState(null)
  const [passiveIncomeCounter, setPassiveIncomeCounter] = useState(0)
  const [passiveIncomeLevel, setPassiveIncomeLevel] = useState(0)
  const [passiveIncomeUpgradeCost, setPassiveIncomeUpgradeCost] = useState(5)


  

  const passiveIncomeCounterRef = useRef(passiveIncomeCounter);

  useEffect(() => {
    passiveIncomeCounterRef.current = passiveIncomeCounter;
  }, [passiveIncomeCounter]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const passiveIncomeUpgrade = () => {
    if (count >= passiveIncomeUpgradeCost) {
      setCount(prevCount => prevCount - passiveIncomeUpgradeCost);
      setPassiveIncomeCounter(prevCounter => prevCounter + 2);
      setPassiveIncomeUpgradeCost(prevCost => prevCost * 2);
      setPassiveIncomeLevel(prevLevel => prevLevel + 1);
      upgradeSoundEffect();

      const newIntervalId = setInterval(() => {
        setCount(prevCount => prevCount + passiveIncomeCounterRef.current);
      }, 2000);
      setIntervalId(newIntervalId);
      
    } else {
      alert(`Not enough credits. You need ${passiveIncomeUpgradeCost} coins.`);
    }
  };


  return (
    <UpgradeContext.Provider
      value={{
        clicked,
        count,
        multiplier,
        handleClick,
        increaseValue,
        addOne,
        addOneLevel,
        addOneUpgradeCost,
        passiveIncomeUpgrade,
        passiveIncomeLevel,
        passiveIncomeUpgradeCost
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};
