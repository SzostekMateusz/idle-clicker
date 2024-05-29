import { useState } from "react";

export const usePurchaceMultiplier = () => {
  const [purchaceMultiplierState, setPurchaceMultiplierState] = useState(1);

  return { 
    purchaceMultiplierState,
    setPurchaceMultiplierState,
  };
};
