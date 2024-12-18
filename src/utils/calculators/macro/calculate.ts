import { MacroResult, Goal, ActivityLevel } from './types';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9
};

const GOAL_ADJUSTMENTS = {
  lose: 0.8,    // 20% deficit
  maintain: 1,
  gain: 1.2     // 20% surplus
};

export function calculateMacros(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: ActivityLevel,
  goal: Goal,
  mealsPerDay: number,
  unit: 'metric' | 'imperial' = 'metric'
): MacroResult {
  // Convert to metric if needed
  if (unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  // Calculate BMR using Mifflin-St Jeor
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  // Calculate TDEE
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

  // Adjust calories based on goal
  const targetCalories = Math.round(tdee * GOAL_ADJUSTMENTS[goal]);

  // Calculate macros based on goal
  let proteinRatio: number;
  let fatRatio: number;
  let carbRatio: number;

  switch (goal) {
    case 'lose':
      proteinRatio = 0.40;  // Higher protein for muscle preservation
      fatRatio = 0.35;
      carbRatio = 0.25;
      break;
    case 'gain':
      proteinRatio = 0.30;
      fatRatio = 0.25;
      carbRatio = 0.45;
      break;
    default: // maintain
      proteinRatio = 0.30;
      fatRatio = 0.30;
      carbRatio = 0.40;
  }

  const macros = {
    protein: {
      calories: Math.round(targetCalories * proteinRatio),
      grams: Math.round((targetCalories * proteinRatio) / 4),
      percentage: Math.round(proteinRatio * 100)
    },
    carbs: {
      calories: Math.round(targetCalories * carbRatio),
      grams: Math.round((targetCalories * carbRatio) / 4),
      percentage: Math.round(carbRatio * 100)
    },
    fats: {
      calories: Math.round(targetCalories * fatRatio),
      grams: Math.round((targetCalories * fatRatio) / 9),
      percentage: Math.round(fatRatio * 100)
    }
  };

  // Calculate per-meal breakdown
  const perMeal = {
    protein: Math.round(macros.protein.grams / mealsPerDay),
    carbs: Math.round(macros.carbs.grams / mealsPerDay),
    fats: Math.round(macros.fats.grams / mealsPerDay),
    calories: Math.round(targetCalories / mealsPerDay)
  };

  // Generate food recommendations
  const recommendations = [
    {
      category: 'Protein Sources',
      suggestion: 'Chicken breast, fish, lean beef, eggs',
      amount: `${perMeal.protein}g per meal`
    },
    {
      category: 'Carbohydrates',
      suggestion: 'Rice, sweet potatoes, oats, quinoa',
      amount: `${perMeal.carbs}g per meal`
    },
    {
      category: 'Healthy Fats',
      suggestion: 'Avocado, nuts, olive oil, fatty fish',
      amount: `${perMeal.fats}g per meal`
    }
  ];

  return {
    calories: targetCalories,
    macros,
    mealPlan: {
      meals: mealsPerDay,
      perMeal
    },
    recommendations
  };
}