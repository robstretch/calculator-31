import { DogAgeInput, DogAgeResult } from './types';

const SIZE_FACTORS = {
  small: { firstYear: 15, secondYear: 9, additionalYear: 4, lifeExpectancy: 15 },
  medium: { firstYear: 15, secondYear: 9, additionalYear: 5, lifeExpectancy: 12 },
  large: { firstYear: 15, secondYear: 9, additionalYear: 6, lifeExpectancy: 10 },
  giant: { firstYear: 15, secondYear: 9, additionalYear: 7, lifeExpectancy: 8 }
};

function calculateHumanAge(age: number, ageUnit: 'years' | 'months', size: 'small' | 'medium' | 'large' | 'giant'): number {
  const factors = SIZE_FACTORS[size];
  let totalAge = ageUnit === 'months' ? age / 12 : age;

  if (totalAge <= 1) {
    return totalAge * factors.firstYear;
  } else if (totalAge <= 2) {
    return factors.firstYear + (totalAge - 1) * factors.secondYear;
  } else {
    return factors.firstYear + factors.secondYear + (totalAge - 2) * factors.additionalYear;
  }
}

function getAgeCategory(humanAge: number): string {
  if (humanAge < 12) return 'Puppy';
  if (humanAge < 18) return 'Adolescent';
  if (humanAge < 40) return 'Adult';
  if (humanAge < 60) return 'Middle-aged';
  return 'Senior';
}

export function calculateDogAge(input: DogAgeInput): DogAgeResult {
  const humanAge = calculateHumanAge(input.age, input.ageUnit, input.size);
  const ageCategory = getAgeCategory(humanAge);
  const factors = SIZE_FACTORS[input.size];

  const milestones = [
    {
      stage: 'Puppy',
      dogAge: 0.5,
      humanAge: calculateHumanAge(0.5, 'years', input.size),
      description: 'Rapid growth and development'
    },
    {
      stage: 'Adolescent',
      dogAge: 1,
      humanAge: factors.firstYear,
      description: 'Sexual maturity begins'
    },
    {
      stage: 'Adult',
      dogAge: 2,
      humanAge: factors.firstYear + factors.secondYear,
      description: 'Full physical maturity'
    },
    {
      stage: 'Middle Age',
      dogAge: factors.lifeExpectancy / 2,
      humanAge: calculateHumanAge(factors.lifeExpectancy / 2, 'years', input.size),
      description: 'Begin senior care considerations'
    }
  ];

  const healthRecommendations = [
    {
      category: 'Exercise',
      suggestion: input.size === 'giant' ? 
        'Moderate exercise to protect joints' : 
        'Regular exercise appropriate for age and size'
    },
    {
      category: 'Nutrition',
      suggestion: ageCategory === 'Senior' ?
        'Senior-specific diet with joint support' :
        'Age-appropriate balanced diet'
    },
    {
      category: 'Veterinary Care',
      suggestion: humanAge > 40 ?
        'Bi-annual check-ups recommended' :
        'Annual check-ups and vaccinations'
    },
    {
      category: 'Dental Care',
      suggestion: 'Regular dental cleaning and maintenance'
    }
  ];

  const breedSpecifics = [
    {
      factor: 'Size Category',
      value: input.size,
      impact: `Life expectancy ~${factors.lifeExpectancy} years`
    },
    {
      factor: 'Aging Rate',
      value: `${factors.additionalYear} human years per dog year`,
      impact: 'After age 2'
    },
    {
      factor: 'Weight',
      value: `${input.weight} lbs`,
      impact: 'Maintain healthy weight for longevity'
    }
  ];

  return {
    humanAge: Math.round(humanAge * 10) / 10,
    lifeExpectancy: factors.lifeExpectancy,
    ageCategory,
    milestones,
    healthRecommendations,
    breedSpecifics
  };
}