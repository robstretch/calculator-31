export interface PregnancyInput {
  lastPeriod: Date;
  cycleLength: number;
  firstPregnancy: boolean;
  age: number;
  multiples?: boolean;
}

export interface PregnancyResult {
  dueDate: Date;
  currentWeek: number;
  currentTrimester: string;
  milestones: {
    week: number;
    date: Date;
    event: string;
    description: string;
  }[];
  risks: {
    factor: string;
    level: 'low' | 'moderate' | 'high';
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  appointments: {
    week: number;
    date: Date;
    type: string;
    description: string;
  }[];
}