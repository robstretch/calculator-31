export interface TDEEResult {
  bmr: number;
  tdee: number;
  maintenanceCalories: {
    sedentary: number;
    light: number;
    moderate: number;
    active: number;
    veryActive: number;
  };
  macroBreakdown: {
    protein: { min: number; max: number };
    carbs: { min: number; max: number };
    fats: { min: number; max: number };
  };
  goals: {
    weightLoss: { min: number; max: number };
    maintenance: number;
    weightGain: { min: number; max: number };
  };
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

const activityMultipliers = {
  sedentary: 1.2,    // Little or no exercise
  light: 1.375,      // Light exercise 1-3 times/week
  moderate: 1.55,    // Moderate exercise 3-5 times/week
  active: 1.725,     // Heavy exercise 6-7 times/week
  veryActive: 1.9    // Very heavy exercise, physical job
};

export function calculateTDEE(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: ActivityLevel,
  unit: 'metric' | 'imperial' = 'metric'
): TDEEResult {
  // Convert imperial to metric if needed
  if (unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  // Calculate TDEE
  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

  // Calculate maintenance calories for all activity levels
  const maintenanceCalories = {
    sedentary: Math.round(bmr * activityMultipliers.sedentary),
    light: Math.round(bmr * activityMultipliers.light),
    moderate: Math.round(bmr * activityMultipliers.moderate),
    active: Math.round(bmr * activityMultipliers.active),
    veryActive: Math.round(bmr * activityMultipliers.veryActive)
  };

  // Calculate macro ranges based on TDEE
  const macroBreakdown = {
    protein: {
      min: Math.round((tdee * 0.25) / 4), // 25-35% of calories, 4 cal/g
      max: Math.round((tdee * 0.35) / 4)
    },
    carbs: {
      min: Math.round((tdee * 0.45) / 4), // 45-65% of calories, 4 cal/g
      max: Math.round((tdee * 0.65) / 4)
    },
    fats: {
      min: Math.round((tdee * 0.20) / 9), // 20-35% of calories, 9 cal/g
      max: Math.round((tdee * 0.35) / 9)
    }
  };

  // Calculate calorie goals
  const goals = {
    weightLoss: {
      min: Math.round(tdee * 0.8),  // 20% deficit
      max: Math.round(tdee * 0.9)   // 10% deficit
    },
    maintenance: tdee,
    weightGain: {
      min: Math.round(tdee * 1.1),  // 10% surplus
      max: Math.round(tdee * 1.2)   // 20% surplus
    }
  };

  return {
    bmr: Math.round(bmr),
    tdee,
    maintenanceCalories,
    macroBreakdown,
    goals
  };
}