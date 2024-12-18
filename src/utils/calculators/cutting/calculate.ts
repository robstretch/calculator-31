import { CuttingInput, CuttingResult } from './types';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9
};

const PROTEIN_PER_KG = 2.2; // Higher protein during cut
const MIN_CALORIES = 1200;   // Minimum safe calories
const MAX_WEEKLY_LOSS = 1;   // Maximum kg per week

export function calculateCutting(input: CuttingInput): CuttingResult {
  // Convert to metric if needed
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

  // Calculate required weekly deficit
  const targetWeightLoss = input.unit === 'imperial' ? input.targetWeightLoss * 0.453592 : input.targetWeightLoss;
  const weeklyLoss = Math.min(targetWeightLoss / input.timeframe, MAX_WEEKLY_LOSS);
  const weeklyDeficit = weeklyLoss * 7700; // ~7700 calories per kg of fat
  const dailyDeficit = weeklyDeficit / 7;

  // Calculate target calories
  let targetCalories = Math.max(maintenanceCalories - dailyDeficit, MIN_CALORIES);
  targetCalories = Math.round(targetCalories);

  // Calculate macros
  const proteinGrams = Math.round(weight * PROTEIN_PER_KG);
  const proteinCals = proteinGrams * 4;

  const fatCals = Math.round(targetCalories * 0.25); // 25% from fat
  const fatGrams = Math.round(fatCals / 9);

  const carbCals = targetCalories - proteinCals - fatCals;
  const carbGrams = Math.round(carbCals / 4);

  // Calculate timeline
  const actualWeeklyLoss = (dailyDeficit * 7) / 7700; // kg per week
  const totalWeeks = Math.ceil(targetWeightLoss / actualWeeklyLoss);
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + (totalWeeks * 7));

  // Calculate meal plan
  const mealsPerDay = targetCalories > 2000 ? 5 : 4;

  const recommendations = [
    {
      category: 'Deficit',
      suggestion: dailyDeficit > 1000 
        ? 'Consider a more gradual approach for sustainable results'
        : 'Sustainable deficit for steady progress'
    },
    {
      category: 'Protein Intake',
      suggestion: `Maintain high protein intake of ${proteinGrams}g daily to preserve muscle`
    },
    {
      category: 'Training',
      suggestion: 'Maintain resistance training to preserve muscle mass'
    },
    {
      category: 'Progress Tracking',
      suggestion: 'Weigh daily and take weekly averages for accurate tracking'
    }
  ];

  return {
    maintenanceCalories,
    targetCalories,
    weeklyDeficit: Math.round(weeklyDeficit),
    macroBreakdown: {
      protein: { grams: proteinGrams, calories: proteinCals },
      carbs: { grams: carbGrams, calories: carbCals },
      fats: { grams: fatGrams, calories: fatCals }
    },
    timeline: {
      weeklyLoss: Math.round(actualWeeklyLoss * 100) / 100,
      totalWeeks,
      targetDate
    },
    mealPlan: {
      mealsPerDay,
      caloriesPerMeal: Math.round(targetCalories / mealsPerDay),
      proteinPerMeal: Math.round(proteinGrams / mealsPerDay)
    },
    recommendations
  };
}