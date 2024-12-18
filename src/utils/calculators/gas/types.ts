export interface GasCalculatorResult {
  totalCost: number;
  costPerMile: number;
  gallonsNeeded: number;
  tripCost: number;
  monthlyCommuteCost: number;
  yearlyCommuteCost: number;
  co2Emissions: number; // in pounds
}