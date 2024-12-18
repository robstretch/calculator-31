export interface APYResult {
  apy: number;
  totalInterest: number;
  finalBalance: number;
  compoundingPeriods: number;
  effectiveRate: number;
  periodicInterest: {
    period: number;
    balance: number;
    interest: number;
  }[];
}

export function calculateAPY(
  principal: number,
  interestRate: number,
  compoundingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually',
  years: number = 1
): APYResult {
  const frequencyMap = {
    daily: 365,
    weekly: 52,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };

  const n = frequencyMap[compoundingFrequency];
  const r = interestRate / 100;
  const t = years;
  
  // Calculate APY using the compound interest formula
  const apy = (Math.pow(1 + r/n, n) - 1) * 100;
  
  // Calculate final balance
  const finalBalance = principal * Math.pow(1 + r/n, n * t);
  const totalInterest = finalBalance - principal;

  // Calculate periodic interest for each compounding period
  const periodicInterest = [];
  let currentBalance = principal;
  const totalPeriods = n * t;

  for (let period = 1; period <= totalPeriods; period++) {
    const interest = currentBalance * (r/n);
    currentBalance += interest;
    
    periodicInterest.push({
      period,
      balance: currentBalance,
      interest
    });
  }

  return {
    apy: Math.round(apy * 1000) / 1000,
    totalInterest: Math.round(totalInterest * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    compoundingPeriods: n,
    effectiveRate: Math.round((apy - interestRate) * 1000) / 1000,
    periodicInterest
  };
}