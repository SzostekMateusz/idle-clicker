import React from "react";
import "./rightcontent.css";
import MultiplierBtn from "./ui/MultiplierBtn";
import UpgradeBox from "./ui/UpgradeBox";
import { useUpgrade } from "../context/UpgradeContext";


const RightContent = () => {
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

  return (
    <div className="rightContent">
      <div className="multiplier-containter">
        <MultiplierBtn multiplier={1} onClick={() => setPurchaceMultiplierState(1)}/>
        <MultiplierBtn multiplier={5} onClick={() => setPurchaceMultiplierState(5)}/>
        <MultiplierBtn multiplier={10} onClick={() => setPurchaceMultiplierState(10)}/>
        <MultiplierBtn multiplier={25} onClick={() => setPurchaceMultiplierState(25)}/>
      </div>
      <div className="upgrades-containter">
        <UpgradeBox
          title="Coin"
          upgradePrice={calculateTotalCost(addOneUpgradeCost, addOneLevel, purchaceMultiplierState)}
          image="coin"
          onClick={addOne}
          upgradeLevel={addOneLevel}
        />
        <UpgradeBox
          title="Golden Billet"
          upgradePrice={calculateTotalCost(passiveIncomeUpgradeCost, passiveIncomeLevel, purchaceMultiplierState)}
          image="golden_billet"
          onClick={passiveIncomeUpgrade}
          upgradeLevel={passiveIncomeLevel}
        />
        <UpgradeBox
          title="Cash"
          upgradePrice={calculateTotalCost(cashUpgradeCost, cashUpgradeLevel, purchaceMultiplierState)}
          image="cash"
          onClick={cashUpgrade}
          upgradeLevel={cashUpgradeLevel}
        />
        <UpgradeBox
          title="Bank Deposit"
          upgradePrice={calculateTotalCost(passiveBankUpgradeCost, passiveBankLevel, purchaceMultiplierState)}
          image="bank"
          onClick={passiveBankIncomeUpgrade}
          upgradeLevel={passiveBankLevel}
        />
        <UpgradeBox
          title="Raffle"
          upgradePrice={raffleCost}
          image="raffle"
          onClick={raffle}
          upgradeLevel="-"
        />
      </div>
    </div>
  );
};

export default RightContent;