import React, { useState } from 'react';
import "./clickupgradebox.css";
import images from "../../imageImport.js";
import Swal from "sweetalert2";

const RaffleUpgradeBox = ({ title, image, onClick, upgradeLevel, raffleWins, raffleLoses }) => {
  const [raffleAmount, setRaffleAmount] = useState(0);
  const selectedImage = images[image];

  const handleUpgradeClick = () => {
    if (raffleAmount > 0) {
      onClick(raffleAmount);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Please enter a valid amount to enter the raffle.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="click-upgrade-box-container">
      <div className="click-upgrade-box-left">
        <img className="click-asset-image" src={selectedImage} alt={title} />
        <div className="click-upgrade-level">Lvl.{upgradeLevel}</div>
      </div>
      <div className="click-upgrade-box-right">
        <div className="click-upgrade-title">{title}</div>
        <div className="click-cont-smt">
          <div className="raffle-input">
            <input
              type="number"
              value={raffleAmount}
              onChange={(e) => setRaffleAmount(Math.floor(Number(e.target.value)))}
            />
          </div>
          <button className="click-upgrade-button" onClick={handleUpgradeClick}>
            Enter Raffle
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaffleUpgradeBox;
