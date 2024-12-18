export interface MaxBenchResult {
  maxBench: number;
  strengthLevel: string;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  trainingPercentages: {
    percentage: number;
    weight: number;
    reps: number;
    purpose: string;
  }[];
  bodyweightRatio: number;
}

function getStrengthLevel(maxBench: number, bodyweight: number, gender: 'male' | 'female'): string {
  const ratio = maxBench / bodyweight;
  
  if (gender === 'male') {
    if (ratio < 0.5) return 'Beginner';
    if (ratio < 1.0) return 'Novice';
    if (ratio < 1.5) return 'Intermediate';
    if (ratio < 2.0) return 'Advanced';
    return 'Elite';
  } else {
    if (ratio < 0.3) return 'Beginner';
    if (ratio < 0.6) return 'Novice';
    if (ratio < 0.9) return 'Intermediate';
    if (ratio < 1.2) return 'Advanced';
    return 'Elite';
  }
}

export function calculateMaxBench(
  currentBench: number,
  bodyweight: number,
  gender: 'male' | 'female',
  experienceYears: number
): MaxBenchResult {
  // Calculate max bench based on current bench and experience
  const maxBench = Math.round(currentBench * (1 + (experienceYears * 0.05)));
  
  // Determine strength level
  const strengthLevel = getStrengthLevel(maxBench, bodyweight, gender);
  
  // Calculate training percentages
  const trainingPercentages = [
    { percentage: 100, weight: maxBench, reps: 1, purpose: '1RM (Max Effort)' },
    { percentage: 95, weight: maxBench * 0.95, reps: 2, purpose: 'Strength' },
    { percentage: 90, weight: maxBench * 0.90, reps: 3, purpose: 'Power' },
    { percentage: 85, weight: maxBench * 0.85, reps: 5, purpose: 'Strength-Hypertrophy' },
    { percentage: 80, weight: maxBench * 0.80, reps: 8, purpose: 'Hypertrophy' },
    { percentage: 75, weight: maxBench * 0.75, reps: 10, purpose: 'Volume' },
    { percentage: 70, weight: maxBench * 0.70, reps: 12, purpose: 'Endurance' }
  ];

  // Generate recommendations
  const recommendations = [
    {
      category: 'Training Frequency',
      suggestion: 'Bench press 2-3 times per week with adequate rest between sessions'
    },
    {
      category: 'Form',
      suggestion: 'Focus on proper form with controlled eccentric movement'
    },
    {
      category: 'Programming',
      suggestion: 'Vary intensity and volume based on training goals'
    },
    {
      category: 'Recovery',
      suggestion: 'Ensure 48-72 hours between heavy bench sessions'
    }
  ];

  return {
    maxBench,
    strengthLevel,
    recommendations,
    trainingPercentages,
    bodyweightRatio: maxBench / bodyweight
  };
}