export interface MotorcycleLoanInput {
  price: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  creditScore?: number;
  includeInsurance?: boolean;
}

export interface MotorcycleLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: {
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
  costs: {
    insurance?: number;
    registration: number;
    maintenance: number;
    total: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}