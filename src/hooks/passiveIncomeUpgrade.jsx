import { useState, useEffect, useRef } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";

export const usePassiveIncomeUpgrade = (count, setCount, setTotalIncome, setTotalMoneySpent) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

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
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + passiveIncomeUpgradeCost)
      upgradeSoundEffect();

      if (intervalId) {
        clearInterval(intervalId);
      }

      const newIntervalId = setInterval(() => {
        const income = passiveIncomeCounterRef.current;
        setCount((prevCount) => prevCount + income);
        setTotalIncome((prevTotalIncome) => prevTotalIncome + income);
      }, 2000);
      setIntervalId(newIntervalId);
    } else {
      purchaceRejectSoundEffect();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough credits. You need ${passiveIncomeUpgradeCost} coins.`,
        confirmButtonText: 'OK'
      });
    }
  };


  return {
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  };
};
