export interface TipResult {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
  tipPerPerson: number;
  customTipPercent?: number;
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  numPeople: number = 1
): TipResult {
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  
  return {
    tipAmount,
    totalAmount,
    perPerson: totalAmount / numPeople,
    tipPerPerson: tipAmount / numPeople,
    customTipPercent: tipPercent
  };
}