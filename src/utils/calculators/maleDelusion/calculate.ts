import { DelusionFactors, DelusionResult } from './types';

function calculateMarketValue(factors: DelusionFactors): number {
  let value = 50; // Base value

  // Height impact (assuming 5'10" or 178cm is average)
  const heightDiff = factors.height - 178;
  value += heightDiff * 0.1;

  // Income impact
  const avgIncome = 50000;
  value += ((factors.income - avgIncome) / avgIncome) * 10;

  // Physique impact
  const physiqueValues = {
    poor: -10,
    average: 0,
    athletic: 10,
    excellent: 15
  };
  value += physiqueValues[factors.physique];

  // Age impact
  value += Math.max(0, 35 - Math.abs(28 - factors.age));

  return Math.max(0, Math.min(100, value));
}

export function calculateMaleDelusion(factors: DelusionFactors): DelusionResult {
  const impactFactors: { factor: string; impact: number; description: string; }[] = [];
  let delusionScore = 0;

  // Calculate actual market value
  const actualValue = calculateMarketValue(factors);

  // Calculate delusion factors
  if (factors.socialMedia === 'heavy') {
    delusionScore += 20;
    impactFactors.push({
      factor: 'Social Media',
      impact: 20,
      description: 'Heavy social media use distorts reality perception'
    });
  } else if (factors.socialMedia === 'moderate') {
    delusionScore += 10;
    impactFactors.push({
      factor: 'Social Media',
      impact: 10,
      description: 'Moderate social media exposure affects expectations'
    });
  }

  if (factors.datingApps) {
    delusionScore += 15;
    impactFactors.push({
      factor: 'Dating Apps',
      impact: 15,
      description: 'Dating apps can create unrealistic standards'
    });
  }

  if (factors.relationshipHistory === 'none') {
    delusionScore += 25;
    impactFactors.push({
      factor: 'Experience',
      impact: 25,
      description: 'Lack of relationship experience affects perception'
    });
  }

  // Calculate perceived value
  const perceivedValue = Math.min(100, actualValue + (delusionScore * 0.5));

  // Generate recommendations
  const recommendations = [
    {
      category: 'Reality Check',
      suggestion: 'Focus on self-improvement rather than unrealistic expectations'
    },
    {
      category: 'Social Media',
      suggestion: factors.socialMedia === 'heavy' ? 
        'Reduce social media consumption to improve reality perception' :
        'Maintain healthy social media habits'
    },
    {
      category: 'Personal Growth',
      suggestion: 'Develop interests and skills that add genuine value'
    },
    {
      category: 'Dating Strategy',
      suggestion: 'Set realistic standards aligned with your market value'
    }
  ];

  // Determine category
  let category: string;
  if (delusionScore < 20) category = 'Realistic';
  else if (delusionScore < 40) category = 'Slightly Delusional';
  else if (delusionScore < 60) category = 'Moderately Delusional';
  else category = 'Highly Delusional';

  return {
    delusionScore,
    realityScore: 100 - delusionScore,
    category,
    factors: impactFactors,
    recommendations,
    marketValue: {
      actual: actualValue,
      perceived: perceivedValue,
      difference: perceivedValue - actualValue
    }
  };
}