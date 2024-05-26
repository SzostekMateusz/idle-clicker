import { useEffect, useRef } from "react";
import upgradePurchaceSound from '../assets/purchace-reject-sound.mp3';

const usePurchaceRejectSound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(upgradePurchaceSound);
  }, []);

  const playPurchaceRejectSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return playPurchaceRejectSound;
};

export default usePurchaceRejectSound;