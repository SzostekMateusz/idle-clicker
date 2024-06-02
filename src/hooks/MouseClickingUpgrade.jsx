import { useState } from "react";
import useSound from "../hooks/usePurchaceSound";
import usePurchaceRejectSound from "../hooks/usePurchaceRejectSound";
import { CashIncomeUpgrade } from "../hooks/CashIncomeUpgrade";
import { calculateTotalCost } from "../utils/calculateTotalCost";
import Swal from "sweetalert2";

export const useMouseClickingUpgrade = (purchaceMultiplierState) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [addOneLevel, setAddOneLevel] = useState(0);
  const [addOneUpgradeCost, setAddOneUpgradeCost] = useState(10);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);

  const { cashUpgrade, cashUpgradeCost, cashIncome, cashUpgradeLevel } = CashIncomeUpgrade(count, setCount, setTotalMoneySpent);


  const handleClick = () => {
    const income = multiplier + cashIncome;
    setCount(count + income);
    setTotalIncome(totalIncome + income);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 80);
  };

  const increaseValue = (amount) => {
    setMultiplier((prevMultiplier) => prevMultiplier + amount);
  };

  const addOne = () => {
    const reqCoins = calculateTotalCost(addOneUpgradeCost, addOneLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setAddOneLevel((prevAddOneLevel) => prevAddOneLevel + purchaceMultiplierState);
      setCount((prevCount) => prevCount - reqCoins);
      setAddOneUpgradeCost((prevAddOneUpgradeCost) => prevAddOneUpgradeCost + reqCoins);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      upgradeSoundEffect();
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
    cashUpgrade,
    cashUpgradeCost,
    cashUpgradeLevel,
    cashIncome,
    totalIncome,
    setTotalIncome,
    totalMoneySpent,
    setTotalMoneySpent,
  };
};
