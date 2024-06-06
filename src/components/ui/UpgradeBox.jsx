import React, { useEffect, useState, useRef } from 'react';
import "./upgradebox.css";
import images from "../../imageImport.js";

const UpgradeBox = ({ title, upgradePrice, image, onClick, upgradeLevel }) => {
  const [progress, setProgress] = useState(0);
  const [isProgressActive, setIsProgressActive] = useState(false);
  const animationFrameId = useRef(null);
  const startTime = useRef(null);

  const selectedImage = images[image];

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;

      if (elapsed >= 2000) {
        setProgress(0);
        startTime.current = timestamp;
      } else {
        setProgress((elapsed / 2000) * 100);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (isProgressActive) {
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isProgressActive]);

  const handleUpgradeClick = () => {
    onClick();
    setProgress(0); // Reset progress to 0
    startTime.current = null; // Reset start time
    if (!isProgressActive) {
      setIsProgressActive(true);
    }
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
          <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
          </div>
          <button className="upgrade-button" onClick={handleUpgradeClick}>
            Upgrade {upgradePrice}$
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeBox;
