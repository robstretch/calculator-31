export interface CalorieResult {
  bmr: number;
  maintenance: number;
  weightLoss: number;
  weightGain: number;
}

export function calculateCalories(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active',
  unit: 'metric' | 'imperial'
): CalorieResult {
  if (unit === 'imperial') {
    weight = weight * 0.453592;
    height = height * 2.54;
  }
  
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };
  
  const maintenance = Math.round(bmr * activityMultipliers[activityLevel]);
  
  return {
    bmr: Math.round(bmr),
    maintenance,
    weightLoss: Math.round(maintenance * 0.8),
    weightGain: Math.round(maintenance * 1.2)
  };
}