export interface CatAgeResult {
  humanAge: number;
  stage: string;
  description: string;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  milestones: {
    catAge: number;
    humanAge: number;
    description: string;
  }[];
}

function calculateHumanAge(catAge: number): number {
  if (catAge <= 1) {
    return catAge * 15;
  } else if (catAge <= 2) {
    return 15 + (catAge - 1) * 9;
  } else {
    return 24 + (catAge - 2) * 4;
  }
}

function getLifeStage(catAge: number): string {
  if (catAge < 0.5) return 'Kitten';
  if (catAge < 1) return 'Junior';
  if (catAge < 7) return 'Adult';
  if (catAge < 11) return 'Mature';
  if (catAge < 15) return 'Senior';
  return 'Geriatric';
}

export function calculateCatAge(catAge: number): CatAgeResult {
  const humanAge = calculateHumanAge(catAge);
  const stage = getLifeStage(catAge);

  const descriptions = {
    Kitten: 'Rapid growth and development phase',
    Junior: 'Transitioning to adulthood',
    Adult: 'Prime of life',
    Mature: 'Beginning of senior years',
    Senior: 'Advanced age requiring special care',
    Geriatric: 'Requires careful monitoring and support'
  };

  const recommendations = [
    {
      category: 'Diet',
      suggestion: stage === 'Kitten' ? 'High-protein kitten food' :
                 stage === 'Senior' || stage === 'Geriatric' ? 'Senior-specific cat food' :
                 'Balanced adult cat food'
    },
    {
      category: 'Exercise',
      suggestion: stage === 'Kitten' || stage === 'Junior' ? 'Multiple play sessions daily' :
                 stage === 'Senior' || stage === 'Geriatric' ? 'Gentle play and movement' :
                 'Regular interactive play'
    },
    {
      category: 'Veterinary Care',
      suggestion: stage === 'Kitten' ? 'Vaccinations and deworming' :
                 stage === 'Senior' || stage === 'Geriatric' ? 'Bi-annual check-ups' :
                 'Annual check-ups'
    },
    {
      category: 'Environment',
      suggestion: stage === 'Senior' || stage === 'Geriatric' ? 'Easy access to resources' :
                 'Enriched environment with climbing and scratching options'
    }
  ];

  const milestones = [
    { catAge: 0.5, humanAge: 8, description: 'Rapid growth phase' },
    { catAge: 1, humanAge: 15, description: 'Sexual maturity' },
    { catAge: 2, humanAge: 24, description: 'Social maturity' },
    { catAge: 6, humanAge: 40, description: 'Middle age begins' },
    { catAge: 10, humanAge: 56, description: 'Senior years begin' },
    { catAge: 15, humanAge: 76, description: 'Geriatric stage' }
  ];

  return {
    humanAge,
    stage,
    description: descriptions[stage as keyof typeof descriptions],
    recommendations,
    milestones
  };
}