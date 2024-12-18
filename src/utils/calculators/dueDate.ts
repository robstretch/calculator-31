export interface DueDateResult {
  dueDate: Date;
  firstTrimester: Date;
  secondTrimester: Date;
  thirdTrimester: Date;
  conceptionDate: Date;
  weeksPregant: number;
  daysUntilDue: number;
  milestones: {
    date: Date;
    week: number;
    description: string;
  }[];
}

export function calculateDueDate(
  lastPeriod: Date,
  cycleLength: number = 28
): DueDateResult {
  // Calculate due date (Naegele's rule with cycle length adjustment)
  const dueDate = new Date(lastPeriod);
  dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
  
  // Calculate conception date (approximately 2 weeks after LMP)
  const conceptionDate = new Date(lastPeriod);
  conceptionDate.setDate(conceptionDate.getDate() + 14);

  // Calculate trimesters
  const firstTrimester = new Date(lastPeriod);
  firstTrimester.setDate(firstTrimester.getDate() + 90);
  
  const secondTrimester = new Date(lastPeriod);
  secondTrimester.setDate(secondTrimester.getDate() + 180);
  
  const thirdTrimester = new Date(lastPeriod);
  thirdTrimester.setDate(thirdTrimester.getDate() + 270);

  // Calculate current progress
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
  const weeksPregant = Math.floor(daysSinceStart / 7);
  const daysUntilDue = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Important pregnancy milestones
  const milestones = [
    { week: 4, description: "Implantation occurs" },
    { week: 6, description: "Heartbeat may be detected" },
    { week: 8, description: "All major organs forming" },
    { week: 12, description: "End of first trimester" },
    { week: 16, description: "May feel first movements" },
    { week: 20, description: "Anatomy scan ultrasound" },
    { week: 24, description: "Viability milestone" },
    { week: 28, description: "Third trimester begins" },
    { week: 32, description: "Baby's rapid growth period" },
    { week: 36, description: "Full term approaching" },
    { week: 40, description: "Expected delivery date" }
  ].map(milestone => ({
    date: new Date(lastPeriod.getTime() + milestone.week * 7 * 24 * 60 * 60 * 1000),
    week: milestone.week,
    description: milestone.description
  }));

  return {
    dueDate,
    firstTrimester,
    secondTrimester,
    thirdTrimester,
    conceptionDate,
    weeksPregant,
    daysUntilDue,
    milestones
  };
}