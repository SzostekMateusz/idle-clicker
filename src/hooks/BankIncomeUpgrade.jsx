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
  const [passiveBankUpgradeCost, setPassiveBankUpgradeCost] = useState(20000);
  const [shouldStartPassiveCounter, setShouldStartPassiveCounter] = useState(false);
  const [firstPurchaseAlertShown, setFirstPurchaseAlertShown] = useState(false);

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

  const startInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      const income = passiveBankIncomeCounterRef.current;
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
  }, [shouldStartPassiveCounter, passiveBankIncomeCounter]);

  const passiveBankIncomeUpgrade = (onSuccess, onFailure) => {
    const reqCoins = calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setPassiveBankIncomeCounter((prevCounter) => prevCounter + 30 * purchaceMultiplierState);
      setPassiveBankLevel((prevLevel) => prevLevel + purchaceMultiplierState);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      upgradeSoundEffect();
      
      setShouldStartPassiveCounter(true);

      if (!firstPurchaseAlertShown) {
        Swal.fire({
          icon: 'info',
          title: 'Kupiłeś ulepszenie: Real Estate!',
          text: 'Inwestowanie w nieruchomosci jest czesto uwazane za bezpieczna forme lokowania kapitalu, oferujaca stabilne zyski i ochrone przed inflacja. Nieruchomosci moga generowac regularne przychody z wynajmu oraz zyski z dlugoterminowego wzrostu wartosci. Jednak inwestycje te wymagaja duzego kapitalu poczatkowego i moga wiazac sie z ryzykiem, takim jak wahania cen na rynku nieruchomosci oraz koszty utrzymania i zarzadzania.',
          confirmButtonText: 'OK',
          width: '50%'
        });
        setFirstPurchaseAlertShown(true);
      }

      if (onSuccess) onSuccess();
    } else {
      purchaceRejectSoundEffect();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough credits. You need ${reqCoins} coins.`,
        confirmButtonText: 'OK'
      });
      if (onFailure) onFailure();
    }
  };

  return {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  };
};
