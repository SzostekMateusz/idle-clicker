export const calculateTotalCost = (baseCost, level, purchaceMultiplier) => {
  let totalCost = 0;
  let cost = baseCost * Math.pow(2, level);
  for (let i = 0; i < purchaceMultiplier; i++) {
    totalCost += cost;
    cost *= 2;
  }
  return totalCost;
};