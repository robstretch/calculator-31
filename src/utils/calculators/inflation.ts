export interface InflationResult {
  futureValue: number;
  totalChange: number;
  percentageChange: number;
  averageRate: number;
  yearlyBreakdown: {
    year: number;
    value: number;
    change: number;
  }[];
}

export function calculateInflation(
  amount: number,
  startYear: number,
  endYear: number,
  rate: number = 2.5
): InflationResult {
  const years = endYear - startYear;
  const yearlyBreakdown: { year: number; value: number; change: number; }[] = [];
  
  let currentValue = amount;
  for (let i = 0; i <= years; i++) {
    yearlyBreakdown.push({
      year: startYear + i,
      value: currentValue,
      change: i === 0 ? 0 : (currentValue - yearlyBreakdown[i-1].value)
    });
    currentValue *= (1 + rate / 100);
  }
  
  const futureValue = yearlyBreakdown[yearlyBreakdown.length - 1].value;
  const totalChange = futureValue - amount;
  const percentageChange = (totalChange / amount) * 100;
  const averageRate = Math.pow(futureValue / amount, 1 / years) - 1;
  
  return {
    futureValue,
    totalChange,
    percentageChange,
    averageRate: averageRate * 100,
    yearlyBreakdown
  };
}