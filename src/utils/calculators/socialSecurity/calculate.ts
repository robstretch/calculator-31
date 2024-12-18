import { SocialSecurityInput, SocialSecurityResult } from './types';

const FULL_RETIREMENT_AGES = {
  1937: { years: 65, months: 0 },
  1938: { years: 65, months: 2 },
  1939: { years: 65, months: 4 },
  1940: { years: 65, months: 6 },
  1941: { years: 65, months: 8 },
  1942: { years: 65, months: 10 },
  1943: { years: 66, months: 0 },
  1954: { years: 66, months: 0 },
  1955: { years: 66, months: 2 },
  1956: { years: 66, months: 4 },
  1957: { years: 66, months: 6 },
  1958: { years: 66, months: 8 },
  1959: { years: 66, months: 10 },
  1960: { years: 67, months: 0 }
};

function getFullRetirementAge(birthYear: number) {
  if (birthYear <= 1937) return FULL_RETIREMENT_AGES[1937];
  if (birthYear >= 1960) return FULL_RETIREMENT_AGES[1960];
  return FULL_RETIREMENT_AGES[birthYear];
}

function calculateBenefitAdjustment(birthYear: number, retirementAge: number): number {
  const fra = getFullRetirementAge(birthYear);
  const fraMonths = fra.years * 12 + fra.months;
  const retirementMonths = retirementAge * 12;
  const monthDiff = retirementMonths - fraMonths;

  if (monthDiff === 0) return 1;
  if (monthDiff < 0) {
    // Reduction for early retirement
    return 1 - (Math.abs(monthDiff) * (monthDiff > -36 ? 0.00555556 : 0.00416667));
  }
  // Increase for delayed retirement
  return 1 + (monthDiff * 0.00666667);
}

function calculateAIME(currentIncome: number, lastYearWorked: number): number {
  // Simplified AIME calculation - in reality this would use 35 highest earning years
  return Math.min(currentIncome / 12, 11_908); // 2024 maximum monthly earnings
}

function calculatePIA(aime: number): number {
  // 2024 bend points
  let pia = 0;
  if (aime <= 1115) {
    pia = aime * 0.9;
  } else if (aime <= 6721) {
    pia = (1115 * 0.9) + ((aime - 1115) * 0.32);
  } else {
    pia = (1115 * 0.9) + ((6721 - 1115) * 0.32) + ((aime - 6721) * 0.15);
  }
  return Math.round(pia * 100) / 100;
}

export function calculateSocialSecurity(input: SocialSecurityInput): SocialSecurityResult {
  const fullRetirementAge = getFullRetirementAge(input.birthYear);
  const benefitAdjustment = calculateBenefitAdjustment(input.birthYear, input.retirementAge);
  
  // Calculate base benefit
  const aime = calculateAIME(input.currentIncome, input.lastYearWorked);
  const pia = calculatePIA(aime);
  const monthlyBenefit = Math.round(pia * benefitAdjustment);
  
  // Calculate spousal and survivor benefits if applicable
  let spousalBenefit;
  let survivorBenefit;
  if (input.spouseBenefit && ['married', 'divorced', 'widowed'].includes(input.maritalStatus)) {
    spousalBenefit = Math.max(input.spouseBenefit * 0.5, monthlyBenefit);
    if (input.maritalStatus === 'widowed') {
      survivorBenefit = Math.max(input.spouseBenefit, monthlyBenefit);
    }
  }

  // Calculate lifetime benefits
  const estimatedTotalBenefits = Array.from({ length: 30 }, (_, i) => ({
    age: input.retirementAge + i,
    total: monthlyBenefit * 12 * (i + 1)
  }));

  // Generate recommendations
  const recommendations = [
    {
      category: 'Retirement Timing',
      suggestion: benefitAdjustment < 1 
        ? 'Consider delaying retirement to increase benefits'
        : 'You\'re maximizing your benefit by delaying retirement'
    },
    {
      category: 'Earnings Impact',
      suggestion: input.currentIncome < 160_200 
        ? 'Increasing your earnings will boost your future benefits'
        : 'You\'ve reached the maximum taxable earnings for 2024'
    },
    {
      category: 'Spousal Benefits',
      suggestion: input.maritalStatus === 'married'
        ? 'Compare your benefit with potential spousal benefits'
        : 'Review eligibility for spousal or survivor benefits'
    },
    {
      category: 'Working in Retirement',
      suggestion: 'Be aware of earnings limits if working before full retirement age'
    }
  ];

  return {
    monthlyBenefit,
    yearlyBenefit: monthlyBenefit * 12,
    fullRetirementAge,
    benefitAdjustment,
    maximumBenefit: 4873, // 2024 maximum benefit at full retirement age
    spousalBenefit,
    survivorBenefit,
    estimatedTotalBenefits,
    recommendations
  };
}