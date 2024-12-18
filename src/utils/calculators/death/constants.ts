export const baseLifeExpectancy = {
  male: 76.1,
  female: 81.1
};

export const riskFactorImpacts = {
  smoking: {
    never: 0,
    former: -2,
    current: -10
  },
  exercise: {
    sedentary: -3,
    light: 0,
    moderate: 2,
    active: 4
  },
  sleep: {
    optimal: 2, // 7-9 hours
    suboptimal: -1,
    poor: -3 // <5 or >10 hours
  },
  alcohol: {
    none: 0,
    moderate: -1,
    heavy: -5
  },
  diet: {
    poor: -3,
    average: 0,
    good: 2,
    excellent: 4
  },
  bmi: {
    underweight: -2, // <18.5
    normal: 0, // 18.5-24.9
    overweight: -1, // 25-29.9
    obese: -3 // >30
  },
  stress: {
    low: 1,
    medium: 0,
    high: -2
  }
};

export const chronicConditionImpacts: { [key: string]: number } = {
  'heart disease': -5,
  'diabetes': -4,
  'cancer': -6,
  'copd': -5,
  'kidney disease': -4,
  'liver disease': -5,
  'alzheimers': -4
};