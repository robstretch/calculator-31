import { VoriciInput, VoriciResult } from './types';

const CHROMATIC_COST = 1;
const JEWELLER_COST = 4;
const FUSING_COST = 5;
const VORICI_COST = 10;

function calculateBaseWeights(requirements: { strength?: number; dexterity?: number; intelligence?: number }) {
  const weights = {
    red: 1 + (requirements.strength || 0) / 10,
    green: 1 + (requirements.dexterity || 0) / 10,
    blue: 1 + (requirements.intelligence || 0) / 10
  };
  
  const total = weights.red + weights.green + weights.blue;
  return {
    red: weights.red / total,
    green: weights.green / total,
    blue: weights.blue / total
  };
}

function calculateSuccessRate(input: VoriciInput, weights: { red: number; green: number; blue: number }): number {
  const totalSockets = input.requiredColors.red + input.requiredColors.green + input.requiredColors.blue;
  let probability = 1;

  if (input.requiredColors.red > 0) {
    probability *= Math.pow(weights.red, input.requiredColors.red);
  }
  if (input.requiredColors.green > 0) {
    probability *= Math.pow(weights.green, input.requiredColors.green);
  }
  if (input.requiredColors.blue > 0) {
    probability *= Math.pow(weights.blue, input.requiredColors.blue);
  }

  return probability;
}

export function calculateVorici(input: VoriciInput): VoriciResult {
  const weights = calculateBaseWeights(input.attributeRequirements);
  const successRate = calculateSuccessRate(input, weights);
  
  const methods = [
    {
      method: 'Chromatic Spam',
      averageCost: CHROMATIC_COST / successRate,
      successRate,
      description: 'Repeatedly use Chromatic Orbs'
    },
    {
      method: 'Vorici Craft',
      averageCost: VORICI_COST * input.requiredColors.red,
      successRate: 1,
      description: 'Use Vorici bench craft for guaranteed colors'
    },
    {
      method: 'Jeweller Method',
      averageCost: (JEWELLER_COST + FUSING_COST) / successRate,
      successRate,
      description: 'Use Jeweller\'s Orbs to force specific colors'
    }
  ];

  const bestMethod = methods.reduce((a, b) => 
    a.averageCost < b.averageCost ? a : b
  );

  const probabilities = [
    {
      color: 'Red',
      chance: weights.red * 100,
      weightFactor: input.attributeRequirements.strength ? 
        input.attributeRequirements.strength / 10 : 0
    },
    {
      color: 'Green',
      chance: weights.green * 100,
      weightFactor: input.attributeRequirements.dexterity ? 
        input.attributeRequirements.dexterity / 10 : 0
    },
    {
      color: 'Blue',
      chance: weights.blue * 100,
      weightFactor: input.attributeRequirements.intelligence ? 
        input.attributeRequirements.intelligence / 10 : 0
    }
  ];

  const recommendations = [
    {
      category: 'Crafting Method',
      suggestion: bestMethod.method === 'Vorici Craft' ?
        'Use Vorici bench craft for guaranteed results' :
        'Manual crafting is more cost-effective'
    },
    {
      category: 'Item Choice',
      suggestion: input.itemLevel > 50 ?
        'Consider using a lower item level base for easier coloring' :
        'Item level is good for socket coloring'
    },
    {
      category: 'Requirements',
      suggestion: 'Match item base type with desired socket colors'
    },
    {
      category: 'Cost Saving',
      suggestion: bestMethod.averageCost > 100 ?
        'Consider trading for a pre-colored item' :
        'Self-crafting is cost-effective'
    }
  ];

  return {
    bestMethod,
    methods,
    recommendations,
    probabilities
  };
}