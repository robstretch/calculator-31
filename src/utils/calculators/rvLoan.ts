export interface RVLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: {
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export function calculateRVLoan(
  principal: number,
  interestRate: number,
  years: number,
  downPayment: number = 0
): RVLoanResult {
  const loanAmount = principal - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = years * 12;
  
  // Calculate monthly payment using amortization formula
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate amortization schedule
  let balance = loanAmount;
  const schedule = [];
  let totalInterestPaid = 0;

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    totalInterestPaid += interestPayment;

    schedule.push({
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance)
    });
  }

  return {
    monthlyPayment,
    totalPayment: monthlyPayment * totalPayments,
    totalInterest: totalInterestPaid,
    amortizationSchedule: schedule
  };
}