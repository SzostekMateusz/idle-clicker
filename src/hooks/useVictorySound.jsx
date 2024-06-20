import { useEffect, useRef } from "react";
import victory_sound from '../assets/victory_sound.mp3';

const useVictorySound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(victory_sound);
  }, []);

  const playVictorySound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return playVictorySound;
};

export default useVictorySound;
