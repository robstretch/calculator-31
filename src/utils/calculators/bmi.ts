export interface BMIResult {
  bmi: number;
  category: string;
}

export function calculateBMI(
  weight: number, 
  height: number, 
  unit: 'metric' | 'imperial'
): BMIResult {
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