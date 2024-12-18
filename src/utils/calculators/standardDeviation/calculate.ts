import { StandardDeviationResult } from './types';

function calculateMean(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

function calculateVariance(numbers: number[], mean: number, isSample: boolean = true): number {
  const sumSquaredDiff = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0);
  return sumSquaredDiff / (numbers.length - (isSample ? 1 : 0));
}

function calculateSkewness(numbers: number[], mean: number, standardDeviation: number): number {
  const n = numbers.length;
  const cubedDifferences = numbers.map(x => Math.pow((x - mean) / standardDeviation, 3));
  return (n / ((n - 1) * (n - 2))) * cubedDifferences.reduce((sum, x) => sum + x, 0);
}

function calculateKurtosis(numbers: number[], mean: number, standardDeviation: number): number {
  const n = numbers.length;
  const fourthPowerDifferences = numbers.map(x => Math.pow((x - mean) / standardDeviation, 4));
  return (n * (n + 1) / ((n - 1) * (n - 2) * (n - 3))) * 
         fourthPowerDifferences.reduce((sum, x) => sum + x, 0) - 
         (3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3)));
}

function findMode(numbers: number[]): number[] {
  const frequency: { [key: number]: number } = {};
  let maxFrequency = 0;
  
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    maxFrequency = Math.max(maxFrequency, frequency[num]);
  });

  return Object.entries(frequency)
    .filter(([, freq]) => freq === maxFrequency)
    .map(([num]) => parseFloat(num));
}

function findOutliers(numbers: number[], mean: number, standardDeviation: number): number[] {
  return numbers.filter(num => 
    Math.abs((num - mean) / standardDeviation) > 2
  );
}

export function calculateStandardDeviation(
  numbers: number[],
  isSample: boolean = true
): StandardDeviationResult {
  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const mean = calculateMean(numbers);
  const variance = calculateVariance(numbers, mean, isSample);
  const standardDeviation = Math.sqrt(variance);

  // Calculate z-scores
  const zScores = numbers.map(num => (num - mean) / standardDeviation);

  // Find median
  const mid = Math.floor(sortedNumbers.length / 2);
  const median = sortedNumbers.length % 2 === 0
    ? (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2
    : sortedNumbers[mid];

  return {
    mean,
    variance,
    standardDeviation,
    populationSD: Math.sqrt(calculateVariance(numbers, mean, false)),
    sampleSD: Math.sqrt(calculateVariance(numbers, mean, true)),
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
    },
    zScores,
    outliers: findOutliers(numbers, mean, standardDeviation),
    descriptiveStats: {
      median,
      mode: findMode(numbers),
      range: sortedNumbers[sortedNumbers.length - 1] - sortedNumbers[0],
      skewness: calculateSkewness(numbers, mean, standardDeviation),
      kurtosis: calculateKurtosis(numbers, mean, standardDeviation)
    }
  };
}