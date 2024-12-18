export interface HoleInput {
  diameter: number;
  depth: number;
  unit: 'inches' | 'feet' | 'meters';
  soilType: 'loose' | 'average' | 'dense' | 'rocky';
  purpose: 'post' | 'planting' | 'foundation' | 'utility';
}

export interface HoleResult {
  volume: {
    cubicFeet: number;
    cubicYards: number;
    gallons: number;
  };
  excavation: {
    timeEstimate: number; // hours
    difficulty: string;
    methodRecommended: string;
  };
  materials: {
    backfill: number; // cubic yards
    gravel: number;  // cubic yards
    concrete?: number; // cubic yards
  };
  estimatedCost: {
    labor: number;
    materials: number;
    equipment: number;
    total: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}