import { InvestmentInput, InvestmentResult } from './types';

const COMPOUND_PERIODS = {
  monthly: 12,
  quarterly: 4,
  annually: 1
};

function calculateEffectiveRate(nominalRate: number, periodsPerYear: number): number {
  return Math.pow(1 + nominalRate / periodsPerYear, periodsPerYear) - 1;
}

function calculateRealReturn(nominalReturn: number, inflationRate: number): number {
  return ((1 + nominalReturn) / (1 + inflationRate)) - 1;
}

export function calculateInvestment(input: InvestmentInput): InvestmentResult {
  const periodsPerYear = COMPOUND_PERIODS[input.compoundingFrequency];
  const periodicRate = input.annualReturn / 100 / periodsPerYear;
  const totalPeriods = input.years * periodsPerYear;
  
  let balance = input.initialAmount;
  const yearlyBreakdown = [];
  let totalContributions = input.initialAmount;
  let yearContributions = 0;
  let yearEarnings = 0;

  // Calculate effective annual rate
  const effectiveAnnualRate = calculateEffectiveRate(input.annualReturn / 100, periodsPerYear);
  
  // Calculate real return rate if inflation provided
  const realReturnRate = input.inflationRate ? 
    calculateRealReturn(effectiveAnnualRate, input.inflationRate / 100) : 
    undefined;

  for (let period = 1; period <= totalPeriods; period++) {
    const startBalance = balance;
    const contribution = input.monthlyContribution * (12 / periodsPerYear);
    
    // Calculate interest earned
    const earnings = (balance + contribution) * periodicRate;
    balance = balance + contribution + earnings;
    
    totalContributions += contribution;
    yearContributions += contribution;
    yearEarnings += earnings;

    // Add yearly breakdown
    if (period % periodsPerYear === 0) {
      const year = period / periodsPerYear;
      const inflationAdjusted = input.inflationRate ? 
        balance / Math.pow(1 + input.inflationRate / 100, year) : 
        undefined;

      yearlyBreakdown.push({
        year,
        balance,
        contributions: yearContributions,
        earnings: yearEarnings,
        inflationAdjusted
      });

      yearContributions = 0;
      yearEarnings = 0;
    }
  }

  // Calculate taxable amount if tax rate provided
  const taxableAmount = input.taxRate ? 
    (balance - totalContributions) * (input.taxRate / 100) : 
    undefined;

  // Generate recommendations
  const recommendations = [
    {
      category: 'Compounding Frequency',
      suggestion: periodsPerYear < 12 ? 
        'Consider monthly compounding to maximize returns' :
        'You\'re maximizing compound interest with monthly compounding'
    },
    {
      category: 'Contribution Strategy',
      suggestion: input.monthlyContribution < input.initialAmount / 24 ?
        'Consider increasing monthly contributions to build wealth faster' :
        'Strong contribution strategy for long-term growth'
    },
    {
      category: 'Risk and Return',
      suggestion: input.annualReturn > 12 ?
        'Consider diversification to manage higher risk' :
        'Balance matches typical long-term market returns'
    },
    {
      category: 'Tax Efficiency',
      suggestion: 'Consider tax-advantaged accounts like 401(k) or IRA'
    }
  ];

  return {
    finalBalance: balance,
    totalContributions,
    totalEarnings: balance - totalContributions,
    inflationAdjustedBalance: input.inflationRate ? 
      balance / Math.pow(1 + input.inflationRate / 100, input.years) : 
      undefined,
    yearlyBreakdown,
    metrics: {
      effectiveAnnualRate: effectiveAnnualRate * 100,
      realReturnRate: realReturnRate ? realReturnRate * 100 : undefined,
      taxableAmount
    },
    recommendations
  };
}