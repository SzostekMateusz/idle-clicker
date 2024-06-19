import { useState } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";
import { calculateTotalCost } from "../utils/calculateTotalCost";

export const BitcoinIncomeUpgrade = (count, setCount, setTotalMoneySpent, purchaceMultiplierState, increaseValue) => {
  const UpgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [bitcoinIncome, setBitcoinIncome] = useState(0);
  const [bitcoinUpgradeLevel, setBitcoinUpgradeLevel] = useState(0);
  const [bitcoinUpgradeCost, setBitcoinUpgradeCost] = useState(10000);

  const bitcoinUpgrade = () => {
    const reqCoins = calculateTotalCost(bitcoinUpgradeCost, bitcoinUpgradeLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setBitcoinIncome((prevBitcoinIncome) => prevBitcoinIncome + 1000 * purchaceMultiplierState);
      setBitcoinUpgradeLevel((prevBitcoinUpgradeLevel) => prevBitcoinUpgradeLevel + purchaceMultiplierState);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      increaseValue(1000 * purchaceMultiplierState);
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
    bitcoinUpgrade,
    bitcoinUpgradeCost,
    bitcoinIncome,
    bitcoinUpgradeLevel,
  };
};
