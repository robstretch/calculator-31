import { calculateMortgage, MortgageResult } from './mortgage';

export function calculateAutoLoan(
  principal: number,
  interestRate: number,
  years: number,
  downPayment: number = 0
): MortgageResult {
  return calculateMortgage(principal, interestRate, years, downPayment);
}