import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useUpgrade } from '../context/UpgradeContext';
import StatisticsModal from './StatisticModal';

const Navbar = () => {
    const { totalIncome, totalMoneySpent } = useUpgrade();
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [startDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(prevDate => new Date(prevDate.getTime() + 24 * 60 * 60 * 1000));
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, []);

    function counterFormat(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return (
        <div className='navbar-container'>
            <div className='income-section'>
                <h1>Total Income: {counterFormat(totalIncome)} $</h1>
            </div>
            <div className='income-section'>
                <h1>Money Spent: {counterFormat(totalMoneySpent)} $</h1>
            </div>
            <div className='date-section'>
                <h1>{date.toLocaleDateString()}</h1>
            </div>
            <button onClick={() => setShowModal(true)}>Show Statistics</button>
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

export default Navbar;
