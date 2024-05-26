import React, { createContext, useContext } from "react";
import { useMouseClickingUpgrade } from "../hooks/MouseClickingUpgrade";
import { usePassiveIncomeUpgrade } from "../hooks/passiveIncomeUpgrade";
import { PassiveBankIncomeUpgrade } from "../hooks/BankIncomeUpgrade";

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
  } = useMouseClickingUpgrade();

  const {
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  } = usePassiveIncomeUpgrade(count, setCount, totalIncome, setTotalIncome);

  const {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  } = PassiveBankIncomeUpgrade(count, setCount, totalIncome, setTotalIncome);

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
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};
