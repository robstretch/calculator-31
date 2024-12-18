export interface MaintenanceCalorieInput {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  unit: 'metric' | 'imperial';
  goal?: 'maintain' | 'lose' | 'gain';
}

export interface MaintenanceCalorieResult {
  bmr: number;
  maintenanceCalories: number;
  goals: {
    maintain: number;
    lose: {
      min: number;
      max: number;
    };
    gain: {
      min: number;
      max: number;
    };
  };
  macroBreakdown: {
    protein: { min: number; max: number };
    carbs: { min: number; max: number };
    fats: { min: number; max: number };
  };
  mealPlan: {
    meals: number;
    caloriesPerMeal: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}