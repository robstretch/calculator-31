import { PHInput, PHResult } from './types';

function calculateHydrogenIons(pH: number): number {
  return Math.pow(10, -pH);
}

function calculateHydroxideIons(pH: number): number {
  return Math.pow(10, -(14 - pH));
}

function getClassification(pH: number): string {
  if (pH < 1) return 'Extremely Acidic';
  if (pH < 3) return 'Very Strongly Acidic';
  if (pH < 5) return 'Strongly Acidic';
  if (pH < 6) return 'Moderately Acidic';
  if (pH < 7) return 'Slightly Acidic';
  if (pH === 7) return 'Neutral';
  if (pH < 8) return 'Slightly Basic';
  if (pH < 9) return 'Moderately Basic';
  if (pH < 11) return 'Strongly Basic';
  if (pH < 13) return 'Very Strongly Basic';
  return 'Extremely Basic';
}

export function calculatePH(input: PHInput): PHResult {
  // Calculate pH based on concentration
  let pH: number;
  if (input.unit === 'mol/L') {
    pH = -Math.log10(input.concentration);
  } else {
    // Convert g/L to mol/L (approximate for H+)
    const molarMass = 1.008; // g/mol for H+
    pH = -Math.log10(input.concentration / molarMass);
  }

  // Adjust for temperature if provided (simplified)
  if (input.temperature) {
    const tempFactor = (input.temperature - 25) * 0.01;
    pH = pH * (1 + tempFactor);
  }

  const pOH = 14 - pH;
  const hydrogenIons = calculateHydrogenIons(pH);
  const hydroxideIons = calculateHydroxideIons(pH);

  const calculations = [
    {
      step: 'pH Calculation',
      formula: '-log[H+]',
      result: pH
    },
    {
      step: 'pOH Calculation',
      formula: '14 - pH',
      result: pOH
    },
    {
      step: 'H+ Concentration',
      formula: '10^-pH',
      result: hydrogenIons
    }
  ];

  const properties = [
    {
      metric: 'Hydrogen Ion Concentration',
      value: hydrogenIons,
      description: 'Moles per liter of H+'
    },
    {
      metric: 'Hydroxide Ion Concentration',
      value: hydroxideIons,
      description: 'Moles per liter of OH-'
    },
    {
      metric: 'Ionic Product',
      value: hydrogenIons * hydroxideIons,
      description: 'Product of [H+] and [OH-]'
    }
  ];

  const recommendations = [
    {
      category: 'Safety',
      suggestion: pH < 3 || pH > 11 ? 
        'Extremely corrosive - use appropriate safety equipment' :
        'Standard safety precautions adequate'
    },
    {
      category: 'Storage',
      suggestion: pH < 7 ?
        'Use acid-resistant containers' :
        'Use alkali-resistant containers'
    },
    {
      category: 'Handling',
      suggestion: 'Use appropriate PPE and follow safety protocols'
    },
    {
      category: 'Neutralization',
      suggestion: pH < 7 ?
        'Use base to neutralize if needed' :
        'Use acid to neutralize if needed'
    }
  ];

  return {
    pH: Math.round(pH * 1000) / 1000,
    pOH: Math.round(pOH * 1000) / 1000,
    hydrogenIons,
    hydroxideIons,
    classification: getClassification(pH),
    calculations,
    recommendations,
    properties
  };
}