export interface PercentageIncreaseInput {
  oldValue: number;
  newValue: number;
}

export interface PercentageIncreaseResult {
  percentageChange: number;
  isIncrease: boolean;
  absoluteChange: number;
  multiplier: number;
  calculations: {
    step: string;
    formula: string;
    result: string;
  }[];
  examples: {
    type: string;
    values: {
      old: number;
      new: number;
      percentage: number;
    }[];
  }[];
}