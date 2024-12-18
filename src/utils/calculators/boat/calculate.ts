import { BoatLoanResult } from './types';

const INSURANCE_RATE = 0.015; // 1.5% of boat value per year
const MAINTENANCE_RATE = 0.02; // 2% of boat value per year

export function calculateBoatLoan(
  boatPrice: number,
  downPayment: number,
  interestRate: number,
  loanTerm: number
): BoatLoanResult {
  const loanAmount = boatPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  
  // Calculate monthly payment using amortization formula
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate amortization schedule
  let balance = loanAmount;
  const schedule = [];
  let totalInterestPaid = 0;

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    totalInterestPaid += interestPayment;

    schedule.push({
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance)
    });
  }

  // Calculate additional costs
  const annualInsurance = boatPrice * INSURANCE_RATE;
  const annualMaintenance = boatPrice * MAINTENANCE_RATE;
  const totalCostOfOwnership = monthlyPayment * totalPayments + 
    (annualInsurance + annualMaintenance) * loanTerm;

  return {
    monthlyPayment,
    totalPayment: monthlyPayment * totalPayments,
    totalInterest: totalInterestPaid,
    amortizationSchedule: schedule,
    insuranceEstimate: annualInsurance,
    maintenanceEstimate: annualMaintenance,
    totalCostOfOwnership
  };
}