export interface PercentageResult {
  result: number;
  formula: string;
  steps: string[];
  relatedCalculations: {
    value: number;
    description: string;
  }[];
}

export function calculatePercentage(
  value: number,
  percentage: number,
  calculationType: 'percentage-of' | 'percentage-change' | 'is-what-percent'
): PercentageResult {
  let result: number;
  let formula: string;
  let steps: string[] = [];

  switch (calculationType) {
    case 'percentage-of':
      result = (value * percentage) / 100;
      formula = `${value} × ${percentage}%`;
      steps = [
        `Convert percentage to decimal: ${percentage}% = ${percentage/100}`,
        `Multiply value by decimal: ${value} × ${percentage/100} = ${result}`
      ];
      break;

    case 'percentage-change':
      result = ((percentage - value) / value) * 100;
      formula = `((${percentage} - ${value}) ÷ ${value}) × 100`;
      steps = [
        `Calculate difference: ${percentage} - ${value} = ${percentage - value}`,
        `Divide by original value: ${percentage - value} ÷ ${value} = ${(percentage - value) / value}`,
        `Convert to percentage: ${(percentage - value) / value} × 100 = ${result}%`
      ];
      break;

    case 'is-what-percent':
      result = (value / percentage) * 100;
      formula = `(${value} ÷ ${percentage}) × 100`;
      steps = [
        `Divide first value by second value: ${value} ÷ ${percentage} = ${value/percentage}`,
        `Convert to percentage: ${value/percentage} × 100 = ${result}%`
      ];
      break;
  }

  // Calculate related values
  const relatedCalculations = [
    { value: result * 2, description: 'Double the result' },
    { value: result / 2, description: 'Half the result' },
    { value: result * 1.5, description: '150% of the result' },
    { value: result * 0.75, description: '75% of the result' }
  ];

  return {
    result: Math.round(result * 100) / 100,
    formula,
    steps,
    relatedCalculations
  };
}