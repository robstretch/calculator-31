import { PizzaSpecs, PizzaDoughResult } from './types';

const DOUGH_STYLES = {
  neapolitan: {
    hydration: 0.60,
    saltPercentage: 0.03,
    yeastPercentage: 0.002,
    useOil: false,
    useSugar: false
  },
  'ny-style': {
    hydration: 0.65,
    saltPercentage: 0.025,
    yeastPercentage: 0.003,
    useOil: true,
    useSugar: true
  },
  'thin-crust': {
    hydration: 0.55,
    saltPercentage: 0.02,
    yeastPercentage: 0.003,
    useOil: true,
    useSugar: true
  },
  'deep-dish': {
    hydration: 0.70,
    saltPercentage: 0.025,
    yeastPercentage: 0.004,
    useOil: true,
    useSugar: true
  }
};

function calculateDoughWeight(pizzaSize: number): number {
  // Base weight for a 12" pizza is 250g
  return Math.round((pizzaSize / 12) * (pizzaSize / 12) * 250);
}

function adjustProofTime(baseTime: number, roomTemp: number): number {
  // Adjust proof time based on temperature (baseline is 72°F)
  const tempDiff = roomTemp - 72;
  return baseTime * Math.pow(0.95, tempDiff / 2);
}

export function calculatePizzaDough(specs: PizzaSpecs): PizzaDoughResult {
  const style = DOUGH_STYLES[specs.doughStyle];
  const doughWeight = calculateDoughWeight(specs.pizzaSize);
  const totalDoughWeight = doughWeight * specs.pizzaCount;

  // Calculate flour weight as base (100%)
  const flourWeight = Math.round(totalDoughWeight / (1 + style.hydration + style.saltPercentage + style.yeastPercentage));

  const ingredients = {
    flour: flourWeight,
    water: Math.round(flourWeight * style.hydration),
    salt: Math.round(flourWeight * style.saltPercentage),
    yeast: Math.round(flourWeight * style.yeastPercentage),
    oliveOil: style.useOil ? Math.round(flourWeight * 0.03) : undefined,
    sugar: style.useSugar ? Math.round(flourWeight * 0.01) : undefined
  };

  const proofTimeAdjusted = adjustProofTime(specs.proofTime, specs.roomTemp);

  const timing = {
    mixingTime: 10,
    kneadingTime: style.hydration > 0.65 ? 15 : 10,
    bulkFermentation: Math.round(proofTimeAdjusted * 0.3),
    ballProofing: Math.round(proofTimeAdjusted * 0.7),
    totalTime: Math.round(proofTimeAdjusted + 25)
  };

  const instructions = [
    {
      step: 'Mix Ingredients',
      description: 'Combine flour and salt. Dissolve yeast in warm water. Mix together.',
      duration: timing.mixingTime
    },
    {
      step: 'Knead Dough',
      description: 'Knead until smooth and elastic. Window pane test should pass.',
      duration: timing.kneadingTime
    },
    {
      step: 'Bulk Fermentation',
      description: 'Let dough rise at room temperature, covered.',
      duration: timing.bulkFermentation
    },
    {
      step: 'Divide and Shape',
      description: `Divide into ${specs.pizzaCount} balls of ${doughWeight}g each.`,
      duration: 5
    },
    {
      step: 'Final Proof',
      description: 'Let dough balls proof, covered.',
      duration: timing.ballProofing
    }
  ];

  const tips = [
    {
      category: 'Flour Selection',
      suggestion: specs.doughStyle === 'neapolitan' 
        ? 'Use 00 flour for authentic Neapolitan texture'
        : 'Use bread flour for best results'
    },
    {
      category: 'Water Temperature',
      suggestion: `Use ${specs.roomTemp > 75 ? 'cold' : 'room temperature'} water for optimal fermentation`
    },
    {
      category: 'Kneading',
      suggestion: 'Dough should be smooth and pass the window pane test'
    },
    {
      category: 'Storage',
      suggestion: 'Can be refrigerated up to 72 hours for better flavor'
    }
  ];

  return {
    ingredients,
    hydration: style.hydration * 100,
    timing,
    ballWeight: doughWeight,
    instructions,
    tips
  };
}