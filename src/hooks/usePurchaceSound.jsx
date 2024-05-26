import { useEffect, useRef } from "react";
import upgradeSoundKaching from '../assets/cash-register-kaching.mp3';

const useSound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(upgradeSoundKaching);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return playSound;
};

export default useSound;