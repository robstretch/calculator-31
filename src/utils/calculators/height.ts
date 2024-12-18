export interface HeightResult {
  adultHeight: number;
  heightRange: {
    min: number;
    max: number;
  };
  percentile: number;
  growthStatus: string;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}

function calculatePercentile(height: number, age: number, gender: 'male' | 'female'): number {
  // Simplified percentile calculation based on WHO growth charts
  const medianHeight = gender === 'male' ? 
    (age * 2.5) + 100 : // Male approximation
    (age * 2.3) + 98;   // Female approximation
  
  const deviation = Math.abs(height - medianHeight);
  return Math.max(0, Math.min(100, 50 + (deviation / medianHeight) * 50));
}

export function calculateHeight(
  currentHeight: number,
  age: number,
  gender: 'male' | 'female',
  parentHeight1: number,
  parentHeight2: number
): HeightResult {
  // Calculate mid-parental height (genetic potential)
  const midParentalHeight = gender === 'male' ?
    ((parentHeight1 + parentHeight2 + 13) / 2) : // Add 13cm for boys
    ((parentHeight1 + parentHeight2 - 13) / 2);  // Subtract 13cm for girls

  // Calculate adult height range (±10cm from mid-parental height)
  const heightRange = {
    min: midParentalHeight - 10,
    max: midParentalHeight + 10
  };

  // Calculate predicted adult height
  const growthRemaining = age < 18 ? (18 - age) * (gender === 'male' ? 2.5 : 2.3) : 0;
  const adultHeight = currentHeight + growthRemaining;

  // Calculate percentile
  const percentile = calculatePercentile(currentHeight, age, gender);

  // Determine growth status
  let growthStatus = 'Normal';
  if (percentile < 5) growthStatus = 'Below Average';
  else if (percentile > 95) growthStatus = 'Above Average';

  // Generate recommendations
  const recommendations = [
    {
      category: 'Nutrition',
      suggestion: 'Ensure adequate protein, calcium, and vitamin D intake for optimal growth'
    },
    {
      category: 'Physical Activity',
      suggestion: 'Regular exercise helps promote healthy growth and development'
    },
    {
      category: 'Sleep',
      suggestion: 'Get 8-10 hours of sleep per night to support growth hormone production'
    },
    {
      category: 'Medical',
      suggestion: 'Regular check-ups to monitor growth and development'
    }
  ];

  return {
    adultHeight,
    heightRange,
    percentile,
    growthStatus,
    recommendations
  };
}