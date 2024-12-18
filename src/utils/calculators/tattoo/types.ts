export interface TattooInput {
  size: number; // Square inches
  complexity: 'simple' | 'moderate' | 'complex';
  colors: number;
  placement: 'easy' | 'moderate' | 'difficult';
  artistExperience: 'apprentice' | 'experienced' | 'master';
}

export interface TattooResult {
  estimatedCost: {
    low: number;
    high: number;
    average: number;
  };
  timeEstimate: {
    hours: number;
    sessions: number;
  };
  priceFactors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  aftercare: {
    phase: string;
    duration: string;
    instructions: string[];
  }[];
}