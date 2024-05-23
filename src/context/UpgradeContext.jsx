import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMouseClickingUpgrade } from "../hooks/MouseClickingUpgrade";
import useSound from "../hooks/useSound";

const UpgradeContext = createContext();

export const useUpgrade = () => useContext(UpgradeContext);

export const UpgradeProvider = ({ children }) => {
  const {
    clicked,
    count,
    setCount,
    multiplier,
    handleClick,
    increaseValue,
    addOne,
    addOneLevel,
    addOneUpgradeCost,
  } = useMouseClickingUpgrade();

  // Passive income upgrade

  const upgradeSoundEffect = useSound();

  const [intervalId, setIntervalId] = useState(null);
  const [passiveIncomeCounter, setPassiveIncomeCounter] = useState(0);
  const [passiveIncomeLevel, setPassiveIncomeLevel] = useState(0);
  const [passiveIncomeUpgradeCost, setPassiveIncomeUpgradeCost] = useState(5);

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
      setCount((prevCount) => prevCount - passiveIncomeUpgradeCost);
      setPassiveIncomeCounter((prevCounter) => prevCounter + 2);
      setPassiveIncomeUpgradeCost((prevCost) => prevCost * 2);
      setPassiveIncomeLevel((prevLevel) => prevLevel + 1);
      upgradeSoundEffect();

      const newIntervalId = setInterval(() => {
        setCount((prevCount) => prevCount + passiveIncomeCounterRef.current);
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
        passiveIncomeUpgradeCost,
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};
