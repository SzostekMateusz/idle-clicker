import { useState } from "react";

export const usePurchaceMultiplier = () => {
  const [PurchaceMultiplierState, setPurchaceMultiplierState] = useState(1);

  return {
    PurchaceMultiplierState,
    setPurchaceMultiplierState,
  };
};
