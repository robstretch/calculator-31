import { BulkingInput, BulkingResult } from './types';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9
};

const SURPLUS_MULTIPLIERS = {
  lean: 1.1,      // 10% surplus
  moderate: 1.15, // 15% surplus
  aggressive: 1.2 // 20% surplus
};

const WEEKLY_GAIN = {
  lean: 0.25,      // 0.25 kg/week
  moderate: 0.5,   // 0.5 kg/week
  aggressive: 0.75 // 0.75 kg/week
};

export function calculateBulking(input: BulkingInput): BulkingResult {
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

  // Calculate bulking calories
  const bulkingCalories = Math.round(maintenanceCalories * SURPLUS_MULTIPLIERS[input.bulkingType]);
  const surplus = bulkingCalories - maintenanceCalories;

  // Calculate weekly weight gain
  const weeklyGain = WEEKLY_GAIN[input.bulkingType];
  const monthlyGain = weeklyGain * 4;

  // Calculate macros
  const proteinPerKg = 2.2; // g/kg bodyweight
  const proteinGrams = Math.round(weight * proteinPerKg);
  const proteinCals = proteinGrams * 4;

  const fatPercent = 0.25; // 25% of total calories
  const fatCals = Math.round(bulkingCalories * fatPercent);
  const fatGrams = Math.round(fatCals / 9);

  const carbCals = bulkingCalories - proteinCals - fatCals;
  const carbGrams = Math.round(carbCals / 4);

  // Calculate meal plan
  const mealsPerDay = bulkingCalories > 3000 ? 6 : bulkingCalories > 2500 ? 5 : 4;

  // Calculate timeline (to gain 5kg/11lbs)
  const targetGain = input.unit === 'metric' ? 5 : 11;
  const weeksToGain = Math.round(targetGain / weeklyGain);

  return {
    maintenanceCalories,
    bulkingCalories,
    weeklyGain: input.unit === 'metric' ? weeklyGain : weeklyGain * 2.20462, // Convert to lbs if imperial
    macroBreakdown: {
      protein: { grams: proteinGrams, calories: proteinCals },
      carbs: { grams: carbGrams, calories: carbCals },
      fats: { grams: fatGrams, calories: fatCals }
    },
    mealPlan: {
      mealsPerDay,
      caloriesPerMeal: Math.round(bulkingCalories / mealsPerDay),
      proteinPerMeal: Math.round(proteinGrams / mealsPerDay)
    },
    timeline: {
      weeks: weeksToGain,
      targetWeight: weight + targetGain,
      monthlyGain: monthlyGain
    },
    recommendations: [
      {
        category: 'Training',
        suggestion: input.bulkingType === 'aggressive' ?
          'Focus on compound exercises with progressive overload' :
          'Balance compound and isolation exercises'
      },
      {
        category: 'Protein Timing',
        suggestion: `Consume ${Math.round(proteinGrams / mealsPerDay)}g protein every ${24/mealsPerDay} hours`
      },
      {
        category: 'Progress Tracking',
        suggestion: 'Weigh yourself daily and take weekly averages'
      },
      {
        category: 'Adjustments',
        suggestion: 'Increase calories by 10% if not gaining after 2 weeks'
      }
    ]
  };
}