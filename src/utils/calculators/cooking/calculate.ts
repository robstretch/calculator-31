import { CookingInput, CookingResult } from './types';

function convertTemperature(value: number, fromUnit: 'F' | 'C'): { fahrenheit: number; celsius: number } {
  if (fromUnit === 'F') {
    return {
      fahrenheit: value,
      celsius: Math.round((value - 32) * 5/9)
    };
  } else {
    return {
      celsius: value,
      fahrenheit: Math.round(value * 9/5 + 32)
    };
  }
}

function convertWeight(value: number, fromUnit: 'lbs' | 'kg'): { pounds: number; kilograms: number } {
  if (fromUnit === 'lbs') {
    return {
      pounds: value,
      kilograms: Math.round(value * 0.45359237 * 100) / 100
    };
  } else {
    return {
      kilograms: value,
      pounds: Math.round(value * 2.20462262 * 100) / 100
    };
  }
}

function scaleTime(hours: number, minutes: number, ratio: number): { hours: number; minutes: number } {
  const totalMinutes = Math.round((hours * 60 + minutes) * Math.sqrt(ratio));
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60
  };
}

export function calculateCooking(input: CookingInput): CookingResult {
  const scalingRatio = input.servings / input.originalServings;
  
  // Example ingredients (in practice, these would be passed in)
  const ingredients = [
    { amount: 2, unit: 'cups', name: 'flour' },
    { amount: 1, unit: 'tsp', name: 'salt' },
    { amount: 0.5, unit: 'cup', name: 'sugar' },
    { amount: 3, unit: 'tbsp', name: 'butter' }
  ].map(ing => ({
    original: ing.amount,
    scaled: Math.round(ing.amount * scalingRatio * 100) / 100,
    unit: ing.unit,
    name: ing.name
  }));

  // Calculate temperature conversions if provided
  const temperature = input.temperature ? 
    convertTemperature(input.temperature.value, input.temperature.unit) : 
    undefined;

  // Scale time if provided
  const time = input.time ?
    scaleTime(input.time.hours, input.time.minutes, scalingRatio) :
    undefined;

  // Convert weight if provided
  const weight = input.weight ?
    convertWeight(input.weight.value, input.weight.unit) :
    undefined;

  // Generate conversions list
  const conversions = [];
  if (temperature) {
    conversions.push({
      category: 'Temperature',
      original: `${input.temperature!.value}°${input.temperature!.unit}`,
      converted: input.temperature!.unit === 'F' ?
        `${temperature.celsius}°C` :
        `${temperature.fahrenheit}°F`
    });
  }
  if (weight) {
    conversions.push({
      category: 'Weight',
      original: `${input.weight!.value}${input.weight!.unit}`,
      converted: input.weight!.unit === 'lbs' ?
        `${weight.kilograms}kg` :
        `${weight.pounds}lbs`
    });
  }

  const recommendations = [
    {
      category: 'Scaling',
      suggestion: scalingRatio > 2 ?
        'Consider splitting into multiple batches' :
        'Recipe can be prepared in one batch'
    },
    {
      category: 'Temperature',
      suggestion: temperature ?
        'Maintain consistent temperature throughout cooking' :
        'Use thermometer to verify cooking temperature'
    },
    {
      category: 'Timing',
      suggestion: time ?
        `Adjust cooking time to ${time.hours}h ${time.minutes}m` :
        'Monitor doneness rather than relying solely on time'
    },
    {
      category: 'Measurements',
      suggestion: 'Use precise measurements for best results'
    }
  ];

  return {
    ingredients,
    temperature,
    time,
    weight,
    conversions,
    recommendations
  };
}