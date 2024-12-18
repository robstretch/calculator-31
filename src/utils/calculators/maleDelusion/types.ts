export interface DelusionFactors {
  age: number;
  height: number;
  income: number;
  physique: 'poor' | 'average' | 'athletic' | 'excellent';
  socialMedia: 'none' | 'moderate' | 'heavy';
  datingApps: boolean;
  relationshipHistory: 'none' | 'some' | 'extensive';
}

export interface DelusionResult {
  delusionScore: number;
  realityScore: number;
  category: string;
  factors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  marketValue: {
    actual: number;
    perceived: number;
    difference: number;
  };
}