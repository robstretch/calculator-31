export interface ParentEyeColor {
  color: 'brown' | 'green' | 'blue' | 'hazel';
  genetics?: 'homozygous' | 'heterozygous';
}

export interface BabyEyeColorResult {
  probabilities: {
    color: string;
    percentage: number;
    description: string;
  }[];
  genetics: {
    genotype: string;
    phenotype: string;
    probability: number;
  }[];
  inheritance: {
    pattern: string;
    description: string;
    probability: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}