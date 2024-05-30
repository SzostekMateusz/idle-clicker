import { useEffect, useRef } from "react";
import clickSound from '../assets/click.mp3';

const useClickSound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(clickSound);
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

export default useClickSound;