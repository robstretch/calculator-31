export interface HelocResult {
  availableEquity: number;
  maxCreditLine: number;
  monthlyPayment: number;
  totalInterest: number;
  payoffTime: number;
}

export function calculateHeloc(
  homeValue: number,
  mortgageBalance: number,
  creditScore: number,
  interestRate: number,
  monthlyDrawAmount: number,
  monthlyPayment: number
): HelocResult {
  // Calculate available equity (80% of home value minus mortgage balance)
  const maxLTV = 0.80; // Most lenders limit HELOC to 80% LTV
  const totalAvailableEquity = homeValue * maxLTV - mortgageBalance;
  
  // Determine max credit line based on credit score
  let creditLineFactor = 0.65; // Default for fair credit
  if (creditScore >= 740) creditLineFactor = 0.95;
  else if (creditScore >= 700) creditLineFactor = 0.85;
  else if (creditScore >= 660) creditLineFactor = 0.75;
  
  const maxCreditLine = Math.max(0, totalAvailableEquity * creditLineFactor);

  // Calculate monthly interest and payoff time
  const monthlyRate = interestRate / 100 / 12;
  let balance = monthlyDrawAmount;
  let totalInterest = 0;
  let months = 0;
  const maxMonths = 360; // 30 years maximum

  while (balance > 0 && months < maxMonths) {
    const interestCharge = balance * monthlyRate;
    totalInterest += interestCharge;
    balance = balance + interestCharge - monthlyPayment;
    months++;
  }

  return {
    availableEquity: Math.max(0, totalAvailableEquity),
    maxCreditLine: Math.round(maxCreditLine),
    monthlyPayment,
    totalInterest: Math.round(totalInterest),
    payoffTime: months
  };
}