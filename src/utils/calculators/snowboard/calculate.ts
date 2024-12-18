import { SnowboardResult, RiderStyle } from './types';

const WEIGHT_RANGES = {
  beginner: {
    min: 0.9, // 90% of standard length
    max: 0.95
  },
  intermediate: {
    min: 0.95,
    max: 1.0
  },
  advanced: {
    min: 1.0,
    max: 1.05
  }
};

const STYLE_ADJUSTMENTS = {
  'all-mountain': 0,
  'freestyle': -3,
  'freeride': 2,
  'powder': 4
};

export function calculateSnowboardSize(
  weight: number,
  height: number,
  shoeSize: number,
  experience: 'beginner' | 'intermediate' | 'advanced',
  style: RiderStyle,
  unit: 'metric' | 'imperial' = 'metric'
): SnowboardResult {
  // Convert imperial to metric if needed
  if (unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54;     // inches to cm
  }

  // Base length calculation using height
  const baseLength = height * 0.88;

  // Adjust for weight
  const { min, max } = WEIGHT_RANGES[experience];
  const weightAdjustment = (weight / 75) * 2; // Normalize around 75kg
  
  // Calculate recommended range
  let recommendedMin = baseLength * min + weightAdjustment;
  let recommendedMax = baseLength * max + weightAdjustment;

  // Apply style adjustment
  const styleAdjustment = STYLE_ADJUSTMENTS[style];
  recommendedMin += styleAdjustment;
  recommendedMax += styleAdjustment;

  // Round to nearest cm
  recommendedMin = Math.round(recommendedMin);
  recommendedMax = Math.round(recommendedMax);

  // Calculate ideal width based on shoe size
  const widthRecommendation = shoeSize >= 11.5 ? 'wide' : 
                             shoeSize >= 10.5 ? 'mid-wide' : 
                             'standard';

  // Generate recommendations
  const recommendations = [
    {
      category: 'Board Type',
      suggestion: style === 'freestyle' ? 'True twin shape recommended for freestyle riding' :
                 style === 'freeride' ? 'Directional shape recommended for freeride' :
                 style === 'powder' ? 'Directional or tapered shape recommended for powder' :
                 'All-mountain shape recommended for versatility'
    },
    {
      category: 'Flex Rating',
      suggestion: experience === 'beginner' ? 'Soft to medium flex (3-5/10) for better control' :
                 experience === 'intermediate' ? 'Medium flex (5-7/10) for versatility' :
                 'Medium to stiff flex (7-9/10) for responsive performance'
    },
    {
      category: 'Width',
      suggestion: `${widthRecommendation} board recommended for your boot size`
    },
    {
      category: 'Stance',
      suggestion: style === 'freestyle' ? 'Centered stance recommended' :
                 'Slightly setback stance recommended'
    }
  ];

  return {
    recommendedLength: {
      min: recommendedMin,
      max: recommendedMax,
      ideal: Math.round((recommendedMin + recommendedMax) / 2)
    },
    widthRecommendation,
    recommendations,
    styleCharacteristics: {
      flex: experience === 'beginner' ? 'Soft' :
            experience === 'intermediate' ? 'Medium' : 'Stiff',
      shape: style === 'freestyle' ? 'True Twin' :
             style === 'powder' ? 'Directional Tapered' : 'Directional',
      setback: style === 'freestyle' ? 'Centered' : 'Setback'
    }
  };
}