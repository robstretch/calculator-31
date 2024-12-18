export interface LBMInput {
  weight: number;
  height: number;
  gender: 'male' | 'female';
  bodyFat?: number;
  unit: 'metric' | 'imperial';
  method: 'boer' | 'james' | 'hume' | 'bodyFat';
}

export interface LBMResult {
  leanMass: number;
  fatMass: number;
  bodyFatPercentage: number;
  idealRange: {
    min: number;
    max: number;
  };
  calculations: {
    method: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  metrics: {
    bmi: number;
    ffmi: number; // Fat-Free Mass Index
    category: string;
  };
}