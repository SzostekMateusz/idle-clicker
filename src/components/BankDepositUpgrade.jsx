import React, { useState, useEffect } from "react";
import { useUpgrade } from "../context/UpgradeContext";
import Swal from "sweetalert2";
import images from "../imageImport.js";
import './bankdepositupgrade.css'
import useSound from "../hooks/usePurchaceSound.jsx";
import usePurchaceRejectSound from "../hooks/usePurchaceRejectSound.jsx";

const BankDepositComponent = ({ image, upgradeLevel }) => {
  const { count, setCount, currentDate } = useUpgrade();
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositPeriod, setDepositPeriod] = useState(1);
  const [activeDeposits, setActiveDeposits] = useState([]);

  const selectedImage = images[image];
  const upgradeSoundEffect = useSound();
  const rejectSoundEffect = usePurchaceRejectSound();

  const handleDeposit = () => {
    switch (true) {
      case activeDeposits.length > 0:
        rejectSoundEffect();
        Swal.fire("Active Deposit", "You already have an active deposit. Please wait until it matures before making a new one.", "error");
        break;
      case depositAmount < 20 && depositPeriod <= 0:
        rejectSoundEffect();
        Swal.fire("Invalid Deposit Amount and Period", "Minimum deposit amount is $20 and minimum deposit period is 1 month.", "error");
        break;
      case depositAmount <= 0:
        rejectSoundEffect();
        Swal.fire("Invalid Deposit Amount", "Deposit amount must be greater than $0.", "error");
        break;
      case depositAmount < 20:
        rejectSoundEffect();
        Swal.fire("Invalid Deposit Amount", "Minimum deposit amount is $20.", "error");
        break;
      case depositPeriod < 1:
        rejectSoundEffect();
        Swal.fire("Invalid Deposit Period", "Minimum deposit period is 1 month.", "error");
        break;
      case depositAmount > count:
        rejectSoundEffect();
        Swal.fire("Not enough money", "You do not have enough money for this deposit.", "error");
        break;

      default:
        upgradeSoundEffect();
        setCount(count - depositAmount);
        const endDepositDate = new Date(currentDate);
        endDepositDate.setMonth(endDepositDate.getMonth() + depositPeriod);

        const newDeposit = {
          amount: depositAmount,
          period: depositPeriod,
          endDate: endDepositDate,
        };

        setActiveDeposits([newDeposit]);
        setDepositAmount(0);
        setDepositPeriod(1);
        break;
    }
  };

  useEffect(() => {
    const handleMaturedDeposits = () => {
      const now = new Date(currentDate);
      const maturedDeposits = activeDeposits.filter(deposit => now >= new Date(deposit.endDate));
      const remainingDeposits = activeDeposits.filter(deposit => now < new Date(deposit.endDate));
  
      maturedDeposits.forEach(deposit => {
        const interest = Math.round(deposit.amount * 0.05 * deposit.period);
        setCount(prevCount => prevCount + deposit.amount + interest);
        Swal.fire("Deposit Completed", `Your deposit has matured. You earned $${interest} in interest.`, "success");
      });
  
      setActiveDeposits(remainingDeposits);
    };
  
    handleMaturedDeposits();
  }, [currentDate, setCount]);

  return (
    <div className="click-upgrade-box-container">
      <div className="click-upgrade-box-left">
        <img className="click-asset-image" src={selectedImage} />
        <div className="click-upgrade-level">Lvl.{upgradeLevel}</div>
      </div>
      <div className="click-upgrade-box-right">
        <div className="click-upgrade-title">Bank Deposit 5%</div>
        <div className="inside-container">
          <div className="deposit-inputs">
            <div>
              <p>Amount:</p>
              <input
                type="number"
                placeholder="Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Math.floor(Number(e.target.value)))}
              />
            </div>
            <div>
              <p>Time (mth):</p>
              <input
                type="number"
                placeholder="Months"
                value={depositPeriod}
                onChange={(e) => setDepositPeriod(Math.floor(Number(e.target.value)))}
              />
            </div>
          </div>
          <button className="click-upgrade-button" onClick={handleDeposit}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDepositComponent;
