import { SpecificHeatInput, SpecificHeatResult } from './types';

const MATERIALS = {
  water: { specificHeat: 4.186, conductivity: 0.58, density: 1000 },
  aluminum: { specificHeat: 0.897, conductivity: 205, density: 2700 },
  copper: { specificHeat: 0.385, conductivity: 401, density: 8960 },
  iron: { specificHeat: 0.449, conductivity: 80.4, density: 7874 },
  glass: { specificHeat: 0.840, conductivity: 0.96, density: 2500 },
  wood: { specificHeat: 1.760, conductivity: 0.12, density: 700 },
  steel: { specificHeat: 0.490, conductivity: 50.2, density: 7850 }
};

function convertToMetric(value: number, unit: 'mass' | 'temp', from: 'imperial'): number {
  if (unit === 'mass') {
    return value * 453.592; // lb to g
  } else {
    return (value - 32) * 5/9; // °F to °C
  }
}

function convertEnergy(joules: number): {
  joules: number;
  calories: number;
  btu: number;
} {
  return {
    joules,
    calories: joules / 4.184,
    btu: joules / 1055.06
  };
}

export function calculateSpecificHeat(input: SpecificHeatInput): SpecificHeatResult {
  // Convert to metric if needed
  const mass = input.unit === 'imperial' ? convertToMetric(input.mass, 'mass', 'imperial') : input.mass;
  const initialTemp = input.unit === 'imperial' ? convertToMetric(input.initialTemp, 'temp', 'imperial') : input.initialTemp;
  const finalTemp = input.unit === 'imperial' ? convertToMetric(input.finalTemp, 'temp', 'imperial') : input.finalTemp;
  
  const material = MATERIALS[input.material as keyof typeof MATERIALS];
  const deltaTemp = finalTemp - initialTemp;
  
  // Q = mcΔT
  const heatEnergy = mass * material.specificHeat * deltaTemp;
  
  const calculations = [
    {
      step: 'Temperature Change',
      formula: 'ΔT = T₂ - T₁',
      result: `${deltaTemp.toFixed(2)}°C`
    },
    {
      step: 'Heat Energy',
      formula: 'Q = mcΔT',
      result: `${heatEnergy.toFixed(2)} J`
    },
    {
      step: 'Mass Used',
      formula: 'm',
      result: `${mass.toFixed(2)} g`
    }
  ];

  const recommendations = [
    {
      category: 'Material Selection',
      suggestion: material.specificHeat > 2 
        ? 'High heat capacity good for thermal storage'
        : 'Low heat capacity suitable for quick temperature changes'
    },
    {
      category: 'Energy Efficiency',
      suggestion: material.conductivity > 100
        ? 'High thermal conductivity - consider insulation'
        : 'Good thermal resistance for energy conservation'
    },
    {
      category: 'Temperature Control',
      suggestion: Math.abs(deltaTemp) > 50
        ? 'Consider gradual temperature changes'
        : 'Temperature change within normal range'
    },
    {
      category: 'Safety',
      suggestion: finalTemp > 60
        ? 'Use caution with high temperatures'
        : 'Temperature range is safe for handling'
    }
  ];

  return {
    heatEnergy,
    specificHeat: material.specificHeat,
    deltaTemp,
    conversions: convertEnergy(heatEnergy),
    materialProperties: {
      material: input.material,
      specificHeat: material.specificHeat,
      conductivity: material.conductivity,
      density: material.density
    },
    calculations,
    recommendations
  };
}