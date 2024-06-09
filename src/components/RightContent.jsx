import React, { useState, useEffect } from "react";
import "./rightcontent.css";
import MultiplierBtn from "./ui/MultiplierBtn";
import UpgradeBox from "./ui/UpgradeBox";
import { useUpgrade } from "../context/UpgradeContext";
import useClickSound from '../hooks/useClickSound';

const RightContent = () => {

  const playClickSound = useClickSound();

  const {
    addOne,
    addOneLevel,
    addOneUpgradeCost,
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
    cashUpgrade,
    cashUpgradeCost,
    cashUpgradeLevel,
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
    raffle,
    raffleCost,
    purchaceMultiplierState,
    setPurchaceMultiplierState,
    calculateTotalCost,
  } = useUpgrade();

  const [selectedMultiplier, setSelectedMultiplier] = useState(1);

  useEffect(() => {
    setPurchaceMultiplierState(1);
  }, [setPurchaceMultiplierState]);

  const handleMultiplierClick = (multiplier) => {
    setPurchaceMultiplierState(multiplier);
    setSelectedMultiplier(multiplier);
    playClickSound();
  };

  return (
    <div className="rightContent">
      <div className="multiplier-containter">
        <MultiplierBtn multiplier={1} onClick={() => handleMultiplierClick(1)} isSelected={selectedMultiplier === 1} />
        <MultiplierBtn multiplier={5} onClick={() => handleMultiplierClick(5)} isSelected={selectedMultiplier === 5} />
        <MultiplierBtn multiplier={10} onClick={() => handleMultiplierClick(10)} isSelected={selectedMultiplier === 10} />
        <MultiplierBtn multiplier={25} onClick={() => handleMultiplierClick(25)} isSelected={selectedMultiplier === 25} />
      </div>
      <div className="upgrades-containter">
        <UpgradeBox
          title="Coin"
          upgradePrice={calculateTotalCost(addOneUpgradeCost, addOneLevel, purchaceMultiplierState)}
          image="coin"
          onClick={addOne}
          upgradeLevel={addOneLevel}
          upgradeCost={calculateTotalCost(addOneUpgradeCost, addOneLevel, purchaceMultiplierState)}
        />
        <UpgradeBox
          title="Golden Billet"
          upgradePrice={calculateTotalCost(passiveIncomeUpgradeCost, passiveIncomeLevel, purchaceMultiplierState)}
          image="golden_billet"
          onClick={passiveIncomeUpgrade}
          upgradeLevel={passiveIncomeLevel}
          upgradeCost={calculateTotalCost(passiveIncomeUpgradeCost, passiveIncomeLevel, purchaceMultiplierState)}
        />
        <UpgradeBox
          title="Cash"
          upgradePrice={calculateTotalCost(cashUpgradeCost, cashUpgradeLevel, purchaceMultiplierState)}
          image="cash"
          onClick={cashUpgrade}
          upgradeLevel={cashUpgradeLevel}
          upgradeCost={calculateTotalCost(cashUpgradeCost, cashUpgradeLevel, purchaceMultiplierState)}
        />
        <UpgradeBox
          title="Bank Deposit"
          upgradePrice={calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState)}
          image="bank"
          onClick={passiveBankIncomeUpgrade}
          upgradeLevel={passiveBankLevel}
          upgradeCost={calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState)}
        />
        <UpgradeBox
          title="Raffle"
          upgradePrice={raffleCost}
          image="raffle"
          onClick={raffle}
          upgradeLevel="-"
          upgradeCost={raffleCost}
        />
      </div>
    </div>
  );
};

export default RightContent;
