import React, { useState, useEffect } from 'react';
import './leftcontent.css';
import UtilityBtn from './ui/UtilityBtn';
import logo from '../assets/golden_billet.png';
import backgroundMusic from '../assets/background_music.mp3';
import MusicBtn from './ui/musicBtn';

import { useUpgrade } from '../context/UpgradeContext';

const LeftContent = () => {
    const { count, handleClick } = useUpgrade();

    const [isMuted, setIsMuted] = useState(false);
    const [audio] = useState(new Audio(backgroundMusic));
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);
    const [clicked, setClicked] = useState(false); // Dodajemy stan clicked

    useEffect(() => {
        audio.loop = true;
        audio.volume= 0.08;
        if (isAudioInitialized && !isMuted) {
            audio.play();
        }

        return () => {
            audio.pause();
        };
    }, [audio, isMuted, isAudioInitialized]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const mute = () => {
        audio.muted = true;
        setIsMuted(true);
    };

    const unmute = () => {
        audio.muted = false;
        setIsMuted(false);
    };

    const initializeAudio = () => {
        setIsAudioInitialized(true);
    };

    const handleButtonClick = () => {
        setClicked(true); 
        setTimeout(() => {
            setClicked(false);
        }, 80); 
        handleClick(); 
    };

    function counterFormat(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }

    return (
        <div className='leftContent'>
            <div className='utility-buttons-containter'>
                <UtilityBtn image='settings' />
                <UtilityBtn image='currency_change' />
                <MusicBtn image='speaker' onClick={unmute} onMouseDown={initializeAudio}/>
                <MusicBtn image='speaker_muted' onClick={mute} />
            </div>
            <div className='clicker-button-containter'>
                <span className='score-counter'>{counterFormat(count)} $</span>
                <button className={`clicker-button ${clicked ? 'clicked' : ''}`} onClick={handleButtonClick}>
                    <img src={logo} alt="Logo" className='clicker-image'/>
                </button>
            </div>
        </div>  
    );
}

export default LeftContent;
