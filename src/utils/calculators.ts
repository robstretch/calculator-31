export function calculateMortgage(
  principal: number,
  interestRate: number,
  years: number,
  downPayment: number = 0
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  const P = principal - downPayment;
  const r = interestRate / 100 / 12;
  const n = years * 12;

  const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - P;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100
  };
}

export function calculateAutoLoan(
  principal: number,
  interestRate: number,
  years: number,
  downPayment: number = 0
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  return calculateMortgage(principal, interestRate, years, downPayment);
}

export function calculateBMI(weight: number, height: number, unit: 'metric' | 'imperial'): {
  bmi: number;
  category: string;
} {
  let bmi: number;
  
  if (unit === 'metric') {
    bmi = weight / ((height / 100) ** 2);
  } else {
    bmi = (weight * 703) / (height ** 2);
  }
  
  bmi = Math.round(bmi * 10) / 10;
  
  let category: string;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return { bmi, category };
}

export function calculateGrade(
  scores: number[],
  weights: number[]
): {
  weightedAverage: number;
  letterGrade: string;
} {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const weightedSum = scores.reduce((sum, score, index) => sum + (score * weights[index]), 0);
  const weightedAverage = Math.round((weightedSum / totalWeight) * 10) / 10;
  
  let letterGrade: string;
  if (weightedAverage >= 90) letterGrade = 'A';
  else if (weightedAverage >= 80) letterGrade = 'B';
  else if (weightedAverage >= 70) letterGrade = 'C';
  else if (weightedAverage >= 60) letterGrade = 'D';
  else letterGrade = 'F';
  
  return { weightedAverage, letterGrade };
}

export function calculatePaycheck(
  salary: number,
  payPeriod: 'weekly' | 'biweekly' | 'monthly',
  taxRate: number,
  deductions: number = 0
): {
  grossPay: number;
  netPay: number;
  taxWithheld: number;
  totalDeductions: number;
} {
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

export function calculateCalories(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active',
  unit: 'metric' | 'imperial'
): {
  bmr: number;
  maintenance: number;
  weightLoss: number;
  weightGain: number;
} {
  // Convert to metric if imperial
  if (unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54; // inches to cm
  }
  
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  
  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };
  
  const maintenance = Math.round(bmr * activityMultipliers[activityLevel]);
  
  return {
    bmr: Math.round(bmr),
    maintenance,
    weightLoss: Math.round(maintenance * 0.8), // 20% deficit
    weightGain: Math.round(maintenance * 1.2) // 20% surplus
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatNumber(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}