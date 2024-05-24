import React, { createContext, useContext } from "react";
import { useMouseClickingUpgrade } from "../hooks/MouseClickingUpgrade";
import { usePassiveIncomeUpgrade } from "../hooks/passiveIncomeUpgrade";
import { CashIncomeUpgrade } from "../hooks/CashIncomeUpgrade";

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
    cashUpgrade, // Dodaj cashUpgrade do zwracanych wartości
    cashUpgradeCost, // Dodaj cashUpgradeCost do zwracanych wartości
    cashIncome, // Dodaj cashIncome do zwracanych wartości
    cashUpgradeLevel
  } = useMouseClickingUpgrade();

  const {
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  } = usePassiveIncomeUpgrade(count, setCount);

  // const {
  //   cashUpgradeLevel,
  // } = CashIncomeUpgrade(count, setCount);

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
        cashUpgradeLevel
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};
