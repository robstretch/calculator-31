export interface BloodTypeInput {
  childBloodType?: string;
  parent1BloodType?: string;
  parent2BloodType?: string;
}

export interface BloodTypeResult {
  possibleTypes: string[];
  compatibility: {
    canDonateTo: string[];
    canReceiveFrom: string[];
  };
  parentPossibilities?: {
    parent1: string[];
    parent2: string[];
  };
  childPossibilities?: string[];
  rarity: {
    type: string;
    percentage: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}