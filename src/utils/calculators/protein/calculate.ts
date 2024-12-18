import { ProteinInput, ProteinResult } from './types';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 0.8,
  moderate: 1.0,
  active: 1.2,
  athlete: 1.4
};

const GOAL_MULTIPLIERS = {
  maintenance: 1.0,
  'muscle-gain': 1.2,
  'fat-loss': 1.1
};

const PROTEIN_SOURCES = [
  { food: 'Chicken Breast', servingSize: '100g', protein: 31, calories: 165 },
  { food: 'Salmon', servingSize: '100g', protein: 25, calories: 208 },
  { food: 'Eggs', servingSize: '2 large', protein: 12, calories: 156 },
  { food: 'Greek Yogurt', servingSize: '1 cup', protein: 23, calories: 130 },
  { food: 'Lentils', servingSize: '1 cup cooked', protein: 18, calories: 230 },
  { food: 'Tofu', servingSize: '100g', protein: 8, calories: 76 },
  { food: 'Quinoa', servingSize: '1 cup cooked', protein: 8, calories: 222 },
  { food: 'Whey Protein', servingSize: '1 scoop', protein: 24, calories: 120 }
];

export function calculateProtein(input: ProteinInput): ProteinResult {
  // Convert weight to kg if needed
  const weightKg = input.unit === 'lbs' ? input.weight * 0.453592 : input.weight;

  // Calculate base protein needs (in grams)
  const baseProtein = weightKg * 0.8; // Minimum recommended protein
  const activityMultiplier = ACTIVITY_MULTIPLIERS[input.activityLevel];
  const goalMultiplier = GOAL_MULTIPLIERS[input.goal];

  // Calculate optimal protein range
  const minProtein = Math.round(baseProtein * activityMultiplier);
  const maxProtein = Math.round(baseProtein * activityMultiplier * goalMultiplier * 1.5);
  const optimalProtein = Math.round((minProtein + maxProtein) / 2);

  // Calculate meals per day based on protein needs
  const mealsPerDay = optimalProtein > 150 ? 5 : optimalProtein > 100 ? 4 : 3;
  const proteinPerMeal = Math.round(optimalProtein / mealsPerDay);

  // Filter and sort protein sources based on diet type
  let recommendedSources = [...PROTEIN_SOURCES];
  if (input.dietType === 'vegetarian') {
    recommendedSources = recommendedSources.filter(source => 
      !['Chicken Breast', 'Salmon'].includes(source.food)
    );
  } else if (input.dietType === 'vegan') {
    recommendedSources = recommendedSources.filter(source => 
      ['Lentils', 'Tofu', 'Quinoa'].includes(source.food)
    );
  }

  // Generate recommendations
  const recommendations = [
    {
      category: 'Timing',
      suggestion: `Spread protein intake across ${mealsPerDay} meals for optimal absorption`
    },
    {
      category: 'Sources',
      suggestion: input.dietType === 'vegan' ?
        'Combine different plant proteins to ensure complete amino acid profile' :
        'Include a variety of protein sources for optimal nutrition'
    },
    {
      category: 'Supplementation',
      suggestion: optimalProtein > 120 ?
        'Consider protein supplementation to meet daily goals' :
        'Focus on whole food protein sources'
    },
    {
      category: 'Hydration',
      suggestion: 'Increase water intake with higher protein consumption'
    }
  ];

  return {
    dailyProtein: {
      min: minProtein,
      max: maxProtein,
      optimal: optimalProtein
    },
    mealsPerDay: {
      recommended: mealsPerDay,
      proteinPerMeal
    },
    sources: recommendedSources,
    recommendations
  };
}