export interface SnowDayFactors {
  snowfall: number;
  temperature: number;
  windSpeed: number;
  existingSnow: number;
  timeOfDay: 'overnight' | 'morning' | 'midday' | 'evening';
  roadConditions: 'clear' | 'wet' | 'icy' | 'snow-covered';
  schoolType: 'urban' | 'suburban' | 'rural';
}

export interface SnowDayResult {
  probability: number;
  factors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  recommendation: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
}

export function calculateSnowDayProbability(factors: SnowDayFactors): SnowDayResult {
  let probability = 0;
  const impactFactors: { factor: string; impact: number; description: string; }[] = [];

  // Snowfall impact (0-40%)
  const snowfallImpact = Math.min(factors.snowfall * 8, 40);
  impactFactors.push({
    factor: 'Snowfall',
    impact: snowfallImpact,
    description: `${factors.snowfall}" of snow expected`
  });
  probability += snowfallImpact;

  // Temperature impact (0-15%)
  const tempImpact = Math.max(0, Math.min((32 - factors.temperature) * 1.5, 15));
  impactFactors.push({
    factor: 'Temperature',
    impact: tempImpact,
    description: `${factors.temperature}°F`
  });
  probability += tempImpact;

  // Wind speed impact (0-15%)
  const windImpact = Math.min(factors.windSpeed * 0.5, 15);
  impactFactors.push({
    factor: 'Wind Speed',
    impact: windImpact,
    description: `${factors.windSpeed} mph winds`
  });
  probability += windImpact;

  // Existing snow impact (0-10%)
  const existingSnowImpact = Math.min(factors.existingSnow * 2, 10);
  impactFactors.push({
    factor: 'Existing Snow',
    impact: existingSnowImpact,
    description: `${factors.existingSnow}" already on ground`
  });
  probability += existingSnowImpact;

  // Time of day impact (0-10%)
  const timeImpacts = {
    overnight: 10,
    morning: 8,
    midday: 4,
    evening: 6
  };
  const timeImpact = timeImpacts[factors.timeOfDay];
  impactFactors.push({
    factor: 'Timing',
    impact: timeImpact,
    description: `Snow during ${factors.timeOfDay}`
  });
  probability += timeImpact;

  // Road conditions impact (0-10%)
  const roadImpacts = {
    clear: 0,
    wet: 3,
    icy: 8,
    'snow-covered': 10
  };
  const roadImpact = roadImpacts[factors.roadConditions];
  impactFactors.push({
    factor: 'Road Conditions',
    impact: roadImpact,
    description: `Roads are ${factors.roadConditions}`
  });
  probability += roadImpact;

  // School location type impact (0-5%)
  const locationImpacts = {
    urban: 2,
    suburban: 3,
    rural: 5
  };
  const locationImpact = locationImpacts[factors.schoolType];
  impactFactors.push({
    factor: 'School Location',
    impact: locationImpact,
    description: `${factors.schoolType} school district`
  });
  probability += locationImpact;

  // Calculate risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  if (probability < 25) riskLevel = 'low';
  else if (probability < 50) riskLevel = 'moderate';
  else if (probability < 75) riskLevel = 'high';
  else riskLevel = 'very-high';

  // Generate recommendation
  let recommendation: string;
  if (probability < 25) {
    recommendation = 'School will likely remain open. Plan for a normal school day.';
  } else if (probability < 50) {
    recommendation = 'Possible delay or closure. Check school announcements in the morning.';
  } else if (probability < 75) {
    recommendation = 'High chance of closure. Prepare for a potential snow day.';
  } else {
    recommendation = 'School closure very likely. Make alternative arrangements.';
  }

  return {
    probability: Math.min(Math.round(probability), 100),
    factors: impactFactors,
    recommendation,
    riskLevel
  };
}