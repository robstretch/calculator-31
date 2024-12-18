export interface HeightPercentileInput {
  height: number;
  age: number;
  gender: 'male' | 'female';
  unit: 'cm' | 'inches';
}

export interface HeightPercentileResult {
  percentile: number;
  zScore: number;
  category: string;
  comparison: {
    above: number;
    below: number;
    similar: number;
  };
  ranges: {
    percentile: number;
    height: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}