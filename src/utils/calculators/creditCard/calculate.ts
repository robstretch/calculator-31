import { CreditCardInput, CreditCardResult } from './types';

function calculateMinimumPayment(balance: number, minimumRate: number): number {
  return Math.max(25, balance * (minimumRate / 100));
}

export function calculateCreditCard(input: CreditCardInput): CreditCardResult {
  const monthlyRate = input.interestRate / 100 / 12;
  let balance = input.balance;
  let totalInterest = 0;
  let months = 0;
  const monthlyBreakdown = [];

  // Calculate with current payment plan
  while (balance > 0 && months < 600) { // 50-year limit
    const interest = balance * monthlyRate;
    const minPayment = calculateMinimumPayment(balance, input.minimumPayment);
    const payment = Math.min(balance + interest, Math.max(minPayment, input.additionalPayment || minPayment));
    const principal = payment - interest;
    
    totalInterest += interest;
    balance = balance - principal + (input.newPurchases || 0);
    months++;

    monthlyBreakdown.push({
      month: months,
      payment,
      principal,
      interest,
      remainingBalance: balance,
      newPurchases: input.newPurchases
    });

    if (balance <= 0.01) break; // Account for rounding
  }

  // Calculate comparison without extra payments
  let comparisonBalance = input.balance;
  let comparisonMonths = 0;
  let comparisonInterest = 0;

  while (comparisonBalance > 0 && comparisonMonths < 600) {
    const interest = comparisonBalance * monthlyRate;
    const minPayment = calculateMinimumPayment(comparisonBalance, input.minimumPayment);
    const payment = Math.min(comparisonBalance + interest, minPayment);
    const principal = payment - interest;
    
    comparisonInterest += interest;
    comparisonBalance = comparisonBalance - principal + (input.newPurchases || 0);
    comparisonMonths++;

    if (comparisonBalance <= 0.01) break;
  }

  // Generate recommendations
  const recommendations = [
    {
      category: 'Payment Strategy',
      suggestion: input.additionalPayment ? 
        'Continue making extra payments to save on interest' :
        'Consider making additional payments to reduce payoff time'
    },
    {
      category: 'Interest Rate',
      suggestion: input.interestRate > 15 ?
        'Look into balance transfer options for lower rates' :
        'Your rate is competitive - focus on consistent payments'
    },
    {
      category: 'New Purchases',
      suggestion: input.newPurchases ? 
        'Try to avoid new purchases while paying down debt' :
        'Good job avoiding new charges during repayment'
    },
    {
      category: 'Debt Payoff',
      suggestion: months > 24 ?
        'Consider debt consolidation or accelerated payoff methods' :
        'Stay consistent with your current payment plan'
    }
  ];

  return {
    payoffTime: {
      months,
      years: Math.floor(months / 12)
    },
    totalInterest,
    totalPayment: totalInterest + input.balance,
    monthlyBreakdown,
    comparison: {
      withExtra: {
        months,
        totalInterest
      },
      withoutExtra: {
        months: comparisonMonths,
        totalInterest: comparisonInterest
      }
    },
    recommendations
  };
}