import { BloodTypeInput, BloodTypeResult } from './types';

const BLOOD_TYPE_RARITY = {
  'O+': 38,
  'O-': 7,
  'A+': 34,
  'A-': 6,
  'B+': 9,
  'B-': 2,
  'AB+': 3,
  'AB-': 1
};

const COMPATIBILITY = {
  'O-': { donate: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], receive: ['O-'] },
  'O+': { donate: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'] },
  'A-': { donate: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] },
  'A+': { donate: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'] },
  'B-': { donate: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] },
  'B+': { donate: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'] },
  'AB-': { donate: ['AB+', 'AB-'], receive: ['AB-', 'A-', 'B-', 'O-'] },
  'AB+': { donate: ['AB+'], receive: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'] }
};

const INHERITANCE_RULES = {
  'O': { 'O': ['O'], 'A': ['A', 'O'], 'B': ['B', 'O'], 'AB': ['A', 'B'] },
  'A': { 'O': ['A', 'O'], 'A': ['A', 'O'], 'B': ['AB', 'A', 'B', 'O'], 'AB': ['A', 'B', 'AB'] },
  'B': { 'O': ['B', 'O'], 'A': ['AB', 'A', 'B', 'O'], 'B': ['B', 'O'], 'AB': ['A', 'B', 'AB'] },
  'AB': { 'O': ['A', 'B'], 'A': ['A', 'B', 'AB'], 'B': ['A', 'B', 'AB'], 'AB': ['A', 'B', 'AB'] }
};

function getBaseType(bloodType: string): string {
  return bloodType.replace('+', '').replace('-', '');
}

function getPossibleChildTypes(parent1: string, parent2: string): string[] {
  const base1 = getBaseType(parent1);
  const base2 = getBaseType(parent2);
  const baseTypes = INHERITANCE_RULES[base1][base2];
  
  const rhPositive = parent1.includes('+') || parent2.includes('+');
  return baseTypes.flatMap(type => rhPositive ? [`${type}+`, `${type}-`] : [`${type}-`]);
}

export function calculateBloodType(input: BloodTypeInput): BloodTypeResult {
  let possibleTypes: string[] = [];
  let parentPossibilities;
  let childPossibilities;

  // Calculate based on provided information
  if (input.parent1BloodType && input.parent2BloodType) {
    childPossibilities = getPossibleChildTypes(input.parent1BloodType, input.parent2BloodType);
    possibleTypes = childPossibilities;
  } else if (input.childBloodType && (input.parent1BloodType || input.parent2BloodType)) {
    const knownParent = input.parent1BloodType || input.parent2BloodType;
    parentPossibilities = {
      parent1: Object.keys(BLOOD_TYPE_RARITY),
      parent2: Object.keys(BLOOD_TYPE_RARITY).filter(type => 
        getPossibleChildTypes(knownParent!, type).includes(input.childBloodType!)
      )
    };
    possibleTypes = [input.childBloodType];
  } else if (input.childBloodType) {
    possibleTypes = [input.childBloodType];
  }

  // Get compatibility for each possible type
  const compatibility = {
    canDonateTo: [...new Set(possibleTypes.flatMap(type => COMPATIBILITY[type as keyof typeof COMPATIBILITY].donate))],
    canReceiveFrom: [...new Set(possibleTypes.flatMap(type => COMPATIBILITY[type as keyof typeof COMPATIBILITY].receive))]
  };

  // Get rarity information
  const rarity = {
    type: possibleTypes[0] || 'Unknown',
    percentage: possibleTypes[0] ? BLOOD_TYPE_RARITY[possibleTypes[0] as keyof typeof BLOOD_TYPE_RARITY] : 0
  };

  const recommendations = [
    {
      category: 'Donation',
      suggestion: compatibility.canDonateTo.length > 4 ?
        'Consider regular blood donation - your blood type is in high demand' :
        'Regular donation still valuable for specific recipients'
    },
    {
      category: 'Medical Records',
      suggestion: 'Keep blood type information readily available for emergencies'
    },
    {
      category: 'Family Planning',
      suggestion: parentPossibilities ?
        'Consider genetic counseling for detailed inheritance patterns' :
        'Document family blood types for medical history'
    },
    {
      category: 'Emergency Preparedness',
      suggestion: compatibility.canReceiveFrom.length < 3 ?
        'Important to identify compatible donors in advance' :
        'Multiple donor options available in emergencies'
    }
  ];

  return {
    possibleTypes,
    compatibility,
    parentPossibilities,
    childPossibilities,
    rarity,
    recommendations
  };
}