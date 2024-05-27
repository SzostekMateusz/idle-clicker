import { useState, useEffect, useRef } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";

export const CashIncomeUpgrade = (count, setCount, setTotalMoneySpent) => {

  const UpgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [cashIncome, setCashIncome] = useState(0)
  const [cashUpgradeLevel, setCashUpgradeLevel] = useState(0)
  const [cashUpgradeCost, setCashUpgradeCost] = useState(500)

  const cashUpgrade = () => {
    if(count >= cashUpgradeCost){
      setCount((prevCount) => prevCount - cashUpgradeCost)
      setCashIncome((prevCashIncome) => prevCashIncome + 10)
      setCashUpgradeLevel(prevCashUpgradeLevel => prevCashUpgradeLevel + 1)
      setCashUpgradeCost((prevCashUpgradeCost) => Math.round(prevCashUpgradeCost * 1.3))
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + cashUpgradeCost)
      UpgradeSoundEffect();
    }
    else{
      purchaceRejectSoundEffect();
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
