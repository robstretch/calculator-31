export interface BMRResult {
  bmr: number;
  dailyCalories: {
    sedentary: number;
    light: number;
    moderate: number;
    active: number;
  };
  macroBreakdown: {
    protein: { min: number; max: number };
    carbs: { min: number; max: number };
    fats: { min: number; max: number };
  };
  methodUsed: string;
  factors: {
    factor: string;
    value: number;
    impact: number;
  }[];
}