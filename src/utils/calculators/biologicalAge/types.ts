export interface BiologicalAgeInput {
  chronologicalAge: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  exerciseHours: number;
  sleepHours: number;
  smokingStatus: 'never' | 'former' | 'current';
  alcoholDrinksPerWeek: number;
  chronicConditions: string[];
  unit: 'metric' | 'imperial';
}

export interface BiologicalAgeResult {
  biologicalAge: number;
  ageDifference: number;
  healthScore: number;
  metrics: {
    bmi: number;
    bloodPressureCategory: string;
    metabolicAge: number;
  };
  riskFactors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
    potentialYearsReduction: number;
  }[];
  longevityFactors: {
    category: string;
    score: number;
    description: string;
  }[];
}