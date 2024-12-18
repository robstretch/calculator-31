export interface CDResult {
  finalBalance: number;
  totalInterest: number;
  apy: number;
  monthlyInterest: number[];
  yearlyTotals: {
    year: number;
    interest: number;
    balance: number;
  }[];
}

export function calculateCD(
  principal: number,
  rate: number,
  years: number,
  compoundingFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually' = 'daily'
): CDResult {
  const frequencies = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };

  const n = frequencies[compoundingFrequency];
  const t = years;
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

  for (let month = 1; month <= years * 12; month++) {
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

  return {
    finalBalance,
    totalInterest,
    apy,
    monthlyInterest,
    yearlyTotals
  };
}