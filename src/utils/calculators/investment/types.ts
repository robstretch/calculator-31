export interface InvestmentInput {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually';
  inflationRate?: number;
  taxRate?: number;
}

export interface InvestmentResult {
  finalBalance: number;
  totalContributions: number;
  totalEarnings: number;
  inflationAdjustedBalance?: number;
  yearlyBreakdown: {
    year: number;
    balance: number;
    contributions: number;
    earnings: number;
    inflationAdjusted?: number;
  }[];
  metrics: {
    effectiveAnnualRate: number;
    realReturnRate?: number;
    taxableAmount?: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}