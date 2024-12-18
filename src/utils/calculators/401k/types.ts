export interface ContributionLimits {
  employeeUnder50: number;
  employeeOver50: number;
  employerMax: number;
  totalMax: number;
}

export interface Input401k {
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  contributionPercent: number;
  employerMatch: number;
  employerMatchLimit: number;
  currentBalance: number;
  annualReturn: number;
  annualRaise?: number;
}

export interface Result401k {
  projectedBalance: number;
  totalContributions: {
    employee: number;
    employer: number;
    total: number;
  };
  yearlyBreakdown: {
    age: number;
    salary: number;
    employeeContribution: number;
    employerContribution: number;
    yearEndBalance: number;
    totalContributed: number;
    totalEarnings: number;
  }[];
  metrics: {
    effectiveMatchRate: number;
    projectedIncome: number;
    replacementRatio: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}