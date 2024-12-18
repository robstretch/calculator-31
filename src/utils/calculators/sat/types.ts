export interface SATScores {
  readingRaw: number;
  mathRaw: number;
  writingRaw: number;
}

export interface SATResult {
  totalScore: number;
  sectionScores: {
    reading: number;
    math: number;
    writing: number;
  };
  compositeScores: {
    evidenceBasedReading: number;
    math: number;
  };
  percentiles: {
    total: number;
    reading: number;
    math: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  collegeReadiness: {
    benchmark: string;
    status: string;
    recommendation: string;
  }[];
}