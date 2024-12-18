import { PercentageIncreaseInput, PercentageIncreaseResult } from './types';

export function calculatePercentageIncrease(input: PercentageIncreaseInput): PercentageIncreaseResult {
  const absoluteChange = input.newValue - input.oldValue;
  const percentageChange = (absoluteChange / Math.abs(input.oldValue)) * 100;
  const multiplier = input.newValue / input.oldValue;

  const calculations = [
    {
      step: 'Absolute Change',
      formula: 'New Value - Original Value',
      result: `${input.newValue} - ${input.oldValue} = ${absoluteChange}`
    },
    {
      step: 'Percentage Change',
      formula: '(Change ÷ |Original Value|) × 100',
      result: `(${absoluteChange} ÷ ${Math.abs(input.oldValue)}) × 100 = ${percentageChange.toFixed(2)}%`
    },
    {
      step: 'Multiplier',
      formula: 'New Value ÷ Original Value',
      result: `${input.newValue} ÷ ${input.oldValue} = ${multiplier.toFixed(4)}`
    }
  ];

  const examples = [
    {
      type: 'Price Changes',
      values: [
        { old: 100, new: 150, percentage: 50 },
        { old: 200, new: 160, percentage: -20 },
        { old: 50, new: 75, percentage: 50 }
      ]
    },
    {
      type: 'Growth Metrics',
      values: [
        { old: 1000, new: 1200, percentage: 20 },
        { old: 500, new: 750, percentage: 50 },
        { old: 2000, new: 1800, percentage: -10 }
      ]
    }
  ];

  return {
    percentageChange,
    isIncrease: percentageChange > 0,
    absoluteChange,
    multiplier,
    calculations,
    examples
  };
}