import React, { useEffect, useState, useRef } from 'react';
import "./upgradebox.css";
import images from "../../imageImport.js";
import Swal from "sweetalert2";

const UpgradeBox = ({ title, upgradePrice, image, onClick, upgradeLevel, upgradeCost }) => {
  const [progress, setProgress] = useState(0);
  const [isProgressActive, setIsProgressActive] = useState(false);
  const animationFrameId = useRef(null);
  const startTime = useRef(null);
  const intervalDuration = 2000;

  const selectedImage = images[image];

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;

      if (elapsed >= intervalDuration) {
        setProgress(0);
        startTime.current = timestamp;
      } else {
        setProgress((elapsed / intervalDuration) * 100);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (isProgressActive) {
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isProgressActive]);

  const handleUpgradeClick = () => {
    onClick(() => {
      setProgress(0);
      startTime.current = null;
      if (!isProgressActive) {
        setIsProgressActive(true);
      }
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
    <div className="upgrade-box-containter">
      <div className="upgrade-box-left">
        <img className="asset-image" src={selectedImage} alt={title} />
        <div className="upgrade-level">Lvl.{upgradeLevel}</div>
      </div>
      <div className="upgrade-box-right">
        <div className="upgrade-title">{title}</div>
        <div className="cont-smt">
          <progress className="progress-bar" value={progress} max="100"></progress>
          <button className="upgrade-button" onClick={handleUpgradeClick}>
            Upgrade {upgradePrice}$
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeBox;