export interface BulkingInput {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  unit: 'metric' | 'imperial';
  bulkingType: 'lean' | 'moderate' | 'aggressive';
}

export interface BulkingResult {
  maintenanceCalories: number;
  bulkingCalories: number;
  weeklyGain: number;
  macroBreakdown: {
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
  };
  mealPlan: {
    mealsPerDay: number;
    caloriesPerMeal: number;
    proteinPerMeal: number;
  };
  timeline: {
    weeks: number;
    targetWeight: number;
    monthlyGain: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}