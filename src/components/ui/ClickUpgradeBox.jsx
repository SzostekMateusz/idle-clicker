import React from 'react';
import "./clickupgradebox.css";
import images from "../../imageImport.js";
import Swal from "sweetalert2";

const ClickUpgradeBox = ({ title, upgradePrice, image, onClick, upgradeLevel, upgradeCost, multiplier }) => {
  const selectedImage = images[image];

  const handleUpgradeClick = () => {
    onClick(() => {
      
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough credits. You need ${upgradeCost} coins.`,
        confirmButtonText: 'OK'
      });
    });
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
        <div className="clicks-per-upgrade">
          +{multiplier} per Click
        </div>
        
          <button className="click-upgrade-button" onClick={handleUpgradeClick}>
            Upgrade {upgradePrice}$
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClickUpgradeBox;
