export interface BattingStats {
  hits: number;
  atBats: number;
  season?: number;
}

export interface BattingAverageResult {
  battingAverage: number;
  sluggingPercentage?: number;
  onBasePercentage?: number;
  projectedStats: {
    hits: number;
    atBats: number;
    average: number;
  };
  ranking: {
    category: string;
    rating: string;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}