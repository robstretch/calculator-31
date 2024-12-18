import { FogInput, FogResult } from './types';

const VISIBILITY_CATEGORIES = {
  dense: { max: 200, description: 'Dense Fog' },
  moderate: { max: 500, description: 'Moderate Fog' },
  light: { max: 1000, description: 'Light Fog' },
  mist: { max: 2000, description: 'Mist' }
};

function calculateDewPointSpread(temperature: number, dewPoint: number): number {
  return temperature - dewPoint;
}

function calculateVisibility(
  temperature: number,
  dewPoint: number,
  relativeHumidity: number,
  windSpeed: number
): number {
  const spread = calculateDewPointSpread(temperature, dewPoint);
  const baseVisibility = 2000 - (relativeHumidity * 15);
  
  // Adjust for temperature-dewpoint spread
  let visibility = baseVisibility * (spread / 2);
  
  // Adjust for wind speed
  if (windSpeed < 5) {
    visibility *= 0.7; // Low wind reduces visibility
  } else if (windSpeed > 15) {
    visibility *= 1.3; // High wind improves visibility
  }
  
  return Math.max(50, Math.min(2000, visibility));
}

function getVisibilityCategory(visibility: number): string {
  for (const [category, values] of Object.entries(VISIBILITY_CATEGORIES)) {
    if (visibility <= values.max) {
      return values.description;
    }
  }
  return 'Clear Conditions';
}

export function calculateFog(input: FogInput): FogResult {
  // Convert to metric if needed
  let temperature = input.temperature;
  let dewPoint = input.dewPoint;
  let windSpeed = input.windSpeed;
  
  if (input.unit === 'imperial') {
    temperature = (temperature - 32) * 5/9;
    dewPoint = (dewPoint - 32) * 5/9;
    windSpeed = windSpeed * 0.44704; // mph to m/s
  }

  // Calculate visibility
  const visibilityMeters = calculateVisibility(
    temperature,
    dewPoint,
    input.relativeHumidity,
    windSpeed
  );

  // Calculate fog probability
  const spread = calculateDewPointSpread(temperature, dewPoint);
  const probability = Math.min(100, Math.max(0,
    ((100 - (spread * 20)) + 
    (input.relativeHumidity - 70) / 2) * 
    (windSpeed < 10 ? 1.2 : 0.8)
  ));

  // Analyze conditions
  const conditions = [
    {
      factor: 'Temperature-Dewpoint Spread',
      value: spread,
      impact: spread < 2 ? 'High fog risk' : 'Low fog risk'
    },
    {
      factor: 'Relative Humidity',
      value: input.relativeHumidity,
      impact: input.relativeHumidity > 90 ? 'Favorable for fog' : 'Less favorable for fog'
    },
    {
      factor: 'Wind Speed',
      value: windSpeed,
      impact: windSpeed < 5 ? 'Favorable for fog' : 'May disperse fog'
    }
  ];

  // Estimate timing
  const timing = {
    formation: temperature > dewPoint + 5 ? 'Unlikely' : 'Within 2-3 hours',
    dissipation: 'After sunrise + 2 hours',
    duration: Math.round(6 - spread)
  };

  const recommendations = [
    {
      category: 'Travel',
      suggestion: probability > 70 ?
        'Avoid travel if possible, use fog lights when necessary' :
        'Normal precautions sufficient'
    },
    {
      category: 'Visibility',
      suggestion: visibilityMeters < 200 ?
        'Extreme caution required - dense fog conditions' :
        'Moderate caution - reduced visibility possible'
    },
    {
      category: 'Timing',
      suggestion: 'Plan activities around expected fog formation/dissipation'
    },
    {
      category: 'Safety',
      suggestion: 'Maintain safe following distance and reduce speed'
    }
  ];

  return {
    probability: Math.round(probability),
    visibility: {
      meters: Math.round(visibilityMeters),
      feet: Math.round(visibilityMeters * 3.28084),
      category: getVisibilityCategory(visibilityMeters)
    },
    conditions,
    timing,
    recommendations
  };
}