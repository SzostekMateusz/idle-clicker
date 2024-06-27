import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useUpgrade } from '../context/UpgradeContext';

const Navbar = () => {
    const { totalIncome, totalMoneySpent, currentDate, updateCurrentDate } = useUpgrade();
    const [date, setDate] = useState(currentDate);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
            setDate(newDate);
            updateCurrentDate(newDate);
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, [date, updateCurrentDate]);

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
        </div>
    );
};

export default Navbar;
