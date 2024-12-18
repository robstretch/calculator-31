export interface DiamondInput {
  carat: number;
  cut: 'Ideal' | 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  color: 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K';
  clarity: 'FL' | 'IF' | 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'SI2' | 'I1' | 'I2' | 'I3';
  shape: 'Round' | 'Princess' | 'Cushion' | 'Oval' | 'Emerald' | 'Pear' | 'Marquise' | 'Radiant';
}

export interface DiamondResult {
  estimatedPrice: {
    low: number;
    high: number;
    average: number;
  };
  qualityScore: number;
  characteristics: {
    factor: string;
    rating: string;
    impact: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  specifications: {
    dimension: string;
    value: number;
    description: string;
  }[];
}