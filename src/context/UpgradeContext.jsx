import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import ConfettiComponent from "../components/ConfettiComponent"; 
import { useMouseClickingUpgrade } from "../hooks/MouseClickingUpgrade";
import { usePassiveIncomeUpgrade } from "../hooks/passiveIncomeUpgrade";
import { PassiveBankIncomeUpgrade } from "../hooks/BankIncomeUpgrade";
import RaffleUpgrade from "../hooks/RaffleUpgrade";
import { usePurchaceMultiplier } from "../hooks/usePurchaceMultiplier";
import { CashIncomeUpgrade } from "../hooks/CashIncomeUpgrade";
import { calculateTotalCost } from "../utils/calculateTotalCost";
import { BitcoinIncomeUpgrade } from "../hooks/BitcoinClickingUpgrade";
import useVictorySound from '../hooks/useVictorySound';
import rich_guy from '../assets/rich_guy.jpeg';

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

  // Statistic data
  const [clickedCounter, setClickedCounter] = useState(0);
  const [passiveCounter, setPassiveCounter] = useState(0);

  // Date state
  const [startDate, setStartDate] = useState(new Date()); // Initialize with current date

  const {
    clicked,
    multiplier,
    handleClick,
    increaseValue,
    addOne,
    addOneLevel,
    addOneUpgradeCost,
  } = useMouseClickingUpgrade(count, setCount, totalIncome, setTotalIncome, totalMoneySpent, setTotalMoneySpent, purchaceMultiplierState, clickedCounter, setClickedCounter); // Przekazujemy clickedCounter

  const {
    passiveIncomeUpgrade,
    passiveIncomeLevel,
    passiveIncomeUpgradeCost,
  } = usePassiveIncomeUpgrade(count, setCount, setTotalIncome, setTotalMoneySpent, purchaceMultiplierState, passiveCounter, setPassiveCounter);

  const {
    passiveBankIncomeUpgrade,
    passiveBankLevel,
    passiveBankUpgradeCost,
  } = PassiveBankIncomeUpgrade(count, setCount, setTotalIncome, setTotalMoneySpent, purchaceMultiplierState, passiveCounter, setPassiveCounter);

  const {
    raffle, raffleCost, raffleWins, raffleLoses
  } = RaffleUpgrade(count, setCount);

  const {
    cashUpgrade,
    cashUpgradeCost,
    cashIncome,
    cashUpgradeLevel,
  } = CashIncomeUpgrade(count, setCount, setTotalMoneySpent, purchaceMultiplierState, increaseValue);

  const {
    bitcoinUpgrade,
    bitcoinUpgradeCost,
    bitcoinIncome,
    bitcoinUpgradeLevel,
  } = BitcoinIncomeUpgrade(count, setCount, setTotalMoneySpent, purchaceMultiplierState, increaseValue);

  // Funkcja do aktualizacji daty startowej
  const updateStartDate = (newDate) => {
    setStartDate(newDate);
  };

  const playVictorySound = useVictorySound();
  const alertShownRef = useRef(false); // Ref do śledzenia, czy alert został już pokazany

  const [confettiTrigger, setConfettiTrigger] = useState(false); // Stan do zarządzania konfetti

  useEffect(() => {
    if (count === 2 && !alertShownRef.current) {
      alertShownRef.current = true; // Ustawienie ref na true, aby upewnić się, że alert jest wyświetlany tylko raz
      playVictorySound();
      setConfettiTrigger(true); // Uruchamiamy konfetti
      Swal.fire({
        title: "Congrats!!!<br> You are the richest person in the world!",
        text: "Do you want to keep playing?",
        imageUrl: rich_guy,
        imageAlt: "Congrats Image",
        showDenyButton: true,
        confirmButtonColor: "#234a04",
        denyButtonColor: "#992903",
        confirmButtonText: "Keep playing",
        denyButtonText: "Restart the game",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        setConfettiTrigger(false); // Wyłączamy konfetti po zamknięciu alertu
        if (result.isConfirmed) {
          Swal.close();
        } else if (result.isDenied) {
          Swal.fire({
            title: "Restarted!",
            text: "The game has been restarted.",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false
          });
          setCount(0);
          alertShownRef.current = false; // Reset ref po restarcie
          //moze reload strony, zeby wszystko zresetowac? 
        }
      });
    }
  }, [count, playVictorySound]);

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
        raffleWins,
        raffleLoses,
        purchaceMultiplierState,
        setPurchaceMultiplierState,
        calculateTotalCost,
        bitcoinUpgrade,
        bitcoinUpgradeCost,
        bitcoinIncome,
        bitcoinUpgradeLevel,
        clickedCounter, // Dodajemy clickedCounter do kontekstu
        setClickedCounter,
        passiveCounter,
        startDate, // Przekazujemy startDate do kontekstu
        updateStartDate, // Funkcja do aktualizacji startDate
      }}
    >
      {children}
      <ConfettiComponent trigger={confettiTrigger} /> {/* Dodajemy komponent ConfettiComponent */}
    </UpgradeContext.Provider>
  );
};
