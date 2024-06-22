import React, { useState, useEffect } from 'react';
import './leftcontent.css';
import UtilityBtn from './ui/UtilityBtn';
import logo from '../assets/golden_billet.png';
import droppingMoneyImage from '../assets/coin.png';
import backgroundMusic from '../assets/background_music.mp3';
import MusicBtn from './ui/musicBtn';
import { useUpgrade } from '../context/UpgradeContext';
import useClickSound from '../hooks/useClickSound';
import StatisticsModal from './StatisticModal';
import Swal from 'sweetalert2';

const LeftContent = ({ currentDate }) => {
    const { count, handleClick} = useUpgrade();
    const [isMuted, setIsMuted] = useState(false);
    const [audio] = useState(new Audio(backgroundMusic));
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [moneyArray, setMoneyArray] = useState([]);
    const playClickSound = useClickSound();
   
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [startDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(prevDate => new Date(prevDate.getTime() + 24 * 60 * 60 * 1000));
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        audio.loop = true;
        audio.volume = 0.08;
        if (isAudioInitialized && !isMuted) {
            audio.play();
        }

        return () => {
            audio.pause();
        };
    }, [audio, isMuted, isAudioInitialized]);

    useEffect(() => {
        document.title = `${titleCounterFormat(count)} $ - Money Idle Clicker`;
    }, [count]);

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
        playClickSound();
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 80);
        handleClick();

        const numberOfImages = 1;
        const newMoney = [...Array(numberOfImages)].map((_, index) => ({
            id: Date.now() + index,
            left: Math.random() * 95,
        }));
        setMoneyArray([...moneyArray, ...newMoney]);
    };

    function counterFormat(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function titleCounterFormat(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //Game instruction alert
    const showInstruction = () => {
        Swal.fire({
            title: "How to play?",
            text: "Click to make money. Buy assets to earn passive income. Manage your money wisely and become the richest man in the world!",
            icon: "question",
        });
    }

    return (
        <div className='leftContent'>
            <div className='utility-buttons-containter'>
                <MusicBtn image='speaker' onClick={unmute} onMouseDown={initializeAudio} />
                <MusicBtn image='speaker_muted' onClick={mute} />
                <UtilityBtn image='graph_icon' onClick={() => setShowModal(true)}/>
                <UtilityBtn image='question_mark' onClick={showInstruction} />
            </div>
            <div className='clicker-button-containter'>
                <span className='score-counter'>{counterFormat(count)} $</span>
                <button className={`clicker-button ${clicked ? 'clicked' : ''}`} onClick={handleButtonClick}>
                    <img src={logo} alt="Logo" className='clicker-image' />
                </button>
                {moneyArray.map(money => (
                    <div
                        key={money.id}
                        className="money"
                        style={{ left: `${money.left}%`}}
                    >
                        <img src={droppingMoneyImage} alt="Money" />
                    </div>
                ))}
            </div>
            {showModal && (
                <StatisticsModal
                    startDate={startDate}
                    currentDate={date}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default LeftContent;
