 import './upgradebox.css';
 import images from '../../imageImport.js'

const UpgradeBox = ({ title, upgradePrice, image, onClick }) => {
  const selectedImage = images[image];

    return (
        <div className="upgrade-box-containter">
          <div className="upgrade-box-left">
            <img className="asset-image" src={selectedImage} alt={title} />
          </div>
          <div className="upgrade-box-right">
            <h2>{title}</h2>
            <div className="cont-smt">
              <div className="progress-bar"></div>
              <button id="upgrade-button" onClick={onClick}>Upgrade {upgradePrice}$</button>
            </div>
          </div>
        </div>
      );
    }
    
    export default UpgradeBox;