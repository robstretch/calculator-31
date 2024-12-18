export interface CaffeineInput {
  weight: number;
  unit: 'kg' | 'lbs';
  consumptions: {
    source: string;
    amount: number;
    time: string;
  }[];
  sensitivity: 'low' | 'normal' | 'high';
}

export interface CaffeineResult {
  currentLevel: number;
  peakLevel: number;
  halfLife: number;
  metabolismRate: number;
  timeline: {
    time: string;
    level: number;
    status: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  sources: {
    name: string;
    servingSize: string;
    caffeineContent: number;
  }[];
}