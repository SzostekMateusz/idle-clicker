import useSound from "./usePurchaceSound";
import usePurchaceRejectSound from "./usePurchaceRejectSound";
import Swal from "sweetalert2";

const RaffleUpgrade = (count, setCount) => {

    const upgradeSoundEffect = useSound();
    const purchaceRejectSoundEffect = usePurchaceRejectSound();

    const raffleCost = 10000000;

    const raffle = () => {
        const rafflePool = Math.floor(Math.random() * 2) + 1;

        const raffleCheck = () => {
            if(count >= raffleCost){
                upgradeSoundEffect();
                if (rafflePool % 2 === 0) {
                    setCount((prevCount) => prevCount + raffleCost)
                } else {
                    setCount((prevCount) => prevCount - raffleCost)
                }
            }
            else{
                purchaceRejectSoundEffect();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Not enough credits. You need ${raffleCost} coins.`,
                    confirmButtonText: 'OK'
                  });
            }
        }

        raffleCheck();
    }

    return { raffle, raffleCost };
}

export default RaffleUpgrade;
