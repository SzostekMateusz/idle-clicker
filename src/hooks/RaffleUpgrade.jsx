import { useState } from "react";
import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";

const RaffleUpgrade = (count, setCount) => {
  const upgradeSoundEffect = useSound();
  const purchaceRejectSoundEffect = usePurchaceRejectSound();

  const [raffleWins, setRaffleWins] = useState(0);
  const [raffleLoses, setRaffleLoses] = useState(0);

  const raffleCost = 1;

  const raffle = () => {
    const rafflePool = Math.floor(Math.random() * 2);

    if (count >= raffleCost) {
      upgradeSoundEffect();
      if (rafflePool === 0) {
        setCount((prevCount) => prevCount + raffleCost);
        setRaffleWins((prevWins) => prevWins + 1);
        console.log(raffleWins)
      } else {
        setCount((prevCount) => prevCount - raffleCost);
        setRaffleLoses((prevLoses) => prevLoses + 1);
        console.log(raffleLoses)
      }
    } else {
      purchaceRejectSoundEffect();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough credits. You need ${raffleCost} coins.`,
        confirmButtonText: 'OK'
      });
    }
  };

  return { raffle, raffleCost, raffleWins, raffleLoses };
};

export default RaffleUpgrade;
