export interface ZScoreResult {
  zScore: number;
  probability: number;
  interpretation: string;
  percentile: number;
  confidenceIntervals: {
    sixtyEight: { lower: number; upper: number };
    ninetyFive: { lower: number; upper: number };
    ninetyNine: { lower: number; upper: number };
  };
}

function calculateProbability(zScore: number): number {
  // Using error function approximation for normal distribution
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
  const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return zScore > 0 ? 1 - probability : probability;
}

function getInterpretation(zScore: number): string {
  const absZ = Math.abs(zScore);
  if (absZ < 1) return "Within one standard deviation of the mean (typical)";
  if (absZ < 2) return "Within two standard deviations (somewhat unusual)";
  if (absZ < 3) return "Within three standard deviations (unusual)";
  return "Beyond three standard deviations (very unusual)";
}

export function calculateZScore(
  value: number,
  mean: number,
  standardDeviation: number
): ZScoreResult {
  const zScore = (value - mean) / standardDeviation;
  const probability = calculateProbability(zScore);
  const percentile = probability * 100;

  return {
    zScore: Math.round(zScore * 1000) / 1000,
    probability: Math.round(probability * 1000) / 1000,
    interpretation: getInterpretation(zScore),
    percentile: Math.round(percentile * 100) / 100,
    confidenceIntervals: {
      sixtyEight: {
        lower: mean - standardDeviation,
        upper: mean + standardDeviation
      },
      ninetyFive: {
        lower: mean - (2 * standardDeviation),
        upper: mean + (2 * standardDeviation)
      },
      ninetyNine: {
        lower: mean - (3 * standardDeviation),
        upper: mean + (3 * standardDeviation)
      }
    }
  };
}