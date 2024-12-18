import { CAGRInput, CAGRResult } from './types';

export function calculateCAGR(input: CAGRInput): CAGRResult {
  // Calculate basic CAGR
  const cagr = (Math.pow(input.finalValue / input.initialValue, 1 / input.years) - 1) * 100;
  
  // Calculate real CAGR if inflation adjustment requested
  let realCAGR: number | undefined;
  if (input.adjustForInflation && input.inflationRate) {
    realCAGR = (((1 + cagr/100) / (1 + input.inflationRate/100)) - 1) * 100;
  }

  // Calculate total growth percentage
  const totalGrowth = ((input.finalValue - input.initialValue) / input.initialValue) * 100;

  // Generate year-by-year projections
  const projections = [];
  for (let year = 0; year <= input.years; year++) {
    const value = input.initialValue * Math.pow(1 + cagr/100, year);
    const projection: { year: number; value: number; realValue?: number } = {
      year,
      value: Math.round(value * 100) / 100
    };
    
    if (input.adjustForInflation && input.inflationRate) {
      const realValue = value / Math.pow(1 + input.inflationRate/100, year);
      projection.realValue = Math.round(realValue * 100) / 100;
    }
    
    projections.push(projection);
  }

  // Generate analysis metrics
  const analysis = [
    {
      metric: 'Annual Growth Rate',
      value: Math.round(cagr * 100) / 100,
      description: 'Percentage growth per year'
    },
    {
      metric: 'Total Growth',
      value: Math.round(totalGrowth * 100) / 100,
      description: 'Total percentage increase'
    },
    {
      metric: 'Growth Multiple',
      value: Math.round((input.finalValue / input.initialValue) * 100) / 100,
      description: 'Final value as multiple of initial value'
    }
  ];

  if (realCAGR !== undefined) {
    analysis.push({
      metric: 'Real Growth Rate',
      value: Math.round(realCAGR * 100) / 100,
      description: 'Growth rate adjusted for inflation'
    });
  }

  // Generate recommendations
  const recommendations = [
    {
      category: 'Growth Analysis',
      suggestion: cagr > 15 
        ? 'Exceptional growth rate - validate assumptions'
        : 'Growth rate within typical range'
    },
    {
      category: 'Time Period',
      suggestion: input.years < 3
        ? 'Consider longer time period for more reliable CAGR'
        : 'Time period sufficient for meaningful analysis'
    },
    {
      category: 'Inflation Impact',
      suggestion: input.adjustForInflation
        ? `Real returns reduced by ${input.inflationRate}% annual inflation`
        : 'Consider adjusting for inflation for real returns'
    },
    {
      category: 'Future Planning',
      suggestion: 'Use CAGR for future growth projections but consider market cycles'
    }
  ];

  return {
    cagr: Math.round(cagr * 100) / 100,
    realCAGR: realCAGR !== undefined ? Math.round(realCAGR * 100) / 100 : undefined,
    totalGrowth: Math.round(totalGrowth * 100) / 100,
    projections,
    analysis,
    recommendations
  };
}