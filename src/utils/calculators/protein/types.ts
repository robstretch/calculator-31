export interface ProteinInput {
  weight: number;
  unit: 'kg' | 'lbs';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
  goal: 'maintenance' | 'muscle-gain' | 'fat-loss';
  dietType?: 'standard' | 'vegetarian' | 'vegan';
}

export interface ProteinResult {
  dailyProtein: {
    min: number;
    max: number;
    optimal: number;
  };
  mealsPerDay: {
    recommended: number;
    proteinPerMeal: number;
  };
  sources: {
    food: string;
    servingSize: string;
    protein: number;
    calories: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}