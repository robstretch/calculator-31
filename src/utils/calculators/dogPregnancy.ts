export interface DogPregnancyResult {
  dueDate: Date;
  currentWeek: number;
  daysUntilDue: number;
  stage: string;
  milestones: {
    week: number;
    date: Date;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}

export function calculateDogPregnancy(
  matingDate: Date,
  breedSize: 'small' | 'medium' | 'large'
): DogPregnancyResult {
  // Average gestation period is 63 days, can vary by breed size
  const gestationDays = {
    small: 61,
    medium: 63,
    large: 65
  };

  const dueDate = new Date(matingDate);
  dueDate.setDate(dueDate.getDate() + gestationDays[breedSize]);

  const today = new Date();
  const daysPregnant = Math.floor((today.getTime() - matingDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.floor(daysPregnant / 7) + 1;
  const daysUntilDue = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Determine pregnancy stage
  let stage: string;
  if (currentWeek <= 3) stage = 'Early Stage';
  else if (currentWeek <= 6) stage = 'Middle Stage';
  else stage = 'Late Stage';

  // Generate milestones
  const milestones = [
    { week: 1, description: 'Fertilization and implantation' },
    { week: 2, description: 'Embryo development begins' },
    { week: 3, description: 'Fetal development starts' },
    { week: 4, description: 'Veterinarian can confirm pregnancy' },
    { week: 5, description: 'Puppies begin to develop individual features' },
    { week: 6, description: 'Fetal movement may be visible' },
    { week: 7, description: 'Puppies continue rapid growth' },
    { week: 8, description: 'Mother begins nesting behavior' },
    { week: 9, description: 'Final preparation for whelping' }
  ].map(milestone => ({
    week: milestone.week,
    date: new Date(matingDate.getTime() + (milestone.week - 1) * 7 * 24 * 60 * 60 * 1000),
    description: milestone.description
  }));

  // Generate recommendations
  const recommendations = [
    {
      category: 'Nutrition',
      suggestion: 'Increase food intake gradually, focusing on high-quality protein'
    },
    {
      category: 'Exercise',
      suggestion: 'Maintain moderate exercise but avoid strenuous activity'
    },
    {
      category: 'Veterinary Care',
      suggestion: 'Schedule regular check-ups and vaccinations if needed'
    },
    {
      category: 'Environment',
      suggestion: 'Prepare a quiet, comfortable whelping area'
    }
  ];

  return {
    dueDate,
    currentWeek,
    daysUntilDue,
    stage,
    milestones,
    recommendations
  };
}