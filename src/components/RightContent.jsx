import React, { useState, useEffect } from "react";
import "./rightcontent.css";
import MultiplierBtn from "./ui/MultiplierBtn";
import UpgradeBox from "./ui/UpgradeBox";
import ClickUpgradeBox from "./ui/ClickUpgradeBox";
import { useUpgrade } from "../context/UpgradeContext";
import useClickSound from '../hooks/useClickSound';
import RaffleUpgradeBox from "./ui/RaffleUpgradeBox";
import BankDepositComponent from "./BankDepositUpgrade.jsx"

const formatNumber = (value) => {
  if (value < 1000) {
    return value.toString();
  } else if (value >= 1000 && value < 1000000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else if (value >= 1000000 && value < 1000000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + ' mln';
  } else if (value >= 1000000000 && value < 1000000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + ' mld';
  } else if (value >= 1000000000000 && value < 1000000000000000) {
    return (value / 1000000000000).toFixed(1).replace(/\.0$/, '') + ' bln';
  }
};

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
    raffleWins,
    raffleLoses,
    purchaceMultiplierState,
    setPurchaceMultiplierState,
    calculateTotalCost,
    multiplier,
    bitcoinUpgrade,
    bitcoinUpgradeCost,
    bitcoinUpgradeLevel,
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
        <MultiplierBtn multiplier={2} onClick={() => handleMultiplierClick(2)} isSelected={selectedMultiplier === 2} />
        <MultiplierBtn multiplier={5} onClick={() => handleMultiplierClick(5)} isSelected={selectedMultiplier === 5} />
        <MultiplierBtn multiplier={10} onClick={() => handleMultiplierClick(10)} isSelected={selectedMultiplier === 10} />
      </div>
      <div className="upgrades-containter">
        <ClickUpgradeBox
          title="Coin"
          upgradePrice={formatNumber(calculateTotalCost(addOneUpgradeCost, addOneLevel, purchaceMultiplierState))}
          image="coin"
          onClick={addOne}
          upgradeLevel={addOneLevel}
          upgradeCost={calculateTotalCost(addOneUpgradeCost, addOneLevel, purchaceMultiplierState)}
          multiplier={multiplier}
        />
        <UpgradeBox
          title="Golden Billet"
          upgradePrice={formatNumber(calculateTotalCost(passiveIncomeUpgradeCost, passiveIncomeLevel, purchaceMultiplierState))}
          image="golden_billet"
          onClick={passiveIncomeUpgrade}
          upgradeLevel={passiveIncomeLevel}
          upgradeCost={calculateTotalCost(passiveIncomeUpgradeCost, passiveIncomeLevel, purchaceMultiplierState)}
        />
        <ClickUpgradeBox
          title="Cash"
          upgradePrice={formatNumber(calculateTotalCost(cashUpgradeCost, cashUpgradeLevel, purchaceMultiplierState))}
          image="cash"
          onClick={cashUpgrade}
          upgradeLevel={cashUpgradeLevel}
          upgradeCost={calculateTotalCost(cashUpgradeCost, cashUpgradeLevel, purchaceMultiplierState)}
          multiplier={multiplier}
        />
        <UpgradeBox
          title="Real Estate"
          upgradePrice={formatNumber(calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState))}
          image="estate"
          onClick={passiveBankIncomeUpgrade}
          upgradeLevel={passiveBankLevel}
          upgradeCost={calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState)}
        />
        <ClickUpgradeBox
          title="Bitcoin"
          upgradePrice={formatNumber(calculateTotalCost(bitcoinUpgradeCost, bitcoinUpgradeLevel, purchaceMultiplierState))}
          image="bitcoin"
          onClick={bitcoinUpgrade}
          upgradeLevel={bitcoinUpgradeLevel}
          upgradeCost={calculateTotalCost(bitcoinUpgradeCost, bitcoinUpgradeLevel, purchaceMultiplierState)}
          multiplier={multiplier}
        />
        <RaffleUpgradeBox
          title="Raffle"
          image="raffle"
          onClick={raffle}
          upgradeLevel="-"
        />
        <BankDepositComponent 
          image="bank"
          upgradeLevel="-"
        />
      </div>
    </div>
  );
};

export default RightContent;
