export interface MedianResult {
  median: number;
  sortedValues: number[];
  mean: number;
  mode: number[];
  range: number;
}

export function calculateMedian(values: number[]): MedianResult {
  if (!values.length) {
    return {
      median: 0,
      sortedValues: [],
      mean: 0,
      mode: [],
      range: 0
    };
  }

  const sortedValues = [...values].sort((a, b) => a - b);
  const length = sortedValues.length;

  // Calculate median
  const median = length % 2 === 0
    ? (sortedValues[length / 2 - 1] + sortedValues[length / 2]) / 2
    : sortedValues[Math.floor(length / 2)];

  // Calculate mean
  const mean = sortedValues.reduce((sum, val) => sum + val, 0) / length;

  // Calculate mode
  const frequency: { [key: number]: number } = {};
  let maxFrequency = 0;
  sortedValues.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    maxFrequency = Math.max(maxFrequency, frequency[value]);
  });
  const mode = Object.entries(frequency)
    .filter(([, freq]) => freq === maxFrequency)
    .map(([value]) => parseFloat(value));

  // Calculate range
  const range = sortedValues[length - 1] - sortedValues[0];

  return {
    median,
    sortedValues,
    mean,
    mode,
    range
  };
}