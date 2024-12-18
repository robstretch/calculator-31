import { CDInterestResult, CompoundingFrequency } from './types';

const FREQUENCIES = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1
};

export function calculateCDInterest(
  principal: number,
  rate: number,
  term: number,
  compoundingFrequency: CompoundingFrequency = 'daily',
  earlyWithdrawal?: number
): CDInterestResult {
  const n = FREQUENCIES[compoundingFrequency];
  const t = term;
  const r = rate / 100;

  // Calculate APY
  const apy = (Math.pow(1 + r/n, n) - 1) * 100;

  // Calculate final balance using compound interest formula
  const finalBalance = principal * Math.pow(1 + r/n, n * t);
  const totalInterest = finalBalance - principal;

  // Calculate monthly interest amounts
  const monthlyInterest: number[] = [];
  const yearlyTotals: { year: number; interest: number; balance: number; }[] = [];
  let currentBalance = principal;
  let yearlyInterest = 0;

  for (let month = 1; month <= term * 12; month++) {
    const monthlyRate = r / 12;
    const interest = currentBalance * monthlyRate;
    currentBalance += interest;
    monthlyInterest.push(interest);

    yearlyInterest += interest;

    if (month % 12 === 0) {
      yearlyTotals.push({
        year: month / 12,
        interest: yearlyInterest,
        balance: currentBalance
      });
      yearlyInterest = 0;
    }
  }

  // Calculate early withdrawal penalty if applicable
  let earlyWithdrawalPenalty: number | undefined;
  if (earlyWithdrawal !== undefined) {
    // Typical penalty is 3-6 months of interest for early withdrawal
    const penaltyMonths = term <= 1 ? 3 : 6;
    const averageMonthlyInterest = totalInterest / (term * 12);
    earlyWithdrawalPenalty = averageMonthlyInterest * penaltyMonths;
  }

  // Generate recommendations based on term and rate
  const recommendations = [
    {
      category: 'Term Selection',
      suggestion: rate > 4 ? 'Consider locking in this favorable rate for a longer term' :
                 'Compare rates with other terms to maximize returns'
    },
    {
      category: 'Compounding Frequency',
      suggestion: compoundingFrequency === 'daily' ? 'Daily compounding maximizes returns' :
                 'Consider CDs with more frequent compounding'
    },
    {
      category: 'Investment Strategy',
      suggestion: term > 2 ? 'Consider CD laddering to maintain liquidity' :
                 'Short term provides flexibility but may miss higher rates'
    },
    {
      category: 'Risk Management',
      suggestion: 'Ensure FDIC insurance coverage for full amount'
    }
  ];

  return {
    finalBalance,
    totalInterest,
    apy,
    monthlyInterest,
    yearlyTotals,
    earlyWithdrawalPenalty,
    recommendations
  };
}