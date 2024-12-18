export interface ConeInput {
  radius: number;
  height: number;
  unit: 'inches' | 'feet' | 'meters';
  type: 'right' | 'oblique';
  angle?: number; // For oblique cones
}

export interface ConeResult {
  volume: {
    cubicInches?: number;
    cubicFeet?: number;
    cubicMeters?: number;
    liters?: number;
  };
  surfaceArea: {
    lateral: number;
    base: number;
    total: number;
  };
  dimensions: {
    slantHeight: number;
    baseCircumference: number;
    sectorAngle: number;
  };
  calculations: {
    step: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}