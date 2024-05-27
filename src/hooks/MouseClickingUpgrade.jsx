import { useState } from "react";
import useSound from "../hooks/usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import { CashIncomeUpgrade } from "./CashIncomeUpgrade";

export const useMouseClickingUpgrade = () => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [addOneLevel, setAddOneLevel] = useState(0);
  const [addOneUpgradeCost, setAddOneUpgradeCost] = useState(10);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0)

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
    const reqCoins = multiplier * 10;
    if (count >= addOneUpgradeCost) {
      setMultiplier((prevMultiplier) => prevMultiplier + 1);
      setAddOneLevel((prevAddOneLevel) => prevAddOneLevel + 1);
      setCount((prevCount) => prevCount - addOneUpgradeCost);
      setAddOneUpgradeCost((prevAddOneUpgradeCost) => prevAddOneUpgradeCost + reqCoins);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + addOneUpgradeCost)
      upgradeSoundEffect();
    } else {
      purchaceRejectSoundEffect();
      alert(`Not enough credits. You need ${addOneUpgradeCost} coins.`);
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
