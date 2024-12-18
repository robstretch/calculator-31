export interface PuppyWeightResult {
  adultWeight: number;
  weightRange: {
    min: number;
    max: number;
  };
  growthStage: string;
  monthlyEstimates: {
    month: number;
    weight: number;
  }[];
  growthPercentage: number;
}

function getGrowthStage(ageInWeeks: number): string {
  if (ageInWeeks <= 8) return 'Neonatal/Nursing';
  if (ageInWeeks <= 12) return 'Socialization';
  if (ageInWeeks <= 24) return 'Juvenile';
  if (ageInWeeks <= 52) return 'Adolescent';
  return 'Adult';
}

export function calculatePuppyWeight(
  currentWeight: number,
  ageInWeeks: number,
  breedSize: 'small' | 'medium' | 'large' | 'giant'
): PuppyWeightResult {
  // Growth multipliers based on breed size
  const multipliers = {
    small: { base: 3.5, range: 0.5 },   // Under 20 lbs
    medium: { base: 4, range: 0.75 },    // 20-50 lbs
    large: { base: 4.5, range: 1 },      // 50-100 lbs
    giant: { base: 5, range: 1.5 }       // Over 100 lbs
  };

  const { base, range } = multipliers[breedSize];

  // Calculate estimated adult weight
  let adultWeight: number;
  if (ageInWeeks <= 12) {
    adultWeight = currentWeight * (base - (ageInWeeks / 12));
  } else {
    adultWeight = currentWeight * (base / (1 + (ageInWeeks / 12)));
  }

  // Calculate weight range
  const weightRange = {
    min: adultWeight * (1 - range/base),
    max: adultWeight * (1 + range/base)
  };

  // Calculate growth percentage
  const growthPercentage = (currentWeight / adultWeight) * 100;

  // Generate monthly estimates
  const monthlyEstimates = [];
  const totalMonths = breedSize === 'giant' ? 24 : 
                     breedSize === 'large' ? 18 :
                     breedSize === 'medium' ? 12 : 10;

  for (let month = 1; month <= totalMonths; month++) {
    const weekAge = month * 4;
    let estimatedWeight: number;
    
    if (weekAge <= ageInWeeks) {
      // Use actual trajectory for past months
      estimatedWeight = (month * 4 / ageInWeeks) * currentWeight;
    } else {
      // Project future growth
      const remainingGrowth = adultWeight - currentWeight;
      const remainingMonths = totalMonths - (ageInWeeks / 4);
      const monthlyGrowth = remainingGrowth / remainingMonths;
      estimatedWeight = currentWeight + (monthlyGrowth * (month - (ageInWeeks / 4)));
    }

    monthlyEstimates.push({
      month,
      weight: Math.max(0, Math.min(adultWeight, estimatedWeight))
    });
  }

  return {
    adultWeight,
    weightRange,
    growthStage: getGrowthStage(ageInWeeks),
    monthlyEstimates,
    growthPercentage
  };
}