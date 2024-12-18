import { HealthFactors, DeathCalculation } from './types';
import { baseLifeExpectancy, riskFactorImpacts, chronicConditionImpacts } from './constants';

function calculateBMI(weight: number, height: number): number {
  return weight / ((height / 100) ** 2);
}

function getBMICategory(bmi: number): keyof typeof riskFactorImpacts.bmi {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

function calculateQualityOfLife(factors: HealthFactors, impacts: number[]): number {
  const baseQuality = 80; // Base quality of life score
  const totalImpact = impacts.reduce((sum, impact) => sum + impact, 0);
  return Math.max(0, Math.min(100, baseQuality + totalImpact * 2));
}

export function calculateDeathEstimate(factors: HealthFactors): DeathCalculation {
  const impacts: number[] = [];
  const riskFactors: { factor: string; impact: number; description: string; }[] = [];

  // Base life expectancy
  let estimatedAge = baseLifeExpectancy[factors.gender];

  // BMI Impact
  const bmi = calculateBMI(factors.weight, factors.height);
  const bmiCategory = getBMICategory(bmi);
  const bmiImpact = riskFactorImpacts.bmi[bmiCategory];
  impacts.push(bmiImpact);
  riskFactors.push({
    factor: 'BMI',
    impact: bmiImpact,
    description: `BMI of ${bmi.toFixed(1)} (${bmiCategory})`
  });

  // Smoking Impact
  const smokingImpact = riskFactorImpacts.smoking[factors.smokingStatus];
  impacts.push(smokingImpact);
  riskFactors.push({
    factor: 'Smoking',
    impact: smokingImpact,
    description: `${factors.smokingStatus} smoker`
  });

  // Exercise Impact
  const exerciseImpact = riskFactorImpacts.exercise[factors.exerciseLevel];
  impacts.push(exerciseImpact);
  riskFactors.push({
    factor: 'Exercise',
    impact: exerciseImpact,
    description: `${factors.exerciseLevel} activity level`
  });

  // Sleep Impact
  const sleepImpact = factors.sleepHours >= 7 && factors.sleepHours <= 9
    ? riskFactorImpacts.sleep.optimal
    : factors.sleepHours >= 5 && factors.sleepHours <= 10
    ? riskFactorImpacts.sleep.suboptimal
    : riskFactorImpacts.sleep.poor;
  impacts.push(sleepImpact);
  riskFactors.push({
    factor: 'Sleep',
    impact: sleepImpact,
    description: `${factors.sleepHours} hours per night`
  });

  // Chronic Conditions Impact
  factors.chronicConditions.forEach(condition => {
    const impact = chronicConditionImpacts[condition.toLowerCase()] || 0;
    impacts.push(impact);
    riskFactors.push({
      factor: 'Chronic Condition',
      impact,
      description: condition
    });
  });

  // Calculate final estimate
  const totalImpact = impacts.reduce((sum, impact) => sum + impact, 0);
  estimatedAge += totalImpact;

  // Generate recommendations
  const recommendations = [];
  if (factors.smokingStatus === 'current') {
    recommendations.push({
      category: 'Smoking',
      action: 'Quit smoking',
      potentialYearsGained: 10
    });
  }
  if (factors.exerciseLevel === 'sedentary') {
    recommendations.push({
      category: 'Exercise',
      action: 'Increase physical activity to at least moderate level',
      potentialYearsGained: 5
    });
  }
  if (bmiCategory === 'obese' || bmiCategory === 'overweight') {
    recommendations.push({
      category: 'Weight Management',
      action: 'Work towards a healthy BMI through diet and exercise',
      potentialYearsGained: 3
    });
  }

  return {
    estimatedAge: Math.round(estimatedAge),
    yearsRemaining: Math.max(0, Math.round(estimatedAge - factors.age)),
    confidenceInterval: {
      low: Math.round(estimatedAge - 5),
      high: Math.round(estimatedAge + 5)
    },
    riskFactors,
    recommendations,
    qualityOfLife: calculateQualityOfLife(factors, impacts)
  };
}