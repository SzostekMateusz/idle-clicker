import { useState, useEffect, useRef } from "react";
import useSound from "./useSound";

export const usePassiveIncomeUpgrade = (count, setCount) => {
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

      if (intervalId) {
        clearInterval(intervalId);
      }

      const newIntervalId = setInterval(() => {
        setCount((prevCount) => prevCount + passiveIncomeCounterRef.current);
      }, 2000);
      setIntervalId(newIntervalId);
    } else {
      alert(`Not enough credits. You need ${passiveIncomeUpgradeCost} coins.`);
    }
  };

  return {
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  };
};
