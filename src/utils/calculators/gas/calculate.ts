export function calculateGas(
  distance: number,
  mpg: number,
  gasPrice: number,
  commuteDays: number = 0
): GasCalculatorResult {
  const gallonsNeeded = distance / mpg;
  const tripCost = gallonsNeeded * gasPrice;
  const monthlyCommuteCost = tripCost * 2 * commuteDays; // Round trip * days per month
  const yearlyCommuteCost = monthlyCommuteCost * 12;
  
  // Average CO2 emissions: 19.6 pounds per gallon of gasoline
  const co2Emissions = gallonsNeeded * 19.6;

  return {
    totalCost: tripCost,
    costPerMile: tripCost / distance,
    gallonsNeeded,
    tripCost,
    monthlyCommuteCost,
    yearlyCommuteCost,
    co2Emissions
  };
}