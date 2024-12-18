export interface TaxBracket {
  rate: number;
  min: number;
  max: number | null;
}

export interface FilingStatus {
  single: TaxBracket[];
  married: TaxBracket[];
  head: TaxBracket[];
}

export const federalBrackets2024: FilingStatus = {
  single: [
    { rate: 10, min: 0, max: 11600 },
    { rate: 12, min: 11600, max: 47150 },
    { rate: 22, min: 47150, max: 100525 },
    { rate: 24, min: 100525, max: 191950 },
    { rate: 32, min: 191950, max: 243725 },
    { rate: 35, min: 243725, max: 609350 },
    { rate: 37, min: 609350, max: null }
  ],
  married: [
    { rate: 10, min: 0, max: 23200 },
    { rate: 12, min: 23200, max: 94300 },
    { rate: 22, min: 94300, max: 201050 },
    { rate: 24, min: 201050, max: 383900 },
    { rate: 32, min: 383900, max: 487450 },
    { rate: 35, min: 487450, max: 731200 },
    { rate: 37, min: 731200, max: null }
  ],
  head: [
    { rate: 10, min: 0, max: 16550 },
    { rate: 12, min: 16550, max: 63100 },
    { rate: 22, min: 63100, max: 100500 },
    { rate: 24, min: 100500, max: 191950 },
    { rate: 32, min: 191950, max: 243700 },
    { rate: 35, min: 243700, max: 609350 },
    { rate: 37, min: 609350, max: null }
  ]
};

export interface TaxDeductions {
  standard: {
    single: number;
    married: number;
    head: number;
  };
}

export const deductions2024: TaxDeductions = {
  standard: {
    single: 14600,
    married: 29200,
    head: 21900
  }
};

export interface TaxResult {
  effectiveRate: number;
  marginalRate: number;
  totalTax: number;
  taxableIncome: number;
  takeHomeIncome: number;
  brackets: {
    rate: number;
    amount: number;
  }[];
}

export function calculateTax(
  income: number,
  filingStatus: keyof FilingStatus,
  deductions: number = 0,
  stateRate: number = 0
): TaxResult {
  const taxableIncome = Math.max(0, income - (deductions || deductions2024.standard[filingStatus]));
  const brackets = federalBrackets2024[filingStatus];
  let totalTax = 0;
  const taxByBracket: { rate: number; amount: number; }[] = [];

  brackets.forEach((bracket, index) => {
    const min = bracket.min;
    const max = bracket.max ?? Infinity;
    const rate = bracket.rate / 100;

    if (taxableIncome > min) {
      const taxableAmount = Math.min(taxableIncome - min, max - min);
      const taxForBracket = taxableAmount * rate;
      totalTax += taxForBracket;
      taxByBracket.push({ rate: bracket.rate, amount: taxForBracket });
    }
  });

  // Add state tax
  const stateTax = taxableIncome * (stateRate / 100);
  totalTax += stateTax;
  if (stateRate > 0) {
    taxByBracket.push({ rate: stateRate, amount: stateTax });
  }

  const effectiveRate = (totalTax / income) * 100;
  const marginalRate = brackets.find(b => taxableIncome >= b.min && (!b.max || taxableIncome <= b.max))?.rate ?? 0;

  return {
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    marginalRate,
    totalTax: Math.round(totalTax * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    takeHomeIncome: Math.round((income - totalTax) * 100) / 100,
    brackets: taxByBracket
  };
}