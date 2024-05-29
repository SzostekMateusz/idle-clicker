import React, { createContext, useContext, useState } from "react";
import { useMouseClickingUpgrade } from "../hooks/MouseClickingUpgrade";
import { usePassiveIncomeUpgrade } from "../hooks/passiveIncomeUpgrade";
import { PassiveBankIncomeUpgrade } from "../hooks/BankIncomeUpgrade";
import RaffleUpgrade from "../hooks/RaffleUpgrade";
import { usePurchaceMultiplier } from "../hooks/usePurchaceMultiplier";
import { calculateTotalCost } from "../utils/calculateTotalCost";

const UpgradeContext = createContext();

export const useUpgrade = () => useContext(UpgradeContext);

export const UpgradeProvider = ({ children }) => {

  const {
    clicked,
    count,
    setCount,
    multiplier,
    handleClick,
    increaseValue,
    addOne,
    addOneLevel,
    addOneUpgradeCost,
    cashUpgrade,
    cashUpgradeCost,
    cashIncome,
    cashUpgradeLevel,
    totalIncome,
    setTotalIncome,
    totalMoneySpent,
    setTotalMoneySpent,
  } = useMouseClickingUpgrade();

  const {
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  } = usePassiveIncomeUpgrade(count, setCount, setTotalIncome, setTotalMoneySpent);

  const {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  } = PassiveBankIncomeUpgrade(count, setCount, setTotalIncome, setTotalMoneySpent);

  const {
    raffle, raffleCost 
  } = RaffleUpgrade(count, setCount);

  const {
    purchaceMultiplierState,
    setPurchaceMultiplierState,  
  } = usePurchaceMultiplier();
  
  

  return (
    <UpgradeContext.Provider
      value={{
        clicked,
        count,
        multiplier,
        handleClick,
        increaseValue,
        addOne,
        addOneLevel,
        addOneUpgradeCost,
        passiveIncomeUpgrade,
        passiveIncomeLevel,
        passiveIncomeUpgradeCost,
        cashUpgrade,
        cashUpgradeCost,
        cashIncome,
        cashUpgradeLevel,
        totalIncome,
        passiveBankIncomeUpgrade,
        passiveBankLevel,
        passiveBankUpgradeCost,
        totalMoneySpent,
        setTotalMoneySpent,
        raffle,
        raffleCost,
        purchaceMultiplierState,
        setPurchaceMultiplierState,
        calculateTotalCost,
        cashUpgrade,
        cashUpgradeCost,
        cashIncome, 
        cashUpgradeLevel,
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};
