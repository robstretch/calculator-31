import { BMRResult } from './types';

function calculateMifflinStJeor(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number {
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  return gender === 'male' ? bmr + 5 : bmr - 161;
}

function calculateHarrisBenedict(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (gender === 'male') {
    return 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
  }
  return 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  unit: 'metric' | 'imperial'
): BMRResult {
  // Convert imperial to metric if needed
  if (unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  // Calculate BMR using both formulas
  const mifflinBMR = calculateMifflinStJeor(weight, height, age, gender);
  const harrisBMR = calculateHarrisBenedict(weight, height, age, gender);

  // Use average of both formulas
  const bmr = Math.round((mifflinBMR + harrisBMR) / 2);

  // Calculate daily calories for different activity levels
  const dailyCalories = {
    sedentary: Math.round(bmr * 1.2),
    light: Math.round(bmr * 1.375),
    moderate: Math.round(bmr * 1.55),
    active: Math.round(bmr * 1.725)
  };

  // Calculate macro ranges based on moderate activity level
  const moderateCalories = dailyCalories.moderate;
  const macroBreakdown = {
    protein: {
      min: Math.round((moderateCalories * 0.25) / 4), // 25-35% of calories, 4 cal/g
      max: Math.round((moderateCalories * 0.35) / 4)
    },
    carbs: {
      min: Math.round((moderateCalories * 0.45) / 4), // 45-65% of calories, 4 cal/g
      max: Math.round((moderateCalories * 0.65) / 4)
    },
    fats: {
      min: Math.round((moderateCalories * 0.20) / 9), // 20-35% of calories, 9 cal/g
      max: Math.round((moderateCalories * 0.35) / 9)
    }
  };

  // Calculate impact factors
  const factors = [
    {
      factor: 'Weight',
      value: weight,
      impact: Math.round(weight * 10)
    },
    {
      factor: 'Height',
      value: height,
      impact: Math.round(height * 6.25)
    },
    {
      factor: 'Age',
      value: age,
      impact: Math.round(age * -5)
    },
    {
      factor: 'Gender',
      value: gender === 'male' ? 5 : -161,
      impact: gender === 'male' ? 5 : -161
    }
  ];

  return {
    bmr,
    dailyCalories,
    macroBreakdown,
    methodUsed: 'Average of Mifflin-St Jeor and Harris-Benedict equations',
    factors
  };
}