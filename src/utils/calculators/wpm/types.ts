export interface WPMInput {
  words: number;
  time: {
    minutes: number;
    seconds: number;
  };
  errors?: number;
  language?: string;
}

export interface WPMResult {
  wpm: number;
  netWpm: number;
  accuracy: number;
  cpm: number; // Characters per minute
  scores: {
    speed: string;
    accuracy: string;
  };
  statistics: {
    metric: string;
    value: number;
    rating: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}