import React, { createContext, useContext, useState } from "react";
import { useMouseClickingUpgrade } from "../hooks/MouseClickingUpgrade";
import { usePassiveIncomeUpgrade } from "../hooks/PassiveIncomeUpgrade";
import { PassiveBankIncomeUpgrade } from "../hooks/BankIncomeUpgrade";
import RaffleUpgrade from "../hooks/RaffleUpgrade";
import { usePurchaceMultiplier } from "../hooks/usePurchaceMultiplier";
import { CashIncomeUpgrade } from "../hooks/CashIncomeUpgrade";
import { calculateTotalCost } from "../utils/calculateTotalCost";

export const UpgradeContext = createContext();

export const useUpgrade = () => useContext(UpgradeContext);

export const UpgradeProvider = ({ children }) => {
  const {
    purchaceMultiplierState,
    setPurchaceMultiplierState,  
  } = usePurchaceMultiplier();

  const [count, setCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);

  const {
    clicked,
    multiplier,
    handleClick,
    increaseValue,
    addOne,
    addOneLevel,
    addOneUpgradeCost,
  } = useMouseClickingUpgrade(count, setCount, totalIncome, setTotalIncome, totalMoneySpent, setTotalMoneySpent, purchaceMultiplierState);

  const {
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  } = usePassiveIncomeUpgrade(count, setCount, setTotalIncome, setTotalMoneySpent, purchaceMultiplierState);

  const {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  } = PassiveBankIncomeUpgrade(count, setCount, setTotalIncome, setTotalMoneySpent, purchaceMultiplierState);

  const {
    raffle, raffleCost 
  } = RaffleUpgrade(count, setCount);

  const {
    cashUpgrade,
    cashUpgradeCost,
    cashIncome,
    cashUpgradeLevel,
  } = CashIncomeUpgrade(count, setCount, setTotalMoneySpent, purchaceMultiplierState);

  return (
    <UpgradeContext.Provider
      value={{
        clicked,
        count,
        setCount,
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
        setTotalIncome,
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
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};
