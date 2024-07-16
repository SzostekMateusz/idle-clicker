import { useState } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";
import { calculateTotalCost } from "../utils/calculateTotalCost";

export const CashIncomeUpgrade = (count, setCount, setTotalMoneySpent, purchaceMultiplierState, increaseValue) => {
  const UpgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [cashIncome, setCashIncome] = useState(0);
  const [cashUpgradeLevel, setCashUpgradeLevel] = useState(0);
  const [cashUpgradeCost, setCashUpgradeCost] = useState(750);
  const [firstPurchaseAlertShown, setFirstPurchaseAlertShown] = useState(false);

  const cashUpgrade = () => {
    const reqCoins = calculateTotalCost(cashUpgradeCost, cashUpgradeLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setCashIncome((prevCashIncome) => prevCashIncome + 10 * purchaceMultiplierState);
      setCashUpgradeLevel((prevCashUpgradeLevel) => prevCashUpgradeLevel + purchaceMultiplierState);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      increaseValue(10 * purchaceMultiplierState);
      UpgradeSoundEffect();

      if (!firstPurchaseAlertShown) {
        Swal.fire({
          icon: 'info',
          title: 'Kupiłeś ulepszenie: Cash!',
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
    cashUpgrade,
    cashUpgradeCost,
    cashIncome,
    cashUpgradeLevel,
  };
};
