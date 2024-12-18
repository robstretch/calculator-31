export interface LoveInput {
  name1: string;
  name2: string;
  birthdate1: string;
  birthdate2: string;
  zodiacSign1?: string;
  zodiacSign2?: string;
}

export interface LoveResult {
  compatibilityScore: number;
  categories: {
    emotional: number;
    intellectual: number;
    physical: number;
    spiritual: number;
  };
  analysis: {
    category: string;
    score: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  numerology: {
    lifePathNumber1: number;
    lifePathNumber2: number;
    compatibility: string;
  };
}