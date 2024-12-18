import { MoleInput, MoleResult } from './types';

export function calculateMole(input: MoleInput): MoleResult {
  const steps = [];
  let result = 0;
  const conversions: { moles?: number; grams?: number; molarity?: number } = {};

  switch (input.calculationType) {
    case 'moles-to-grams': {
      result = input.value * input.molarMass;
      steps.push({
        step: 'Convert moles to grams',
        formula: 'grams = moles × molar mass',
        value: result
      });
      conversions.moles = input.value;
      conversions.grams = result;
      break;
    }
    case 'grams-to-moles': {
      result = input.value / input.molarMass;
      steps.push({
        step: 'Convert grams to moles',
        formula: 'moles = grams ÷ molar mass',
        value: result
      });
      conversions.moles = result;
      conversions.grams = input.value;
      break;
    }
    case 'molarity': {
      if (!input.volume) throw new Error('Volume required for molarity calculation');
      result = input.value / input.volume;
      steps.push({
        step: 'Calculate molarity',
        formula: 'molarity = moles ÷ volume(L)',
        value: result
      });
      conversions.moles = input.value;
      conversions.molarity = result;
      break;
    }
  }

  const recommendations = [
    {
      category: 'Precision',
      suggestion: 'Use analytical balance for accurate mass measurements'
    },
    {
      category: 'Solution Preparation',
      suggestion: input.calculationType === 'molarity' ?
        'Use volumetric flask for accurate volume measurements' :
        'Consider solution concentration needs'
    },
    {
      category: 'Safety',
      suggestion: 'Wear appropriate PPE when handling chemicals'
    },
    {
      category: 'Storage',
      suggestion: 'Store solutions in appropriate containers with proper labeling'
    }
  ];

  return {
    result,
    steps,
    conversions,
    recommendations
  };
}