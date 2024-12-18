export interface DisabilityRating {
  percentage: number;
  description: string;
}

export interface VADisabilityResult {
  combinedRating: number;
  monthlyPayment: number;
  yearlyPayment: number;
  dependentPayments: {
    spouse: number;
    childUnder18: number;
    childInSchool: number;
    dependentParent: number;
    aidAndAttendance: number;
  };
  benefits: {
    category: string;
    description: string;
    eligibility: string;
  }[];
  calculations: {
    step: string;
    value: number;
    description: string;
  }[];
}