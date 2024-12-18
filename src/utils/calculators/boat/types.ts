export interface BoatLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: {
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
  insuranceEstimate: number;
  maintenanceEstimate: number;
  totalCostOfOwnership: number;
}