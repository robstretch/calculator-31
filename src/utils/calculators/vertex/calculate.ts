import { VertexInput, VertexResult } from './types';

function calculateVertexPower(power: number, distance: number, toContact: boolean): number {
  // Convert distance to meters
  const d = distance / 1000;
  
  if (toContact) {
    // Spectacle to contact lens
    return power / (1 - d * power);
  } else {
    // Contact lens to spectacle
    return power / (1 + d * power);
  }
}

export function calculateVertex(input: VertexInput): VertexResult {
  const result = calculateVertexPower(
    input.spectaclePower,
    input.vertexDistance,
    input.direction === 'spectacle-to-contact'
  );

  const difference = result - input.spectaclePower;

  const calculations = [
    {
      step: 'Convert Distance',
      formula: 'distance / 1000',
      result: input.vertexDistance / 1000
    },
    {
      step: input.direction === 'spectacle-to-contact' ? 'Spectacle to Contact' : 'Contact to Spectacle',
      formula: input.direction === 'spectacle-to-contact' ?
        'P₁ / (1 - d × P₁)' :
        'P₁ / (1 + d × P₁)',
      result: result
    },
    {
      step: 'Power Difference',
      formula: 'P₂ - P₁',
      result: difference
    }
  ];

  const recommendations = [
    {
      category: 'Power Selection',
      suggestion: Math.abs(difference) > 0.75 ?
        'Significant power change - verify comfort with trial lenses' :
        'Minor power adjustment - standard adaptation expected'
    },
    {
      category: 'Vertex Distance',
      suggestion: input.vertexDistance > 14 ?
        'Consider adjusting frame fit to reduce vertex distance' :
        'Vertex distance within normal range'
    },
    {
      category: 'Adaptation',
      suggestion: Math.abs(input.spectaclePower) > 5 ?
        'Allow extra adaptation time for high power change' :
        'Standard adaptation period should suffice'
    },
    {
      category: 'Follow-up',
      suggestion: 'Schedule follow-up to verify visual acuity and comfort'
    }
  ];

  const conversions = [
    {
      power: result,
      distance: input.vertexDistance,
      description: input.direction === 'spectacle-to-contact' ?
        'Equivalent contact lens power' :
        'Equivalent spectacle power'
    },
    {
      power: difference,
      distance: input.vertexDistance,
      description: 'Power change due to vertex distance'
    }
  ];

  return {
    contactLensPower: input.direction === 'spectacle-to-contact' ? result : input.spectaclePower,
    spectaclePower: input.direction === 'spectacle-to-contact' ? input.spectaclePower : result,
    difference,
    calculations,
    recommendations,
    conversions
  };
}