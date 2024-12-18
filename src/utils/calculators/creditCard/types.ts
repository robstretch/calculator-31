export interface CreditCardInput {
  balance: number;
  interestRate: number;
  minimumPayment: number;
  additionalPayment?: number;
  newPurchases?: number;
}

export interface CreditCardResult {
  payoffTime: {
    months: number;
    years: number;
  };
  totalInterest: number;
  totalPayment: number;
  monthlyBreakdown: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
    newPurchases?: number;
  }[];
  comparison: {
    withExtra: {
      months: number;
      totalInterest: number;
    };
    withoutExtra: {
      months: number;
      totalInterest: number;
    };
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}