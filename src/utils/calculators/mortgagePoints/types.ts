export interface MortgagePointsInput {
  loanAmount: number;
  interestRate: number;
  points: number;
  loanTerm: number;
  pointCost: number;
}

export interface MortgagePointsResult {
  monthlyPaymentWithPoints: number;
  monthlyPaymentWithoutPoints: number;
  monthlySavings: number;
  totalPointsCost: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
  calculations: {
    step: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}