import { TattooInput, TattooResult } from './types';

const BASE_RATE = 150; // Base hourly rate
const MINIMUM_CHARGE = 100;

const COMPLEXITY_MULTIPLIERS = {
  simple: 1,
  moderate: 1.5,
  complex: 2
};

const PLACEMENT_MULTIPLIERS = {
  easy: 1,
  moderate: 1.25,
  difficult: 1.5
};

const ARTIST_MULTIPLIERS = {
  apprentice: 0.7,
  experienced: 1,
  master: 1.5
};

export function calculateTattooCost(input: TattooInput): TattooResult {
  // Calculate base time needed (1 square inch per 15 minutes for simple designs)
  const baseTime = input.size * 0.25;
  
  // Apply complexity multiplier
  const adjustedTime = baseTime * COMPLEXITY_MULTIPLIERS[input.complexity];
  
  // Add color time
  const colorTime = (input.colors - 1) * (input.size * 0.1);
  
  // Calculate total hours
  const totalHours = Math.max(0.5, adjustedTime + colorTime);
  
  // Calculate base cost
  const baseCost = Math.max(MINIMUM_CHARGE, totalHours * BASE_RATE);
  
  // Apply placement and artist multipliers
  const adjustedCost = baseCost * 
    PLACEMENT_MULTIPLIERS[input.placement] * 
    ARTIST_MULTIPLIERS[input.artistExperience];

  // Calculate range (±20%)
  const range = {
    low: Math.round(adjustedCost * 0.8),
    high: Math.round(adjustedCost * 1.2),
    average: Math.round(adjustedCost)
  };

  // Calculate number of sessions (4 hours max per session)
  const sessions = Math.ceil(totalHours / 4);

  const priceFactors = [
    {
      factor: 'Size',
      impact: input.size * 2,
      description: `${input.size} square inches`
    },
    {
      factor: 'Complexity',
      impact: (COMPLEXITY_MULTIPLIERS[input.complexity] - 1) * 100,
      description: `${input.complexity} design`
    },
    {
      factor: 'Colors',
      impact: (input.colors - 1) * 10,
      description: `${input.colors} colors used`
    },
    {
      factor: 'Placement',
      impact: (PLACEMENT_MULTIPLIERS[input.placement] - 1) * 100,
      description: `${input.placement} placement area`
    }
  ];

  const aftercare = [
    {
      phase: 'Initial Healing',
      duration: '3-7 days',
      instructions: [
        'Keep bandage on for 2-4 hours',
        'Wash gently with antibacterial soap',
        'Apply thin layer of aftercare ointment',
        'Avoid soaking in water'
      ]
    },
    {
      phase: 'Recovery',
      duration: '2-3 weeks',
      instructions: [
        'Keep tattoo clean and moisturized',
        'Avoid direct sunlight',
        'Don\'t pick or scratch',
        'Wear loose clothing'
      ]
    },
    {
      phase: 'Long-term Care',
      duration: 'Ongoing',
      instructions: [
        'Use sunscreen when exposed',
        'Keep skin moisturized',
        'Touch-ups may be needed after healing'
      ]
    }
  ];

  const recommendations = [
    {
      category: 'Artist Selection',
      suggestion: input.complexity === 'complex' 
        ? 'Choose an experienced artist for detailed work'
        : 'Consider artist style match for best results'
    },
    {
      category: 'Timing',
      suggestion: sessions > 1
        ? `Plan for ${sessions} sessions, spaced 2-3 weeks apart`
        : 'Can be completed in one session'
    },
    {
      category: 'Preparation',
      suggestion: 'Stay hydrated and well-rested before appointment'
    },
    {
      category: 'Budget',
      suggestion: range.average > 500
        ? 'Consider breaking into multiple sessions for cost management'
        : 'Price is typical for size and complexity'
    }
  ];

  return {
    estimatedCost: range,
    timeEstimate: {
      hours: Math.round(totalHours * 10) / 10,
      sessions
    },
    priceFactors,
    recommendations,
    aftercare
  };
}