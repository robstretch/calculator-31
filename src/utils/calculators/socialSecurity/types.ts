export interface SocialSecurityInput {
  birthYear: number;
  retirementAge: number;
  currentIncome: number;
  lastYearWorked: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  spouseBenefit?: number;
}

export interface SocialSecurityResult {
  monthlyBenefit: number;
  yearlyBenefit: number;
  fullRetirementAge: {
    years: number;
    months: number;
  };
  benefitAdjustment: number;
  maximumBenefit: number;
  spousalBenefit?: number;
  survivorBenefit?: number;
  estimatedTotalBenefits: {
    age: number;
    total: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}