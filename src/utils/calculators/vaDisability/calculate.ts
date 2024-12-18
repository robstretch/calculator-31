import { DisabilityRating, VADisabilityResult } from './types';

// 2024 VA Disability Compensation Rates
const BASE_RATES: { [key: number]: number } = {
  10: 171.23,
  20: 338.49,
  30: 526.03,
  40: 759.22,
  50: 1080.43,
  60: 1366.91,
  70: 1716.28,
  80: 1995.01,
  90: 2241.91,
  100: 3737.85
};

// Additional dependent rates for 30% or higher
const DEPENDENT_RATES = {
  spouse: {
    30: 56, 40: 75, 50: 94, 60: 110,
    70: 129, 80: 148, 90: 165, 100: 183.32
  },
  childUnder18: {
    30: 27, 40: 36, 50: 45, 60: 54,
    70: 63, 80: 72, 90: 81, 100: 90.96
  },
  childInSchool: {
    30: 89, 40: 119, 50: 149, 60: 178,
    70: 208, 80: 238, 90: 267, 100: 298.18
  },
  dependentParent: {
    30: 121, 40: 161, 50: 202, 60: 241,
    70: 282, 80: 322, 90: 362, 100: 403.31
  }
};

function calculateCombinedRating(ratings: DisabilityRating[]): number {
  if (ratings.length === 0) return 0;
  
  // Sort ratings in descending order
  const sortedRatings = [...ratings]
    .sort((a, b) => b.percentage - a.percentage)
    .map(r => r.percentage);

  let remainingCapacity = 100;
  let combinedValue = 0;

  for (const rating of sortedRatings) {
    combinedValue += (rating * remainingCapacity) / 100;
    remainingCapacity = (100 - combinedValue);
  }

  // Round to nearest 10
  return Math.round(combinedValue / 10) * 10;
}

function calculateDependentPayments(combinedRating: number) {
  if (combinedRating < 30) {
    return {
      spouse: 0,
      childUnder18: 0,
      childInSchool: 0,
      dependentParent: 0,
      aidAndAttendance: 0
    };
  }

  const rateKey = Math.min(100, Math.max(30, combinedRating)) as keyof typeof DEPENDENT_RATES.spouse;

  return {
    spouse: DEPENDENT_RATES.spouse[rateKey] || 0,
    childUnder18: DEPENDENT_RATES.childUnder18[rateKey] || 0,
    childInSchool: DEPENDENT_RATES.childInSchool[rateKey] || 0,
    dependentParent: DEPENDENT_RATES.dependentParent[rateKey] || 0,
    aidAndAttendance: combinedRating === 100 ? 478.32 : 0
  };
}

export function calculateVADisability(ratings: DisabilityRating[]): VADisabilityResult {
  const combinedRating = calculateCombinedRating(ratings);
  const monthlyPayment = BASE_RATES[combinedRating] || 0;
  const dependentPayments = calculateDependentPayments(combinedRating);

  const calculations = ratings.map((rating, index) => ({
    step: `Rating ${index + 1}`,
    value: rating.percentage,
    description: rating.description
  }));

  calculations.push({
    step: 'Combined Rating',
    value: combinedRating,
    description: 'Final combined rating after VA math'
  });

  const benefits = [
    {
      category: 'Healthcare',
      description: 'VA Healthcare coverage',
      eligibility: combinedRating >= 0 ? 'Eligible' : 'Not eligible'
    },
    {
      category: 'Education',
      description: 'GI Bill benefits',
      eligibility: combinedRating >= 20 ? 'Eligible' : 'Not eligible'
    },
    {
      category: 'Life Insurance',
      description: 'Veterans Group Life Insurance',
      eligibility: combinedRating >= 30 ? 'Eligible' : 'Not eligible'
    },
    {
      category: 'Dental Care',
      description: 'VA Dental Care',
      eligibility: combinedRating === 100 ? 'Eligible' : 'Not eligible'
    },
    {
      category: 'Property Tax',
      description: 'Property tax exemptions (varies by state)',
      eligibility: combinedRating >= 50 ? 'May be eligible' : 'Not eligible'
    }
  ];

  return {
    combinedRating,
    monthlyPayment,
    yearlyPayment: monthlyPayment * 12,
    dependentPayments,
    benefits,
    calculations
  };
}