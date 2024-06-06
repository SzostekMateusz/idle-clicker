import { useState } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";
import { calculateTotalCost } from "../utils/calculateTotalCost";

export const CashIncomeUpgrade = (count, setCount, setTotalMoneySpent, purchaceMultiplierState) => {
  const UpgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [cashIncome, setCashIncome] = useState(0);
  const [cashUpgradeLevel, setCashUpgradeLevel] = useState(0);
  const [cashUpgradeCost, setCashUpgradeCost] = useState(2);

  const cashUpgrade = () => {
    const reqCoins = calculateTotalCost(cashUpgradeCost, cashUpgradeLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setCashIncome((prevCashIncome) => prevCashIncome + 10 * purchaceMultiplierState);
      setCashUpgradeLevel((prevCashUpgradeLevel) => prevCashUpgradeLevel + purchaceMultiplierState);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      UpgradeSoundEffect();
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
    cashUpgrade,
    cashUpgradeCost,
    cashIncome,
    cashUpgradeLevel,
  };
};
