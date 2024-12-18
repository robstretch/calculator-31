import { LBMInput, LBMResult } from './types';

function calculateBMI(weight: number, height: number, unit: 'metric' | 'imperial'): number {
  if (unit === 'imperial') {
    return (weight * 703) / (height * height);
  }
  return weight / ((height / 100) * (height / 100));
}

function calculateFFMI(leanMass: number, height: number, unit: 'metric' | 'imperial'): number {
  // Convert to metric if needed
  if (unit === 'imperial') {
    leanMass = leanMass * 0.453592;
    height = height * 2.54;
  }
  
  // FFMI formula: LBM/height² * sqrt(height/170)
  return (leanMass / Math.pow(height/100, 2)) * Math.sqrt((height/170));
}

export function calculateLBM(input: LBMInput): LBMResult {
  // Convert to metric if needed
  let weight = input.weight;
  let height = input.height;
  if (input.unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  const calculations = [];
  let leanMass = 0;

  // Calculate LBM using selected method
  switch (input.method) {
    case 'boer':
      leanMass = input.gender === 'male'
        ? (0.407 * weight) + (0.267 * height) - 19.2
        : (0.252 * weight) + (0.473 * height) - 48.3;
      calculations.push({
        method: 'Boer Formula',
        formula: input.gender === 'male'
          ? '0.407 × weight + 0.267 × height - 19.2'
          : '0.252 × weight + 0.473 × height - 48.3',
        result: leanMass
      });
      break;

    case 'james':
      leanMass = input.gender === 'male'
        ? (1.1 * weight) - (128 * Math.pow(weight/height, 2))
        : (1.07 * weight) - (148 * Math.pow(weight/height, 2));
      calculations.push({
        method: 'James Formula',
        formula: input.gender === 'male'
          ? '1.1 × weight - 128 × (weight/height)²'
          : '1.07 × weight - 148 × (weight/height)²',
        result: leanMass
      });
      break;

    case 'hume':
      leanMass = input.gender === 'male'
        ? (0.3281 * weight) + (0.33929 * height) - 29.5336
        : (0.29569 * weight) + (0.41813 * height) - 43.2933;
      calculations.push({
        method: 'Hume Formula',
        formula: input.gender === 'male'
          ? '0.3281 × weight + 0.33929 × height - 29.5336'
          : '0.29569 × weight + 0.41813 × height - 43.2933',
        result: leanMass
      });
      break;

    case 'bodyFat':
      if (input.bodyFat === undefined) {
        throw new Error('Body fat percentage required for this method');
      }
      leanMass = weight * (1 - (input.bodyFat / 100));
      calculations.push({
        method: 'Body Fat Percentage',
        formula: 'weight × (1 - body fat%)',
        result: leanMass
      });
      break;
  }

  // Calculate fat mass
  const fatMass = weight - leanMass;
  const bodyFatPercentage = (fatMass / weight) * 100;

  // Calculate BMI and FFMI
  const bmi = calculateBMI(weight, height, 'metric');
  const ffmi = calculateFFMI(leanMass, height, 'metric');

  // Determine ideal range based on gender
  const idealRange = input.gender === 'male'
    ? { min: 10, max: 20 }
    : { min: 18, max: 28 };

  // Get FFMI category
  let category = 'Normal';
  if (ffmi < 18) category = 'Below Average';
  else if (ffmi < 20) category = 'Average';
  else if (ffmi < 22) category = 'Above Average';
  else if (ffmi < 23) category = 'Excellent';
  else category = 'Superior';

  // Generate recommendations
  const recommendations = [
    {
      category: 'Body Composition',
      suggestion: bodyFatPercentage > idealRange.max
        ? 'Focus on fat loss while maintaining muscle mass'
        : bodyFatPercentage < idealRange.min
        ? 'Ensure adequate nutrition for health'
        : 'Maintain current body composition'
    },
    {
      category: 'Training',
      suggestion: ffmi < 20
        ? 'Focus on resistance training to build muscle'
        : 'Continue balanced training approach'
    },
    {
      category: 'Nutrition',
      suggestion: `Consume ${Math.round(leanMass * 2.2)}g protein daily to support lean mass`
    },
    {
      category: 'Measurement',
      suggestion: 'Regular body composition assessments recommended'
    }
  ];

  return {
    leanMass: Math.round(leanMass * 100) / 100,
    fatMass: Math.round(fatMass * 100) / 100,
    bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
    idealRange,
    calculations,
    recommendations,
    metrics: {
      bmi: Math.round(bmi * 10) / 10,
      ffmi: Math.round(ffmi * 10) / 10,
      category
    }
  };
}