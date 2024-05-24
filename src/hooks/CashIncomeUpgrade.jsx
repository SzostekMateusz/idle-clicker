import { useState, useEffect, useRef } from "react";
import useSound from "./useSound";

export const CashIncomeUpgrade = (count, setCount) => {

  const UpgradeSoundEffect = useSound();

  const [cashIncome, setCashIncome] = useState(0)
  const [cashUpgradeLevel, setCashUpgradeLevel] = useState(0)
  const [cashUpgradeCost, setCashUpgradeCost] = useState(7)

  const cashUpgrade = () => {
    if(count >= cashUpgradeCost){
      setCount((prevCount) => prevCount - cashUpgradeCost)
      setCashIncome((prevCashIncome) => prevCashIncome + 10)
      setCashUpgradeLevel(prevCashUpgradeLevel => prevCashUpgradeLevel + 1)
      UpgradeSoundEffect();
    }
    else{
      alert(`Not enough credits. You need ${cashUpgradeCost} coins.`);
    }
    

  }
 
  return {
    cashUpgrade,
    cashUpgradeCost,
    cashIncome,
    cashUpgradeLevel,
  };
};
