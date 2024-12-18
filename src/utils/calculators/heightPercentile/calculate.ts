import { HeightPercentileInput, HeightPercentileResult } from './types';

// WHO growth standards - simplified for example
const GROWTH_STANDARDS = {
  male: {
    mean: 176,
    sd: 7.5
  },
  female: {
    mean: 162,
    sd: 6.8
  }
};

function calculateZScore(height: number, mean: number, sd: number): number {
  return (height - mean) / sd;
}

function calculatePercentile(zScore: number): number {
  // Approximation of the normal cumulative distribution function
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
  const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return zScore > 0 ? (1 - probability) * 100 : probability * 100;
}

function getCategory(percentile: number): string {
  if (percentile < 5) return 'Very Short';
  if (percentile < 25) return 'Below Average';
  if (percentile < 75) return 'Average';
  if (percentile < 95) return 'Above Average';
  return 'Very Tall';
}

function convertToMetric(height: number, unit: 'cm' | 'inches'): number {
  return unit === 'inches' ? height * 2.54 : height;
}

export function calculateHeightPercentile(input: HeightPercentileInput): HeightPercentileResult {
  // Convert height to cm if needed
  const heightCm = convertToMetric(input.height, input.unit);
  
  // Get reference data for gender
  const reference = GROWTH_STANDARDS[input.gender];
  
  // Calculate z-score and percentile
  const zScore = calculateZScore(heightCm, reference.mean, reference.sd);
  const percentile = calculatePercentile(zScore);
  
  // Calculate comparison percentages
  const above = 100 - percentile;
  const similar = Math.min(percentile, above) * 0.2; // Assume ±10% around current percentile is "similar"
  
  // Generate height ranges for different percentiles
  const percentiles = [5, 25, 50, 75, 95];
  const ranges = percentiles.map(p => {
    const zScore = p === 50 ? 0 : p < 50 ? -1.96 : 1.96;
    const height = reference.mean + (zScore * reference.sd);
    return {
      percentile: p,
      height: Math.round(height),
      description: getCategory(p)
    };
  });

  const recommendations = [
    {
      category: 'Growth Tracking',
      suggestion: input.age < 18 ? 
        'Regular height measurements recommended every 6 months' :
        'Annual health check-ups sufficient for adult height monitoring'
    },
    {
      category: 'Nutrition',
      suggestion: percentile < 25 ?
        'Ensure adequate protein and calcium intake' :
        'Maintain balanced diet for overall health'
    },
    {
      category: 'Medical Consultation',
      suggestion: percentile < 5 || percentile > 95 ?
        'Consider consulting with healthcare provider' :
        'Continue routine health monitoring'
    },
    {
      category: 'Lifestyle',
      suggestion: 'Regular exercise and proper sleep habits support healthy growth'
    }
  ];

  return {
    percentile: Math.round(percentile * 10) / 10,
    zScore: Math.round(zScore * 100) / 100,
    category: getCategory(percentile),
    comparison: {
      above: Math.round(above * 10) / 10,
      below: Math.round(percentile * 10) / 10,
      similar: Math.round(similar * 10) / 10
    },
    ranges,
    recommendations
  };
}