import { useState, useEffect, useRef } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";

export const PassiveBankIncomeUpgrade = (count, setCount) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [intervalId, setIntervalId] = useState(null);
  const [passiveBankIncomeCounter, setPassiveBankIncomeCounter] = useState(0);
  const [passiveBankLevel, setPassiveBankLevel] = useState(0);
  const [passiveBankUpgradeCost, setPassiveBankUpgradeCost] = useState(1);

  const passiveBankIncomeCounterRef = useRef(passiveBankIncomeCounter);

  useEffect(() => {
    passiveBankIncomeCounterRef.current = passiveBankIncomeCounter;
  }, [passiveBankIncomeCounter]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const passiveBankIncomeUpgrade = () => {
    if (count >= passiveBankUpgradeCost) {
      setCount((prevCount) => prevCount - passiveBankUpgradeCost);
      setPassiveBankIncomeCounter((prevCounter) => prevCounter + 30);
      setPassiveBankUpgradeCost((prevCost) => Math.round(prevCost * 1.4));
      setPassiveBankLevel((prevLevel) => prevLevel + 1);
      upgradeSoundEffect();

      if (intervalId) {
        clearInterval(intervalId);
      }

      const newIntervalId = setInterval(() => {
        setCount((prevCount) => prevCount + passiveBankIncomeCounterRef.current);
      }, 1000);
      setIntervalId(newIntervalId);
      
    } else {
      purchaceRejectSoundEffect();
      alert(`Not enough credits. You need ${passiveBankUpgradeCost} coins.`);
    }
  };

  return {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  };
};
