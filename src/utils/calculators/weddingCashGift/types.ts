export interface WeddingGiftInput {
  relationship: 'immediate-family' | 'relative' | 'close-friend' | 'friend' | 'coworker';
  attending: boolean;
  plusOne?: boolean;
  location: 'local' | 'destination';
  weddingType: 'formal' | 'semiformal' | 'casual';
  region: 'northeast' | 'midwest' | 'south' | 'west' | 'international';
}

export interface WeddingGiftResult {
  recommendedAmount: {
    min: number;
    max: number;
    average: number;
  };
  factors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  etiquette: {
    rule: string;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}