import { MortgagePointsInput, MortgagePointsResult } from './types';

function calculateMonthlyPayment(principal: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const payments = years * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
         (Math.pow(1 + monthlyRate, payments) - 1);
}

export function calculateMortgagePoints(input: MortgagePointsInput): MortgagePointsResult {
  // Calculate interest rates
  const baseRate = input.interestRate;
  const reducedRate = baseRate - (input.points * 0.25); // Each point typically reduces rate by 0.25%
  
  // Calculate monthly payments
  const basePayment = calculateMonthlyPayment(input.loanAmount, baseRate, input.loanTerm);
  const reducedPayment = calculateMonthlyPayment(input.loanAmount, reducedRate, input.loanTerm);
  
  // Calculate costs and savings
  const monthlySavings = basePayment - reducedPayment;
  const totalPointsCost = (input.points * input.pointCost * input.loanAmount) / 100;
  const breakEvenMonths = Math.ceil(totalPointsCost / monthlySavings);
  const lifetimeSavings = (monthlySavings * input.loanTerm * 12) - totalPointsCost;

  const calculations = [
    {
      step: 'Base Monthly Payment',
      formula: 'P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
      result: basePayment
    },
    {
      step: 'Reduced Monthly Payment',
      formula: 'P * (r_reduced * (1 + r_reduced)^n) / ((1 + r_reduced)^n - 1)',
      result: reducedPayment
    },
    {
      step: 'Points Cost',
      formula: 'Points * Point Cost * Loan Amount / 100',
      result: totalPointsCost
    },
    {
      step: 'Break-even Period',
      formula: 'Total Points Cost / Monthly Savings',
      result: breakEvenMonths
    }
  ];

  const recommendations = [
    {
      category: 'Break-even Analysis',
      suggestion: breakEvenMonths < input.loanTerm * 12 * 0.3 ?
        'Buying points likely beneficial - short break-even period' :
        'Consider avoiding points - long break-even period'
    },
    {
      category: 'Interest Rate Impact',
      suggestion: input.points > 2 ?
        'High points cost - verify competitive base rate first' :
        'Moderate points strategy - good for rate reduction'
    },
    {
      category: 'Long-term Plans',
      suggestion: breakEvenMonths > 60 ?
        'Only buy points if planning to keep loan beyond 5 years' :
        'Points strategy aligns with typical homeownership duration'
    },
    {
      category: 'Alternative Strategy',
      suggestion: totalPointsCost > input.loanAmount * 0.01 ?
        'Consider larger down payment instead of points' :
        'Points cost reasonable relative to loan amount'
    }
  ];

  return {
    monthlyPaymentWithPoints: Math.round(reducedPayment * 100) / 100,
    monthlyPaymentWithoutPoints: Math.round(basePayment * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    totalPointsCost: Math.round(totalPointsCost * 100) / 100,
    breakEvenMonths,
    lifetimeSavings: Math.round(lifetimeSavings * 100) / 100,
    calculations,
    recommendations
  };
}