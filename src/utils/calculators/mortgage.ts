export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function calculateMortgage(
  principal: number,
  interestRate: number,
  years: number,
  downPayment: number = 0
): MortgageResult {
  const P = principal - downPayment;
  const r = interestRate / 100 / 12;
  const n = years * 12;

  const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - P;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100
  };
}