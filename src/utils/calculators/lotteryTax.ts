export interface LotteryTaxResult {
  grossWinnings: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  netWinnings: number;
  effectiveTaxRate: number;
  monthlyPayment?: number;
  yearlyBreakdown: {
    year: number;
    payment: number;
    federalTax: number;
    stateTax: number;
    netPayment: number;
  }[];
}

export interface PaymentOption {
  type: 'lump' | 'annuity';
  years?: number;
}

const FEDERAL_TAX_RATE = 0.37; // 37% federal tax rate for lottery winnings

export function calculateLotteryTax(
  winnings: number,
  stateRate: number,
  paymentOption: PaymentOption
): LotteryTaxResult {
  const yearlyBreakdown = [];
  let totalFederalTax = 0;
  let totalStateTax = 0;
  let totalNet = 0;

  if (paymentOption.type === 'lump') {
    // Lump sum is typically 60% of advertised jackpot
    const lumpSum = winnings * 0.6;
    const federalTax = lumpSum * FEDERAL_TAX_RATE;
    const stateTax = lumpSum * (stateRate / 100);
    
    totalFederalTax = federalTax;
    totalStateTax = stateTax;
    totalNet = lumpSum - federalTax - stateTax;

    yearlyBreakdown.push({
      year: 1,
      payment: lumpSum,
      federalTax,
      stateTax,
      netPayment: totalNet
    });
  } else {
    // Annuity payments over specified years
    const yearsToReceive = paymentOption.years || 30;
    const yearlyPayment = winnings / yearsToReceive;
    
    for (let year = 1; year <= yearsToReceive; year++) {
      const federalTax = yearlyPayment * FEDERAL_TAX_RATE;
      const stateTax = yearlyPayment * (stateRate / 100);
      const netPayment = yearlyPayment - federalTax - stateTax;

      totalFederalTax += federalTax;
      totalStateTax += stateTax;
      totalNet += netPayment;

      yearlyBreakdown.push({
        year,
        payment: yearlyPayment,
        federalTax,
        stateTax,
        netPayment
      });
    }
  }

  const totalTax = totalFederalTax + totalStateTax;
  const effectiveTaxRate = (totalTax / winnings) * 100;

  return {
    grossWinnings: winnings,
    federalTax: totalFederalTax,
    stateTax: totalStateTax,
    totalTax,
    netWinnings: totalNet,
    effectiveTaxRate,
    monthlyPayment: paymentOption.type === 'annuity' ? totalNet / (paymentOption.years || 30) / 12 : undefined,
    yearlyBreakdown
  };
}