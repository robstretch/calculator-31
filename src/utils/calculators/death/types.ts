export interface HealthFactors {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  smokingStatus: 'never' | 'former' | 'current';
  exerciseLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  sleepHours: number;
  alcoholConsumption: 'none' | 'moderate' | 'heavy';
  diet: 'poor' | 'average' | 'good' | 'excellent';
  familyHistory: {
    heartDisease: boolean;
    cancer: boolean;
    diabetes: boolean;
  };
  chronicConditions: string[];
  stressLevel: 'low' | 'medium' | 'high';
}

export interface DeathCalculation {
  estimatedAge: number;
  yearsRemaining: number;
  confidenceInterval: {
    low: number;
    high: number;
  };
  riskFactors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    action: string;
    potentialYearsGained: number;
  }[];
  qualityOfLife: number; // 0-100 scale
}