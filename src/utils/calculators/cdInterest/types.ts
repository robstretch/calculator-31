export interface CDInterestResult {
  finalBalance: number;
  totalInterest: number;
  apy: number;
  monthlyInterest: number[];
  yearlyTotals: {
    year: number;
    interest: number;
    balance: number;
  }[];
  earlyWithdrawalPenalty?: number;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}

export type CompoundingFrequency = 'daily' | 'monthly' | 'quarterly' | 'annually';