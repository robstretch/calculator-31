export interface PaycheckResult {
  grossPay: number;
  netPay: number;
  taxWithheld: number;
  totalDeductions: number;
}

export function calculatePaycheck(
  salary: number,
  payPeriod: 'weekly' | 'biweekly' | 'monthly',
  taxRate: number,
  deductions: number = 0
): PaycheckResult {
  let periodsPerYear: number;
  switch (payPeriod) {
    case 'weekly': periodsPerYear = 52; break;
    case 'biweekly': periodsPerYear = 26; break;
    case 'monthly': periodsPerYear = 12; break;
  }
  
  const grossPay = salary / periodsPerYear;
  const taxWithheld = grossPay * (taxRate / 100);
  const netPay = grossPay - taxWithheld - deductions;
  
  return {
    grossPay: Math.round(grossPay * 100) / 100,
    netPay: Math.round(netPay * 100) / 100,
    taxWithheld: Math.round(taxWithheld * 100) / 100,
    totalDeductions: Math.round(deductions * 100) / 100
  };
}