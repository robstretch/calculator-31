export interface AlimonyInput {
  income1: number;
  income2: number;
  marriageLength: number;
  state: string;
  hasChildren: boolean;
  custodialParent?: 'income1' | 'income2';
}

export interface AlimonyResult {
  monthlyPayment: number;
  yearlyPayment: number;
  duration: {
    years: number;
    months: number;
  };
  factors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  taxImplications: {
    payer: {
      monthlyTaxSavings: number;
      yearlyTaxSavings: number;
    };
    recipient: {
      monthlyTaxable: number;
      yearlyTaxable: number;
    };
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}