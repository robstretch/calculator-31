export interface FiberInput {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  unit: 'metric' | 'imperial';
  activityLevel: 'sedentary' | 'moderate' | 'active';
  pregnant?: boolean;
  breastfeeding?: boolean;
}

export interface FiberResult {
  dailyNeeds: {
    minimum: number;
    recommended: number;
    maximum: number;
  };
  sources: {
    food: string;
    servingSize: string;
    fiberContent: number;
    servingsNeeded: number;
  }[];
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}