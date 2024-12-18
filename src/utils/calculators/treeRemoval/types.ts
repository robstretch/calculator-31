export interface TreeDetails {
  height: number;
  diameter: number;
  location: 'easy' | 'moderate' | 'difficult';
  condition: 'healthy' | 'diseased' | 'dead';
  species: string;
  nearStructures: boolean;
  powerLines: boolean;
  stumpRemoval: boolean;
}

export interface TreeRemovalResult {
  baseCost: number;
  additionalCosts: {
    category: string;
    amount: number;
    reason: string;
  }[];
  totalCost: number;
  timeEstimate: {
    hours: number;
    crew: number;
  };
  equipment: {
    type: string;
    reason: string;
  }[];
  permits: {
    required: boolean;
    type: string;
    estimatedCost: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}