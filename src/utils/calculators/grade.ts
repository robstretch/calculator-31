export interface GradeResult {
  weightedAverage: number;
  letterGrade: string;
}

export function calculateGrade(
  scores: number[],
  weights: number[]
): GradeResult {
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