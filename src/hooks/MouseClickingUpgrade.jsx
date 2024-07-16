import { useState } from "react";
import useSound from "../hooks/usePurchaceSound";
import usePurchaceRejectSound from "../hooks/usePurchaceRejectSound";
import { calculateTotalCost } from "../utils/calculateTotalCost";
import Swal from "sweetalert2";

export const useMouseClickingUpgrade = (
  count,
  setCount,
  totalIncome,
  setTotalIncome,
  totalMoneySpent,
  setTotalMoneySpent,
  purchaceMultiplierState,
  clickedCounter,
  setClickedCounter
) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [clicked, setClicked] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [addOneLevel, setAddOneLevel] = useState(0);
  const [addOneUpgradeCost, setAddOneUpgradeCost] = useState(5);
  const [firstPurchaseAlertShown, setFirstPurchaseAlertShown] = useState(false);

  const handleClick = () => {
    const income = multiplier;
    setCount((prevCount) => prevCount + income);
    setTotalIncome((prevTotalIncome) => prevTotalIncome + income);
    setClickedCounter((prevClickedCounter) => prevClickedCounter + income);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 80);
  };

  const increaseValue = (amount) => {
    setMultiplier((prevMultiplier) => prevMultiplier + amount);
  };

  const addOne = () => {
    const reqCoins = calculateTotalCost(
      addOneUpgradeCost,
      addOneLevel,
      purchaceMultiplierState
    );
    if (count >= reqCoins) {
      setAddOneLevel((prevAddOneLevel) => prevAddOneLevel + purchaceMultiplierState);
      setMultiplier((prevMultiplier) => prevMultiplier + purchaceMultiplierState);
      setCount((prevCount) => prevCount - reqCoins);
      setAddOneUpgradeCost((prevAddOneUpgradeCost) => prevAddOneUpgradeCost + reqCoins);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      upgradeSoundEffect();

      if (!firstPurchaseAlertShown) {
        Swal.fire({
          icon: 'info',
          title: 'Kupiłeś ulepszenie: Coin!',
          text: 'Gotowka i pieniadze fiat sa uwazane za jedna z gorszych inwestycji, poniewaz ich wartosc stopniowo maleje z powodu inflacji. Dlugoterminowe trzymanie gotowki moze prowadzic do utraty sily nabywczej, co czyni inne formy inwestycji, takie jak akcje czy nieruchomosci, bardziej atrakcyjnymi jako zabezpieczenie przed spadkiem wartosci pieniadza.',
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
    clicked,
    count,
    setCount,
    multiplier,
    handleClick,
    increaseValue,
    addOne,
    addOneLevel,
    addOneUpgradeCost,
    totalIncome,
    setTotalIncome,
    totalMoneySpent,
    setTotalMoneySpent,
  };
};
