export interface ServiceType {
  category: string;
  baseRate: number;
  qualityFactors: {
    poor: number;
    fair: number;
    good: number;
    excellent: number;
  };
}

export interface GratuityResult {
  baseAmount: number;
  suggestedTip: number;
  totalAmount: number;
  tipPercentage: number;
  splitAmount?: number;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  industryStandard: {
    minimum: number;
    average: number;
    exceptional: number;
  };
}