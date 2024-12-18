export interface MacroResult {
  calories: number;
  macros: {
    protein: { grams: number; calories: number; percentage: number };
    carbs: { grams: number; calories: number; percentage: number };
    fats: { grams: number; calories: number; percentage: number };
  };
  mealPlan: {
    meals: number;
    perMeal: {
      protein: number;
      carbs: number;
      fats: number;
      calories: number;
    };
  };
  recommendations: {
    category: string;
    suggestion: string;
    amount: string;
  }[];
}

export type Goal = 'maintain' | 'lose' | 'gain';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';