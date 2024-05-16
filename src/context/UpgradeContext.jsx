import React, { createContext, useContext, useEffect, useState } from "react";

const UpgradeContext = createContext();

export const useUpgrade = () => useContext(UpgradeContext);

export const UpgradeProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [addOneLevel, setAddOneLevel] = useState(0);

  const handleClick = () => {
    setCount(count + multiplier);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 80);
  };

  const increaseValue = (amount) => {
    setMultiplier((prevMultiplier) => prevMultiplier + amount);
  };

  const addOne = () => {
    const reqCoins = multiplier * 10;
    if (count >= reqCoins) {
      setMultiplier((prevMultiplier) => prevMultiplier + 1);
      setAddOneLevel((prevAddOneLevel) => prevAddOneLevel + 1);
      setCount((prevCount) => prevCount - reqCoins);
    } else {
      alert(`Not enough credits. You need ${reqCoins} coins.`);
    }
  };

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
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};
