import React, { useState, useEffect } from 'react'
import './leftcontent.css';
import UtilityBtn from './ui/UtilityBtn';
import logo from '../assets/golden_billet.png'
import backgroundMusic from '../assets/background_music.mp3'
import MusicBtn from './ui/musicBtn';

const LeftContent = () => {

    const [isMuted, setIsMuted] = useState(false);
    const [audio] = useState(new Audio(backgroundMusic));
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);

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

    return (
        <div className='leftContent'>
            <div className='utility-buttons-containter'>
                <UtilityBtn image='settings' />
                <UtilityBtn image='currency_change' />
                <MusicBtn image='speaker' onClick={unmute} onMouseDown={initializeAudio}/>
                <MusicBtn image='speaker_muted' onClick={mute} />
            </div>
            <div className='clicker-button-containter'>
                <span className='score-counter'>COUNTER</span>
                <button className='clicker-button'>
                    <img src={logo} alt="Logo" className='clicker-image'/>
                </button>
            </div>
        </div>  
        );
}
 
export default LeftContent;

