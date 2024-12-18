export interface PayRaiseResult {
  newSalary: number;
  difference: number;
  percentageIncrease: number;
  monthlyIncrease: number;
  biweeklyIncrease: number;
  weeklyIncrease: number;
  hourlyIncrease: number;
  taxImpact: {
    oldTax: number;
    newTax: number;
    difference: number;
  };
}

export function calculatePayRaise(
  currentSalary: number,
  raiseAmount: number,
  raiseType: 'percentage' | 'amount',
  taxRate: number = 22
): PayRaiseResult {
  const newSalary = raiseType === 'percentage'
    ? currentSalary * (1 + raiseAmount / 100)
    : currentSalary + raiseAmount;

  const difference = newSalary - currentSalary;
  const percentageIncrease = (difference / currentSalary) * 100;

  // Calculate tax impact
  const oldTax = currentSalary * (taxRate / 100);
  const newTax = newSalary * (taxRate / 100);

  return {
    newSalary,
    difference,
    percentageIncrease,
    monthlyIncrease: difference / 12,
    biweeklyIncrease: difference / 26,
    weeklyIncrease: difference / 52,
    hourlyIncrease: difference / 2080, // Based on 40-hour work week
    taxImpact: {
      oldTax,
      newTax,
      difference: newTax - oldTax
    }
  };
}