import { ASQInput, ASQResult } from './types';

function calculateBinomialProbability(n: number, k: number, p: number): number {
  const coefficient = factorial(n) / (factorial(k) * factorial(n - k));
  return coefficient * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function calculateAcceptanceProbability(input: ASQInput, defectRate: number): number {
  let probability = 0;
  for (let i = 0; i <= input.acceptanceNumber; i++) {
    probability += calculateBinomialProbability(input.sampleSize, i, defectRate);
  }
  return probability;
}

export function calculateASQ(input: ASQInput): ASQResult {
  // Calculate Operating Characteristic Curve points
  const aoc = Array.from({ length: 21 }, (_, i) => {
    const quality = i * 0.01;
    return {
      quality,
      probability: calculateAcceptanceProbability(input, quality)
    };
  });

  // Calculate producer's and consumer's risks
  const producerRisk = 1 - calculateAcceptanceProbability(input, input.acceptableQualityLevel / 100);
  const consumerRisk = calculateAcceptanceProbability(input, input.acceptableQualityLevel * 2 / 100);

  // Calculate metrics
  const averageOutgoingQuality = aoc.reduce((sum, point) => 
    sum + point.quality * point.probability, 0) / aoc.length;

  const averageInspectionLevel = input.sampleSize / input.lotSize;
  const effectivenessIndex = (1 - consumerRisk - producerRisk) * 100;

  // Generate recommendations
  const recommendations = [
    {
      category: 'Sample Size',
      suggestion: input.sampleSize < Math.sqrt(input.lotSize) ?
        'Consider increasing sample size for better detection' :
        'Sample size is adequate for lot size'
    },
    {
      category: 'Acceptance Number',
      suggestion: input.acceptanceNumber > input.sampleSize * 0.1 ?
        'Consider reducing acceptance number for stricter control' :
        'Acceptance criteria is appropriate'
    },
    {
      category: 'Risk Management',
      suggestion: producerRisk > 0.1 ?
        'High producer risk - consider adjusting sampling plan' :
        'Risk levels are within acceptable range'
    },
    {
      category: 'Inspection Level',
      suggestion: averageInspectionLevel < 0.05 ?
        'Consider increasing inspection level for better quality assurance' :
        'Inspection level provides good coverage'
    }
  ];

  return {
    probabilityAcceptance: calculateAcceptanceProbability(
      input,
      input.acceptableQualityLevel / 100
    ),
    aoc,
    risks: {
      producerRisk,
      consumerRisk
    },
    recommendations,
    metrics: {
      averageOutgoingQuality,
      averageInspectionLevel,
      effectivenessIndex
    }
  };
}