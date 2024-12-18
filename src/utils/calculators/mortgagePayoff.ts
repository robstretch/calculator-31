export interface PayoffResult {
  originalPayoffDate: Date;
  newPayoffDate: Date;
  monthsSaved: number;
  totalInterestOriginal: number;
  totalInterestNew: number;
  interestSaved: number;
  schedule: {
    payment: number;
    month: Date;
    principal: number;
    interest: number;
    extraPayment: number;
    remainingBalance: number;
  }[];
}

export function calculateMortgagePayoff(
  principal: number,
  interestRate: number,
  startDate: Date,
  monthlyPayment: number,
  extraMonthlyPayment: number = 0,
  extraYearlyPayment: number = 0,
  oneTimePayment: number = 0,
  oneTimePaymentMonth: number = 1,
  oneTimePaymentYear: number = new Date().getFullYear()
): PayoffResult {
  const monthlyRate = interestRate / 100 / 12;
  const schedule = [];
  let balance = principal;
  let totalInterestNew = 0;
  let totalInterestOriginal = 0;
  let month = new Date(startDate);
  let originalBalance = principal;
  
  // Calculate original payoff without extra payments
  while (originalBalance > 0) {
    const interestPayment = originalBalance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment, originalBalance);
    originalBalance -= principalPayment;
    totalInterestOriginal += interestPayment;
  }

  // Calculate new payoff with extra payments
  while (balance > 0) {
    let extraPayment = extraMonthlyPayment;
    
    // Add yearly extra payment if it's January
    if (month.getMonth() === 0) {
      extraPayment += extraYearlyPayment;
    }
    
    // Add one-time payment if it matches the specified month and year
    if (month.getMonth() === oneTimePaymentMonth - 1 && 
        month.getFullYear() === oneTimePaymentYear) {
      extraPayment += oneTimePayment;
    }
    
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
    const totalPrincipalPayment = Math.min(principalPayment + extraPayment, balance);
    
    balance -= totalPrincipalPayment;
    totalInterestNew += interestPayment;
    
    schedule.push({
      payment: monthlyPayment + extraPayment,
      month: new Date(month),
      principal: principalPayment,
      interest: interestPayment,
      extraPayment,
      remainingBalance: balance
    });
    
    month.setMonth(month.getMonth() + 1);
  }

  const originalPayoffDate = new Date(startDate);
  const monthsOriginal = Math.ceil(totalInterestOriginal / (monthlyRate * monthlyPayment));
  originalPayoffDate.setMonth(originalPayoffDate.getMonth() + monthsOriginal);

  return {
    originalPayoffDate,
    newPayoffDate: schedule[schedule.length - 1].month,
    monthsSaved: monthsOriginal - schedule.length,
    totalInterestOriginal,
    totalInterestNew,
    interestSaved: totalInterestOriginal - totalInterestNew,
    schedule
  };
}