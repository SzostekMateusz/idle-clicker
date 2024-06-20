import React from 'react';
import { Bar } from 'react-chartjs-2';
import './statisticsModal.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useUpgrade } from '../context/UpgradeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsModal = ({ startDate, currentDate, onClose }) => {
    const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const { totalIncome, clickedCounter, passiveCounter  } = useUpgrade();

    const activeIncomeData = {
        labels: ['Passive Income', 'Active Income', 'Total Money'],
        datasets: [{
            label: 'Amount',
            data: [passiveCounter, clickedCounter, totalIncome],
            backgroundColor: 'rgb(255, 204, 0, 0.6)',
            borderColor: 'black',
            borderWidth: 1
        }]
    };

   

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h1>Statistics</h1>
                    <button onClick={onClose}>Close</button>
                </div>
                <p>Start Date: {startDate.toLocaleDateString()}</p>
                <p>Days Passed: {daysPassed}</p>
                <div className='chart-container'>
                    <h2>Overall Income</h2>
                    <Bar data={activeIncomeData} />
                </div>
            </div>
        </div>
    );
}

export default StatisticsModal;
