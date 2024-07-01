import React, { useState, useEffect } from "react";
import { useUpgrade } from "../context/UpgradeContext";
import Swal from "sweetalert2";
import images from "../imageImport.js";
import './bankdepositupgrade.css'
import useSound from "../hooks/usePurchaceSound.jsx";

const BankDepositComponent = ({image, upgradeLevel}) => {
  const { count, setCount, currentDate, updateCurrentDate } = useUpgrade();
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositPeriod, setDepositPeriod] = useState(0);
  const [isDepositActive, setIsDepositActive] = useState(false);
  const [endDate, setEndDate] = useState(null);

  const selectedImage = images[image];
  const upgradeSoundEffect = useSound();


  const handleDeposit = () => {
    if (depositAmount < 20) {
      Swal.fire("Invalid Deposit Amount", "Minimum deposit amount is $20.", "error");

      return;
    }

    if (depositAmount >= 20 && depositAmount > count) {
      Swal.fire("Not enough money", "You do not have enough money for this deposit.", "error");
      return;
    }

    if (depositAmount > count) {
      Swal.fire("Not enough money", "You do not have enough money for this deposit.", "error");
      return;
    }
    upgradeSoundEffect()
    setCount(count - depositAmount);
    const endDepositDate = new Date(currentDate);
    endDepositDate.setMonth(endDepositDate.getMonth() + depositPeriod);
    setEndDate(endDepositDate);
    setIsDepositActive(true);
  };

  useEffect(() => {
    if (isDepositActive && endDate && currentDate >= endDate) {
      const months = depositPeriod;
      const interest = depositAmount * 0.05 * months;
      setCount(count + depositAmount + interest);
      setIsDepositActive(false);
      Swal.fire("Deposit Completed", `Your deposit has matured. You earned $${interest.toFixed(0)} in interest.`, "success");
    }
  }, [currentDate, endDate, isDepositActive, depositAmount, depositPeriod, count, setCount]);

  return (
    <div className="click-upgrade-box-container">
      <div className="click-upgrade-box-left">
        <img className="click-asset-image" src={selectedImage}/>
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
                onChange={(e) => setDepositAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <p>Time (mth):</p>
              <input
                type="number"
                placeholder="Months"
                value={depositPeriod}
                onChange={(e) => setDepositPeriod(Number(e.target.value))}
              />
            </div>
          </div>
          <button className="click-upgrade-button" onClick={handleDeposit} disabled={isDepositActive}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDepositComponent;
