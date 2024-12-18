export interface RothIraResult {
  totalContributions: number;
  totalEarnings: number;
  finalBalance: number;
  yearlyBreakdown: {
    year: number;
    contribution: number;
    earnings: number;
    balance: number;
  }[];
  taxSavings: number;
  withdrawalProjections: {
    age: number;
    amount: number;
    taxableAmount: number;
  }[];
}

export function calculateRothIra(
  currentAge: number,
  retirementAge: number,
  initialBalance: number,
  annualContribution: number,
  expectedReturn: number,
  inflationRate: number = 2.5,
  currentTaxRate: number = 22
): RothIraResult {
  const years = retirementAge - currentAge;
  const monthlyReturn = (expectedReturn / 100) / 12;
  const monthlyContribution = annualContribution / 12;
  
  let balance = initialBalance;
  let totalContributions = initialBalance;
  let totalEarnings = 0;
  
  const yearlyBreakdown = [];
  const withdrawalProjections = [];
  
  // Calculate year-by-year growth
  for (let year = 1; year <= years; year++) {
    let yearlyContribution = 0;
    let yearlyEarnings = 0;
    
    // Calculate monthly compounding
    for (let month = 1; month <= 12; month++) {
      const monthlyEarnings = (balance + monthlyContribution) * monthlyReturn;
      balance += monthlyContribution + monthlyEarnings;
      yearlyContribution += monthlyContribution;
      yearlyEarnings += monthlyEarnings;
    }
    
    totalContributions += yearlyContribution;
    totalEarnings += yearlyEarnings;
    
    yearlyBreakdown.push({
      year: currentAge + year,
      contribution: yearlyContribution,
      earnings: yearlyEarnings,
      balance: balance
    });
  }
  
  // Calculate withdrawal projections (ages 60-90)
  const withdrawalYears = 30;
  let projectedBalance = balance;
  const monthlyWithdrawalRate = 0.04 / 12; // 4% annual withdrawal rate
  
  for (let year = 0; year <= withdrawalYears; year++) {
    const age = retirementAge + year;
    const annualWithdrawal = projectedBalance * 0.04;
    
    withdrawalProjections.push({
      age,
      amount: annualWithdrawal,
      taxableAmount: 0 // Roth IRA withdrawals are tax-free in retirement
    });
    
    // Update balance for next year
    projectedBalance = projectedBalance * (1 + expectedReturn/100) - annualWithdrawal;
  }
  
  // Calculate tax savings (what you would have paid in traditional IRA)
  const taxSavings = totalContributions * (currentTaxRate / 100);
  
  return {
    totalContributions: Math.round(totalContributions),
    totalEarnings: Math.round(totalEarnings),
    finalBalance: Math.round(balance),
    yearlyBreakdown,
    taxSavings: Math.round(taxSavings),
    withdrawalProjections
  };
}