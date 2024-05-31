import { useState, useEffect, useRef } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";

export const PassiveBankIncomeUpgrade = (count, setCount, setTotalIncome, setTotalMoneySpent) => {
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
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + passiveBankUpgradeCost)
      upgradeSoundEffect();

      if (intervalId) {
        clearInterval(intervalId);
      }

      const newIntervalId = setInterval(() => {
        const income = passiveBankIncomeCounterRef.current;
        setCount((prevCount) => prevCount + income);
        setTotalIncome((prevTotalIncome) => prevTotalIncome + income)
      }, 1000);
      setIntervalId(newIntervalId); 
    } else {
      purchaceRejectSoundEffect();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough credits. You need ${passiveBankUpgradeCost} coins.`,
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
