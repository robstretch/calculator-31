import { TScoreInput, TScoreResult } from './types';

function calculatePValue(tScore: number, degreesOfFreedom: number): number {
  // Simplified p-value calculation using normal distribution approximation
  const x = Math.abs(tScore);
  const z = 1 / (1 + 0.2316419 * x);
  const p = 1 - 0.3989423 * Math.exp(-x * x / 2) * z * 
    (0.3193815 + z * (-0.3565638 + z * (1.781478 + z * (-1.821256 + z * 1.330274))));
  return 2 * (1 - p); // Two-tailed p-value
}

function calculateConfidenceInterval(
  mean: number,
  standardError: number,
  criticalValue: number
): { lower: number; upper: number } {
  return {
    lower: mean - (criticalValue * standardError),
    upper: mean + (criticalValue * standardError)
  };
}

export function calculateTScore(input: TScoreInput): TScoreResult {
  const standardError = input.standardDeviation / Math.sqrt(input.sampleSize || 1);
  const tScore = (input.value - input.mean) / standardError;
  const degreesOfFreedom = (input.sampleSize || 1) - 1;
  const pValue = calculatePValue(tScore, degreesOfFreedom);

  // Calculate confidence intervals
  const criticalValues = {
    ninety: 1.645,
    ninetyFive: 1.96,
    ninetyNine: 2.576
  };

  const confidenceIntervals = {
    ninety: calculateConfidenceInterval(input.mean, standardError, criticalValues.ninety),
    ninetyFive: calculateConfidenceInterval(input.mean, standardError, criticalValues.ninetyFive),
    ninetyNine: calculateConfidenceInterval(input.mean, standardError, criticalValues.ninetyNine)
  };

  const calculations = [
    {
      step: 'Standard Error',
      formula: 'SE = σ/√n',
      result: standardError
    },
    {
      step: 'T-Score',
      formula: 't = (x - μ)/SE',
      result: tScore
    },
    {
      step: 'Degrees of Freedom',
      formula: 'df = n - 1',
      result: degreesOfFreedom
    }
  ];

  // Interpret results
  const interpretation = {
    significance: pValue < 0.05 ? 'Statistically significant' : 'Not statistically significant',
    effectSize: Math.abs(tScore) > 2 ? 'Large effect' : Math.abs(tScore) > 1 ? 'Medium effect' : 'Small effect',
    direction: tScore > 0 ? 'Above mean' : 'Below mean'
  };

  const recommendations = [
    {
      category: 'Sample Size',
      suggestion: (input.sampleSize || 0) < 30 ?
        'Consider increasing sample size for more reliable results' :
        'Sample size is adequate for analysis'
    },
    {
      category: 'Statistical Power',
      suggestion: Math.abs(tScore) < 1 ?
        'Effect size may be too small to detect with current sample size' :
        'Good statistical power for detecting effects'
    },
    {
      category: 'Interpretation',
      suggestion: pValue < 0.05 ?
        'Results suggest significant difference from population mean' :
        'Results do not suggest significant difference from population mean'
    },
    {
      category: 'Further Analysis',
      suggestion: 'Consider conducting additional tests to validate findings'
    }
  ];

  return {
    tScore,
    pValue,
    confidenceIntervals,
    interpretation,
    calculations,
    recommendations
  };
}