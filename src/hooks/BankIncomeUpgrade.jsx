import { useState, useEffect, useRef } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";
import { calculateTotalCost } from "../utils/calculateTotalCost";

export const PassiveBankIncomeUpgrade = (count, setCount, setTotalIncome, setTotalMoneySpent, purchaceMultiplierState) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [intervalId, setIntervalId] = useState(null);
  const [passiveBankIncomeCounter, setPassiveBankIncomeCounter] = useState(0);
  const [passiveBankLevel, setPassiveBankLevel] = useState(0);
  const [passiveBankUpgradeCost, setPassiveBankUpgradeCost] = useState(2);

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
    const reqCoins = calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setPassiveBankIncomeCounter((prevCounter) => prevCounter + 30);
      setPassiveBankLevel((prevLevel) => prevLevel + 1);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins)
      upgradeSoundEffect();

      if (intervalId) {
        clearInterval(intervalId);
      }

      const newIntervalId = setInterval(() => {
        const income = passiveBankIncomeCounterRef.current;
        setCount((prevCount) => prevCount + income);
        setTotalIncome((prevTotalIncome) => prevTotalIncome + income)
      }, 2000);
      setIntervalId(newIntervalId); 
    } else {
      purchaceRejectSoundEffect();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough credits. You need ${reqCoins} coins.`,
        confirmButtonText: 'OK'
      });
    }
  };

  return {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  };
};
