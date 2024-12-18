export interface CuttingInput {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  unit: 'metric' | 'imperial';
  targetWeightLoss: number;
  timeframe: number; // weeks
  bodyFat?: number;
}

export interface CuttingResult {
  maintenanceCalories: number;
  targetCalories: number;
  weeklyDeficit: number;
  macroBreakdown: {
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
  };
  timeline: {
    weeklyLoss: number;
    totalWeeks: number;
    targetDate: Date;
  };
  mealPlan: {
    mealsPerDay: number;
    caloriesPerMeal: number;
    proteinPerMeal: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}