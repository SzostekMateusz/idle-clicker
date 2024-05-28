import { useState } from "react";
import useSound from "../hooks/usePurchaceSound";
import usePurchaceRejectSound from "../hooks/usePurchaceRejectSound";
import { CashIncomeUpgrade } from "../hooks/CashIncomeUpgrade";
import { usePurchaceMultiplier } from "../hooks/usePurchaceMultiplier";

export const useMouseClickingUpgrade = () => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();
  const { PurchaceMultiplierState } = usePurchaceMultiplier(); 
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

  const calculateTotalCost = (level, multiplier) => {
    let totalCost = 0;
    let cost = 10 * Math.pow(2, level);
    for (let i = 0; i < multiplier; i++) {
      totalCost += cost;
      cost *= 2;
    }
    return totalCost;
  };

  const addOne = () => {
    const reqCoins = calculateTotalCost(addOneLevel, PurchaceMultiplierState);
    if (count >= reqCoins) {
      setAddOneLevel((prevAddOneLevel) => prevAddOneLevel + PurchaceMultiplierState);
      setCount((prevCount) => prevCount - reqCoins);
      setAddOneUpgradeCost(calculateTotalCost(addOneLevel + PurchaceMultiplierState, 1));
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      upgradeSoundEffect();
    } else {
      purchaceRejectSoundEffect();
      alert(`Not enough credits. You need ${reqCoins} coins.`);
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
    setTotalMoneySpent
  };
};
