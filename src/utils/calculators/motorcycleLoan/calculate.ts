import { MotorcycleLoanInput, MotorcycleLoanResult } from './types';

const INSURANCE_RATES = {
  excellent: 500,  // Annual rate for credit score > 750
  good: 750,       // Annual rate for credit score > 700
  fair: 1000,      // Annual rate for credit score > 650
  poor: 1500       // Annual rate for credit score <= 650
};

const REGISTRATION_BASE = 200;
const MAINTENANCE_RATE = 0.02; // 2% of bike value per year

export function calculateMotorcycleLoan(input: MotorcycleLoanInput): MotorcycleLoanResult {
  const loanAmount = input.price - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const totalPayments = input.loanTerm * 12;
  
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
  let insuranceCost;
  if (input.includeInsurance) {
    if (input.creditScore && input.creditScore > 750) insuranceCost = INSURANCE_RATES.excellent;
    else if (input.creditScore && input.creditScore > 700) insuranceCost = INSURANCE_RATES.good;
    else if (input.creditScore && input.creditScore > 650) insuranceCost = INSURANCE_RATES.fair;
    else insuranceCost = INSURANCE_RATES.poor;
  }

  const registrationCost = REGISTRATION_BASE + (input.price * 0.001);
  const maintenanceCost = input.price * MAINTENANCE_RATE;

  const totalCosts = {
    insurance: insuranceCost,
    registration: registrationCost,
    maintenance: maintenanceCost,
    total: (insuranceCost || 0) + registrationCost + maintenanceCost
  };

  // Generate recommendations
  const recommendations = [
    {
      category: 'Down Payment',
      suggestion: input.downPayment < input.price * 0.2 ?
        'Consider larger down payment to reduce monthly costs' :
        'Good down payment amount for optimal loan terms'
    },
    {
      category: 'Loan Term',
      suggestion: input.loanTerm > 4 ?
        'Shorter loan term could save significant interest' :
        'Reasonable loan term for motorcycle financing'
    },
    {
      category: 'Insurance',
      suggestion: input.includeInsurance ?
        'Bundle with other policies for potential savings' :
        'Consider comprehensive coverage for better protection'
    },
    {
      category: 'Maintenance',
      suggestion: 'Budget for regular maintenance to protect your investment'
    }
  ];

  return {
    monthlyPayment,
    totalPayment: monthlyPayment * totalPayments,
    totalInterest: totalInterestPaid,
    amortizationSchedule: schedule,
    costs: totalCosts,
    recommendations
  };
}