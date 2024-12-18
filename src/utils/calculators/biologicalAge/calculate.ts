import { BiologicalAgeInput, BiologicalAgeResult } from './types';

const RISK_FACTORS = {
  smoking: {
    never: 0,
    former: 2,
    current: 5
  },
  exercise: {
    low: 3,
    moderate: 0,
    high: -2
  },
  sleep: {
    optimal: -1,
    suboptimal: 1,
    poor: 3
  }
};

function calculateBMI(weight: number, height: number, unit: 'metric' | 'imperial'): number {
  if (unit === 'imperial') {
    return (weight * 703) / (height * height);
  }
  return weight / ((height / 100) * (height / 100));
}

function getBloodPressureCategory(systolic: number, diastolic: number): string {
  if (systolic < 120 && diastolic < 80) return 'Normal';
  if (systolic < 130 && diastolic < 80) return 'Elevated';
  if (systolic < 140 || diastolic < 90) return 'Stage 1 Hypertension';
  return 'Stage 2 Hypertension';
}

function calculateMetabolicAge(
  chronologicalAge: number,
  bmi: number,
  exerciseHours: number
): number {
  let metabolicAge = chronologicalAge;
  
  // Adjust for BMI
  if (bmi > 25) metabolicAge += (bmi - 25) * 0.5;
  if (bmi < 18.5) metabolicAge += (18.5 - bmi) * 0.5;
  
  // Adjust for exercise
  metabolicAge -= Math.min(exerciseHours * 0.5, 5);
  
  return Math.max(18, Math.round(metabolicAge));
}

export function calculateBiologicalAge(input: BiologicalAgeInput): BiologicalAgeResult {
  // Convert measurements to metric if needed
  let weight = input.weight;
  let height = input.height;
  if (input.unit === 'imperial') {
    weight *= 0.453592; // lbs to kg
    height *= 2.54;     // inches to cm
  }

  // Calculate BMI
  const bmi = calculateBMI(weight, height, 'metric');
  
  // Calculate base biological age
  let biologicalAge = input.chronologicalAge;
  
  // Adjust for BMI
  if (bmi > 30) biologicalAge += 2;
  else if (bmi > 25) biologicalAge += 1;
  else if (bmi < 18.5) biologicalAge += 1;
  
  // Adjust for blood pressure
  const bpCategory = getBloodPressureCategory(
    input.bloodPressure.systolic,
    input.bloodPressure.diastolic
  );
  if (bpCategory === 'Stage 2 Hypertension') biologicalAge += 4;
  else if (bpCategory === 'Stage 1 Hypertension') biologicalAge += 2;
  else if (bpCategory === 'Elevated') biologicalAge += 1;
  
  // Adjust for lifestyle factors
  biologicalAge += RISK_FACTORS.smoking[input.smokingStatus];
  biologicalAge += input.exerciseHours < 2 ? 2 : input.exerciseHours > 5 ? -2 : 0;
  biologicalAge += input.sleepHours < 6 || input.sleepHours > 9 ? 2 : -1;
  biologicalAge += Math.floor(input.alcoholDrinksPerWeek / 7);
  
  // Adjust for chronic conditions
  biologicalAge += input.chronicConditions.length * 2;

  // Calculate health score (0-100)
  const healthScore = Math.max(0, Math.min(100, 100 - (biologicalAge - input.chronologicalAge) * 5));

  // Generate risk factors analysis
  const riskFactors = [
    {
      factor: 'BMI',
      impact: bmi > 25 ? (bmi - 25) * 0.5 : 0,
      description: `BMI of ${bmi.toFixed(1)}`
    },
    {
      factor: 'Blood Pressure',
      impact: bpCategory === 'Normal' ? 0 : 2,
      description: bpCategory
    },
    {
      factor: 'Exercise',
      impact: input.exerciseHours < 2 ? 2 : -2,
      description: `${input.exerciseHours} hours per week`
    },
    {
      factor: 'Sleep',
      impact: input.sleepHours < 6 || input.sleepHours > 9 ? 2 : -1,
      description: `${input.sleepHours} hours per night`
    }
  ];

  // Generate recommendations
  const recommendations = [
    {
      category: 'Exercise',
      suggestion: input.exerciseHours < 3 ?
        'Increase physical activity to at least 150 minutes per week' :
        'Maintain current exercise routine',
      potentialYearsReduction: 2
    },
    {
      category: 'Sleep',
      suggestion: input.sleepHours < 7 ?
        'Aim for 7-9 hours of sleep per night' :
        'Maintain healthy sleep schedule',
      potentialYearsReduction: 1
    },
    {
      category: 'Lifestyle',
      suggestion: input.smokingStatus === 'current' ?
        'Consider smoking cessation program' :
        'Maintain smoke-free lifestyle',
      potentialYearsReduction: 3
    },
    {
      category: 'Health Monitoring',
      suggestion: bpCategory !== 'Normal' ?
        'Regular blood pressure monitoring recommended' :
        'Continue regular health check-ups',
      potentialYearsReduction: 2
    }
  ];

  // Calculate longevity factors
  const longevityFactors = [
    {
      category: 'Physical Health',
      score: Math.max(0, 100 - (bmi - 22) * 5),
      description: 'Based on BMI and blood pressure'
    },
    {
      category: 'Lifestyle',
      score: Math.max(0, 100 - (input.alcoholDrinksPerWeek * 2)),
      description: 'Based on alcohol consumption and smoking status'
    },
    {
      category: 'Activity',
      score: Math.min(100, input.exerciseHours * 20),
      description: 'Based on weekly exercise hours'
    },
    {
      category: 'Rest',
      score: input.sleepHours >= 7 && input.sleepHours <= 9 ? 100 : 70,
      description: 'Based on sleep patterns'
    }
  ];

  return {
    biologicalAge: Math.round(biologicalAge),
    ageDifference: Math.round(biologicalAge - input.chronologicalAge),
    healthScore,
    metrics: {
      bmi,
      bloodPressureCategory: bpCategory,
      metabolicAge: calculateMetabolicAge(input.chronologicalAge, bmi, input.exerciseHours)
    },
    riskFactors,
    recommendations,
    longevityFactors
  };
}