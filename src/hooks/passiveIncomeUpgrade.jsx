import { useState, useEffect, useRef } from "react";
import useSound from "../hooks/usePurchaceSound";
import usePurchaceRejectSound from "../hooks/usePurchaceRejectSound";
import Swal from "sweetalert2";
import { calculateTotalCost } from "../utils/calculateTotalCost";

export const usePassiveIncomeUpgrade = (count, setCount, setTotalIncome, setTotalMoneySpent, purchaceMultiplierState, passiveCounter, setPassiveCounter) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [intervalId, setIntervalId] = useState(null);
  const [passiveIncomeCounter, setPassiveIncomeCounter] = useState(0);
  const [passiveIncomeLevel, setPassiveIncomeLevel] = useState(0);
  const [passiveIncomeUpgradeCost, setPassiveIncomeUpgradeCost] = useState(200);
  const [shouldStartPassiveCounter, setShouldStartPassiveCounter] = useState(false);
  const [firstPurchaseAlertShown, setFirstPurchaseAlertShown] = useState(false);

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

  const startInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      const income = passiveIncomeCounterRef.current;
      setCount((prevCount) => prevCount + income);
      setTotalIncome((prevTotalIncome) => prevTotalIncome + income);
      setPassiveCounter((prevPassiveCounter) => prevPassiveCounter + income);
    }, 2000);
    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    if (shouldStartPassiveCounter) {
      startInterval();
    }
  }, [shouldStartPassiveCounter, passiveIncomeCounter]);

  const passiveIncomeUpgrade = (onSuccess) => {
    const reqCoins = calculateTotalCost(passiveIncomeUpgradeCost, passiveIncomeLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setPassiveIncomeCounter((prevCounter) => prevCounter + 5 * purchaceMultiplierState);
      setPassiveIncomeUpgradeCost((prevCost) => prevCost * 2);
      setPassiveIncomeLevel((prevLevel) => prevLevel + purchaceMultiplierState);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      upgradeSoundEffect();

      setShouldStartPassiveCounter(true);

      if (onSuccess) onSuccess();

      if (!firstPurchaseAlertShown) {
        Swal.fire({
          icon: 'info',
          title: 'Kupiłeś ulepszenie: Golden Billet!',
          text: 'Zloto jest cenionym surowcem ze wzgledu na swoja stabilnosc i wartosc, ktora czesto rosnie w czasach niepewnosci gospodarczej. Jest uwazane za bezpieczna przystan inwestycyjna, poniewaz moze chronic przed inflacja i niestabilnoscia rynkowa. Inwestowanie w zloto moze byc korzystne dla osob szukajacych stabilnosci w swoim portfelu, ale wartosc zlota moze rowniez podlegac wahaniom rynkowym.',
          confirmButtonText: 'OK',
          width: '50%'
        });
        setFirstPurchaseAlertShown(true);
      }
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
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  };
};
