import { AlimonyInput, AlimonyResult } from './types';

const STATE_FACTORS = {
  'CA': { basePercent: 0.40, maxDuration: 0.5 },
  'NY': { basePercent: 0.30, maxDuration: 0.4 },
  'TX': { basePercent: 0.20, maxDuration: 0.3 },
  // Add more states as needed
};

const DEFAULT_FACTOR = { basePercent: 0.30, maxDuration: 0.4 };

function calculateDuration(marriageLength: number, state: string): { years: number; months: number } {
  const factor = STATE_FACTORS[state] || DEFAULT_FACTOR;
  const durationYears = Math.min(marriageLength * factor.maxDuration, 20);
  const years = Math.floor(durationYears);
  const months = Math.round((durationYears - years) * 12);
  
  return { years, months };
}

export function calculateAlimony(input: AlimonyInput): AlimonyResult {
  const stateFactor = STATE_FACTORS[input.state] || DEFAULT_FACTOR;
  const incomeDiff = Math.max(0, input.income1 - input.income2);
  
  // Calculate base alimony
  let baseAlimony = incomeDiff * stateFactor.basePercent;
  
  // Adjust for children
  if (input.hasChildren) {
    baseAlimony *= input.custodialParent === 'income2' ? 1.2 : 0.8;
  }

  // Calculate duration
  const duration = calculateDuration(input.marriageLength, input.state);

  // Calculate tax implications (2024 rates)
  const taxRate = 0.22; // Assumed tax rate
  const taxSavings = baseAlimony * taxRate;

  const factors = [
    {
      factor: 'Income Disparity',
      impact: (incomeDiff / input.income1) * 100,
      description: `Income difference of ${incomeDiff.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} per year`
    },
    {
      factor: 'Marriage Length',
      impact: input.marriageLength * 5,
      description: `${input.marriageLength} years of marriage`
    },
    {
      factor: 'Children',
      impact: input.hasChildren ? 20 : 0,
      description: input.hasChildren ? 'Children present' : 'No children'
    }
  ];

  const recommendations = [
    {
      category: 'Documentation',
      suggestion: 'Keep detailed records of all income sources and expenses'
    },
    {
      category: 'Legal Counsel',
      suggestion: 'Consult with a family law attorney for state-specific guidance'
    },
    {
      category: 'Tax Planning',
      suggestion: 'Consider tax implications when structuring alimony payments'
    },
    {
      category: 'Modification',
      suggestion: 'Document any significant changes in income or circumstances'
    }
  ];

  return {
    monthlyPayment: Math.round(baseAlimony / 12),
    yearlyPayment: Math.round(baseAlimony),
    duration,
    factors,
    taxImplications: {
      payer: {
        monthlyTaxSavings: Math.round(taxSavings / 12),
        yearlyTaxSavings: Math.round(taxSavings)
      },
      recipient: {
        monthlyTaxable: Math.round(baseAlimony / 12),
        yearlyTaxable: Math.round(baseAlimony)
      }
    },
    recommendations
  };
}