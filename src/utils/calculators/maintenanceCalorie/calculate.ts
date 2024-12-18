import { MaintenanceCalorieInput, MaintenanceCalorieResult } from './types';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,    // Little or no exercise
  light: 1.375,      // Light exercise 1-3 times/week
  moderate: 1.55,    // Moderate exercise 3-5 times/week
  active: 1.725,     // Heavy exercise 6-7 times/week
  'very-active': 1.9 // Very heavy exercise, physical job
};

export function calculateMaintenanceCalories(input: MaintenanceCalorieInput): MaintenanceCalorieResult {
  // Convert imperial to metric if needed
  let weight = input.weight;
  let height = input.height;
  if (input.unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * input.age);
  bmr = input.gender === 'male' ? bmr + 5 : bmr - 161;

  // Calculate maintenance calories
  const maintenanceCalories = Math.round(bmr * ACTIVITY_MULTIPLIERS[input.activityLevel]);

  // Calculate calorie goals
  const goals = {
    maintain: maintenanceCalories,
    lose: {
      min: Math.round(maintenanceCalories * 0.8), // 20% deficit
      max: Math.round(maintenanceCalories * 0.9)  // 10% deficit
    },
    gain: {
      min: Math.round(maintenanceCalories * 1.1), // 10% surplus
      max: Math.round(maintenanceCalories * 1.2)  // 20% surplus
    }
  };

  // Calculate macro ranges based on maintenance calories
  const macroBreakdown = {
    protein: {
      min: Math.round((maintenanceCalories * 0.25) / 4), // 25-35% of calories, 4 cal/g
      max: Math.round((maintenanceCalories * 0.35) / 4)
    },
    carbs: {
      min: Math.round((maintenanceCalories * 0.45) / 4), // 45-65% of calories, 4 cal/g
      max: Math.round((maintenanceCalories * 0.65) / 4)
    },
    fats: {
      min: Math.round((maintenanceCalories * 0.20) / 9), // 20-35% of calories, 9 cal/g
      max: Math.round((maintenanceCalories * 0.35) / 9)
    }
  };

  // Calculate meal plan
  const meals = maintenanceCalories > 2400 ? 5 : maintenanceCalories > 1800 ? 4 : 3;
  const caloriesPerMeal = Math.round(maintenanceCalories / meals);

  // Generate recommendations
  const recommendations = [
    {
      category: 'Meal Timing',
      suggestion: `Spread calories across ${meals} meals for optimal energy levels`
    },
    {
      category: 'Protein Intake',
      suggestion: `Aim for ${macroBreakdown.protein.min}-${macroBreakdown.protein.max}g protein daily`
    },
    {
      category: 'Activity Level',
      suggestion: input.activityLevel === 'sedentary' ?
        'Consider increasing activity level for better health' :
        'Maintain current activity level for optimal results'
    },
    {
      category: 'Weight Management',
      suggestion: input.goal === 'lose' ?
        'Create deficit through combination of diet and exercise' :
        input.goal === 'gain' ?
        'Focus on nutrient-dense foods for healthy weight gain' :
        'Monitor weight weekly to ensure maintenance'
    }
  ];

  return {
    bmr: Math.round(bmr),
    maintenanceCalories,
    goals,
    macroBreakdown,
    mealPlan: {
      meals,
      caloriesPerMeal
    },
    recommendations
  };
}