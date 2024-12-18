export interface BACResult {
  bac: number;
  category: string;
  timeToSober: number;
  effects: string[];
  legalStatus: string;
}

export function calculateBAC(
  gender: 'male' | 'female',
  weight: number,
  drinks: number,
  hours: number,
  abv: number = 5,
  volume: number = 12
): BACResult {
  // Convert weight to grams and calculate alcohol distribution ratio
  const ratio = gender === 'male' ? 0.68 : 0.55;
  const weightInGrams = weight * 453.592;

  // Calculate alcohol consumed in grams
  // Standard drink = volume(oz) * abv% * 0.789(density of ethanol)
  const alcoholGrams = (volume * (abv / 100) * 0.789) * drinks;

  // Calculate BAC
  let bac = (alcoholGrams / (weightInGrams * ratio)) * 100;

  // Subtract alcohol metabolized over time (average 0.015 per hour)
  bac -= 0.015 * hours;
  bac = Math.max(0, Math.round(bac * 1000) / 1000);

  // Determine effects and category
  let category: string;
  let effects: string[];
  
  if (bac === 0) {
    category = 'Sober';
    effects = ['No effects from alcohol'];
  } else if (bac < 0.04) {
    category = 'Subtle';
    effects = ['Mild mood changes', 'Slight relaxation', 'No significant impairment'];
  } else if (bac < 0.08) {
    category = 'Mild';
    effects = [
      'Increased relaxation',
      'Mild speech impairment',
      'Lowered inhibitions',
      'Mild balance issues'
    ];
  } else if (bac < 0.15) {
    category = 'Significant';
    effects = [
      'Significant impairment of physical and mental control',
      'Slurred speech',
      'Poor judgment',
      'Balance and coordination problems'
    ];
  } else if (bac < 0.30) {
    category = 'Severe';
    effects = [
      'Severe motor impairment',
      'Loss of consciousness may occur',
      'Memory blackout likely',
      'Significant anxiety and restlessness'
    ];
  } else {
    category = 'Potentially Lethal';
    effects = [
      'Loss of consciousness',
      'Severe respiratory depression',
      'Possible death',
      'Immediate medical attention required'
    ];
  }

  // Calculate time until sober (BAC < 0.01)
  const timeToSober = Math.ceil(bac / 0.015);

  // Determine legal status (0.08 is common legal limit)
  const legalStatus = bac >= 0.08 ? 'Above legal limit' : 'Below legal limit';

  return {
    bac,
    category,
    timeToSober,
    effects,
    legalStatus
  };
}