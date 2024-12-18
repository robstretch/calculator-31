import { ChemistryInput, ChemistryResult } from './types';

function calculateMolarity(moles: number, volumeLiters: number): number {
  return moles / volumeLiters;
}

function calculateMoles(molarity: number, volumeLiters: number): number {
  return molarity * volumeLiters;
}

function convertVolume(value: number, from: 'L' | 'mL', to: 'L' | 'mL'): number {
  if (from === to) return value;
  return from === 'L' ? value * 1000 : value / 1000;
}

export function calculateChemistry(input: ChemistryInput): ChemistryResult {
  const steps = [];
  const conversions = [];
  let result: ChemistryResult = { steps: [], conversions: [], recommendations: [], safetyInfo: [] };

  if (input.type === 'molarity' && input.moles && input.volume) {
    const volumeLiters = input.volumeUnit === 'mL' ? 
      convertVolume(input.volume, 'mL', 'L') : input.volume;
    
    const molarity = calculateMolarity(input.moles, volumeLiters);
    
    steps.push({
      step: 'Calculate Molarity',
      formula: 'M = moles / liters',
      result: `${molarity.toFixed(3)} M`
    });

    result = {
      ...result,
      molarity,
      steps,
      conversions: [
        {
          from: `${input.volume} ${input.volumeUnit}`,
          to: `${volumeLiters} L`,
          value: volumeLiters
        }
      ],
      recommendations: [
        {
          category: 'Concentration',
          suggestion: molarity > 1 ? 
            'Consider dilution for safer handling' : 
            'Concentration within normal range'
        },
        {
          category: 'Storage',
          suggestion: 'Store in appropriate container with proper labeling'
        }
      ],
      safetyInfo: [
        {
          hazard: 'Chemical Exposure',
          precaution: 'Use appropriate PPE when handling solutions'
        },
        {
          hazard: 'Spills',
          precaution: 'Have neutralizing agents and spill kits ready'
        }
      ]
    };
  }

  return result;
}