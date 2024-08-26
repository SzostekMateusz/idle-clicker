import { useState } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";

const RaffleUpgrade = (count, setCount) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [raffleWins, setRaffleWins] = useState(0);
  const [raffleLoses, setRaffleLoses] = useState(0);
  const [firstPurchaseAlertShown, setFirstPurchaseAlertShown] = useState(false);

  const raffle = (raffleAmount) => {
    if (raffleAmount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'You must enter an amount greater than 0.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (count >= raffleAmount) {
      
      if (!firstPurchaseAlertShown) {
        Swal.fire({
          icon: 'info',
          title: 'Gambling Warning',
          text: 'Remember, gambling can be addictive. Play responsibly.',
          confirmButtonText: 'OK'
        }).then(() => {
          setFirstPurchaseAlertShown(true);
          proceedWithRaffle(raffleAmount);
        });
      } else {
        proceedWithRaffle(raffleAmount);
      }
    } else {
      purchaceRejectSoundEffect();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough credits. You need at least ${raffleAmount} coins.`,
        confirmButtonText: 'OK'
      });
    }
  };

  const proceedWithRaffle = (raffleAmount) => {
    const rafflePool = Math.floor(Math.random() * 2);
    upgradeSoundEffect();

    if (rafflePool === 0) {
      setCount((prevCount) => prevCount + raffleAmount);
      setRaffleWins((prevWins) => prevWins + 1);
      Swal.fire({
        icon: 'success',
        title: 'You won!',
        text: `You have won ${raffleAmount} coins!`,
        confirmButtonText: 'OK'
      });
    } else {
      setCount((prevCount) => prevCount - raffleAmount);
      setRaffleLoses((prevLoses) => prevLoses + 1);
      Swal.fire({
        icon: 'error',
        title: 'You lost!',
        text: `You have lost ${raffleAmount} coins.`,
        confirmButtonText: 'OK'
      });
    }
  };

  return { raffle, raffleWins, raffleLoses };
};

export default RaffleUpgrade;
