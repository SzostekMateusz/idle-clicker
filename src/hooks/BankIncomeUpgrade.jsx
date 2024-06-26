import { useState, useEffect, useRef } from "react";
import useSound from "../hooks/usePurchaceSound";
import usePurchaceRejectSound from "../hooks/usePurchaceRejectSound";
import Swal from "sweetalert2";
import { calculateTotalCost } from "../utils/calculateTotalCost";

export const PassiveBankIncomeUpgrade = (count, setCount, setTotalIncome, setTotalMoneySpent, purchaceMultiplierState, passiveCounter, setPassiveCounter) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [intervalId, setIntervalId] = useState(null);
  const [passiveBankIncomeCounter, setPassiveBankIncomeCounter] = useState(0);
  const [passiveBankLevel, setPassiveBankLevel] = useState(0);
  const [passiveBankUpgradeCost, setPassiveBankUpgradeCost] = useState(2);
  const [shouldStartPassiveCounter, setShouldStartPassiveCounter] = useState(false);

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

  useEffect(() => {
    if (shouldStartPassiveCounter) {
      const newIntervalId = setInterval(() => {
        const income = passiveBankIncomeCounterRef.current;
        setCount((prevCount) => prevCount + income);
        setTotalIncome((prevTotalIncome) => prevTotalIncome + income);
        setPassiveCounter((prevPassiveCounter) => prevPassiveCounter + income);
      }, 2000);
      setIntervalId(newIntervalId);
    }
  }, [shouldStartPassiveCounter]);

  const passiveBankIncomeUpgrade = (onSuccess, onFailure) => {
    const reqCoins = calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setPassiveBankIncomeCounter((prevCounter) => prevCounter + 30 * purchaceMultiplierState);
      setPassiveBankLevel((prevLevel) => prevLevel + purchaceMultiplierState);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      upgradeSoundEffect();

      if (intervalId) {
        clearInterval(intervalId);
      }
      
      setShouldStartPassiveCounter(true);

      if (onSuccess) onSuccess();
    } else {
      purchaceRejectSoundEffect();
      if (onFailure) onFailure();
    }
  };

  return {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  };
};
