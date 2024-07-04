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
  const [firstPurchaseAlertShown, setFirstPurchaseAlertShown] = useState(false);

  const bitcoinUpgrade = () => {
    const reqCoins = calculateTotalCost(bitcoinUpgradeCost, bitcoinUpgradeLevel, purchaceMultiplierState);
    if (count >= reqCoins) {
      setCount((prevCount) => prevCount - reqCoins);
      setBitcoinIncome((prevBitcoinIncome) => prevBitcoinIncome + 1000 * purchaceMultiplierState);
      setBitcoinUpgradeLevel((prevBitcoinUpgradeLevel) => prevBitcoinUpgradeLevel + purchaceMultiplierState);
      setTotalMoneySpent((prevTotalMoneySpent) => prevTotalMoneySpent + reqCoins);
      increaseValue(1000 * purchaceMultiplierState);
      UpgradeSoundEffect();

      if (!firstPurchaseAlertShown) {
        Swal.fire({
          icon: 'info',
          title: 'Kupiłeś ulepszenie: Bitcoin!',
          text: 'Inwestowanie w Bitcoin i inne kryptowaluty moze przyniesc wysokie zyski dzieki ich potencjalnie gwaltownemu wzrostowi wartosci. Kryptowaluty sa zdecentralizowane, co oznacza, ze nie sa kontrolowane przez zaden rzad czy instytucje finansowa, co dla wielu inwestorow stanowi atrakcyjna ceche. Jednak sa one rowniez bardzo zmienne i ryzykowne, narazone na nagle spadki wartosci, regulacje prawne oraz problemy zwiazane z bezpieczenstwem cyfrowym.',
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
    bitcoinUpgrade,
    bitcoinUpgradeCost,
    bitcoinIncome,
    bitcoinUpgradeLevel,
  };
};
