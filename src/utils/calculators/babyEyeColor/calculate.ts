import { ParentEyeColor, BabyEyeColorResult } from './types';

const DOMINANCE_ORDER = ['brown', 'green', 'hazel', 'blue'];

const GENE_PROBABILITIES = {
  brown: {
    homozygous: { brown: 1.0 },
    heterozygous: { brown: 0.5, green: 0.25, blue: 0.25 }
  },
  green: {
    homozygous: { green: 1.0 },
    heterozygous: { green: 0.5, blue: 0.5 }
  },
  hazel: {
    homozygous: { hazel: 1.0 },
    heterozygous: { hazel: 0.5, blue: 0.5 }
  },
  blue: {
    homozygous: { blue: 1.0 },
    heterozygous: { blue: 1.0 }
  }
};

function calculateProbabilities(parent1: ParentEyeColor, parent2: ParentEyeColor): { [key: string]: number } {
  const probabilities: { [key: string]: number } = {
    brown: 0,
    green: 0,
    hazel: 0,
    blue: 0
  };

  // Default to heterozygous if genetics not specified
  const p1Genetics = parent1.genetics || 'heterozygous';
  const p2Genetics = parent2.genetics || 'heterozygous';

  const p1Probs = GENE_PROBABILITIES[parent1.color][p1Genetics];
  const p2Probs = GENE_PROBABILITIES[parent2.color][p2Genetics];

  // Calculate combined probabilities
  for (const color1 in p1Probs) {
    for (const color2 in p2Probs) {
      const probability = p1Probs[color1] * p2Probs[color2];
      const resultColor = DOMINANCE_ORDER.find(color => 
        [color1, color2].includes(color)
      ) || 'blue';
      probabilities[resultColor] += probability;
    }
  }

  return probabilities;
}

export function calculateBabyEyeColor(parent1: ParentEyeColor, parent2: ParentEyeColor): BabyEyeColorResult {
  const probabilities = calculateProbabilities(parent1, parent2);

  const colorDescriptions = {
    brown: 'Most dominant eye color globally',
    green: 'Relatively rare, found in ~2% of population',
    hazel: 'Mix of brown and green/gold pigments',
    blue: 'Recessive trait, more common in European descent'
  };

  const probabilityArray = Object.entries(probabilities)
    .filter(([_, prob]) => prob > 0)
    .map(([color, probability]) => ({
      color,
      percentage: Math.round(probability * 100),
      description: colorDescriptions[color as keyof typeof colorDescriptions]
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const genetics = [
    {
      genotype: 'BB',
      phenotype: 'Brown',
      probability: probabilities.brown * (parent1.genetics === 'homozygous' || parent2.genetics === 'homozygous' ? 1 : 0.25)
    },
    {
      genotype: 'Bb',
      phenotype: 'Brown',
      probability: probabilities.brown * (parent1.genetics === 'heterozygous' || parent2.genetics === 'heterozygous' ? 0.5 : 0)
    },
    {
      genotype: 'bb',
      phenotype: 'Blue',
      probability: probabilities.blue
    }
  ].filter(g => g.probability > 0);

  const inheritance = [
    {
      pattern: 'Complete Dominance',
      description: 'Brown is dominant over other colors',
      probability: probabilities.brown
    },
    {
      pattern: 'Incomplete Dominance',
      description: 'Green/Hazel results from mixed inheritance',
      probability: probabilities.green + probabilities.hazel
    },
    {
      pattern: 'Recessive Trait',
      description: 'Blue eyes require recessive genes from both parents',
      probability: probabilities.blue
    }
  ].filter(i => i.probability > 0);

  const recommendations = [
    {
      category: 'Timing',
      suggestion: 'Baby\'s final eye color typically develops by age 3'
    },
    {
      category: 'Changes',
      suggestion: 'Most babies are born with blue eyes that may change'
    },
    {
      category: 'Documentation',
      suggestion: 'Take monthly photos to track eye color changes'
    },
    {
      category: 'Medical',
      suggestion: 'Consult pediatrician if eye color is different between eyes'
    }
  ];

  return {
    probabilities: probabilityArray,
    genetics,
    inheritance,
    recommendations
  };
}