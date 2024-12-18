export interface StandardDeviationResult {
  mean: number;
  variance: number;
  standardDeviation: number;
  populationSD?: number;
  sampleSD?: number;
  confidenceIntervals: {
    sixtyEight: { lower: number; upper: number };
    ninetyFive: { lower: number; upper: number };
    ninetyNine: { lower: number; upper: number };
  };
  zScores: number[];
  outliers: number[];
  descriptiveStats: {
    median: number;
    mode: number[];
    range: number;
    skewness: number;
    kurtosis: number;
  };
}