import { StampDutyInput, StampDutyResult } from './types';

const ENGLAND_RATES = {
  residential: [
    { threshold: 0, rate: 0 },
    { threshold: 250000, rate: 5 },
    { threshold: 925000, rate: 10 },
    { threshold: 1500000, rate: 12 }
  ],
  firstTime: [
    { threshold: 0, rate: 0 },
    { threshold: 425000, rate: 5 },
    { threshold: 925000, rate: 10 },
    { threshold: 1500000, rate: 12 }
  ],
  additional: [
    { threshold: 0, rate: 3 },
    { threshold: 250000, rate: 8 },
    { threshold: 925000, rate: 13 },
    { threshold: 1500000, rate: 15 }
  ]
};

function calculateTaxBands(price: number, rates: { threshold: number; rate: number; }[]): {
  threshold: number;
  rate: number;
  taxAmount: number;
}[] {
  const bands = [];
  let remainingAmount = price;

  for (let i = 0; i < rates.length; i++) {
    const currentBand = rates[i];
    const nextBand = rates[i + 1];
    const bandMax = nextBand ? nextBand.threshold : Infinity;
    const bandAmount = Math.min(
      remainingAmount,
      bandMax - currentBand.threshold
    );

    if (bandAmount > 0) {
      bands.push({
        threshold: currentBand.threshold,
        rate: currentBand.rate,
        taxAmount: (bandAmount * currentBand.rate) / 100
      });
      remainingAmount -= bandAmount;
    }

    if (remainingAmount <= 0) break;
  }

  return bands;
}

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  // Get appropriate rate table
  let rates = ENGLAND_RATES.residential;
  if (input.buyerType === 'first-time') {
    rates = ENGLAND_RATES.firstTime;
  } else if (input.buyerType === 'additional') {
    rates = ENGLAND_RATES.additional;
  }

  // Calculate tax bands
  const bands = calculateTaxBands(input.propertyPrice, rates);
  
  // Calculate total tax
  const totalTax = bands.reduce((sum, band) => sum + band.taxAmount, 0);
  
  // Calculate effective rate
  const effectiveRate = (totalTax / input.propertyPrice) * 100;

  // Calculate first-time buyer savings if applicable
  let savings;
  if (input.buyerType === 'first-time') {
    const normalBands = calculateTaxBands(input.propertyPrice, ENGLAND_RATES.residential);
    const normalTax = normalBands.reduce((sum, band) => sum + band.taxAmount, 0);
    savings = {
      firstTimeBuyer: totalTax,
      normalRate: normalTax,
      saved: normalTax - totalTax
    };
  }

  const recommendations = [
    {
      category: 'Timing',
      suggestion: input.buyerType === 'first-time' ?
        'Consider utilizing first-time buyer relief schemes' :
        'Plan completion date carefully for tax payment deadline'
    },
    {
      category: 'Property Value',
      suggestion: input.propertyPrice > 925000 ?
        'Consider negotiating price to lower tax band' :
        'Property value within standard tax bands'
    },
    {
      category: 'Additional Property',
      suggestion: input.buyerType === 'additional' ?
        'Plan for higher rates due to additional property surcharge' :
        'Standard rates apply to this purchase'
    },
    {
      category: 'Payment',
      suggestion: 'Ensure stamp duty is paid within 14 days of completion'
    }
  ];

  return {
    totalTax,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    bands,
    breakdown: {
      propertyValue: input.propertyPrice,
      stampDuty: totalTax,
      netCost: input.propertyPrice + totalTax
    },
    savings,
    recommendations
  };
}