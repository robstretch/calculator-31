export interface StudentInfo {
  currentGrade: number;
  startMonth: number;
  startYear: number;
  programType: 'k12' | 'college-2year' | 'college-4year' | 'graduate';
  creditsCompleted?: number;
  creditsRequired?: number;
  partTime?: boolean;
}

export interface GraduationResult {
  graduationDate: Date;
  remainingTime: {
    years: number;
    months: number;
    semesters: number;
  };
  milestones: {
    date: Date;
    event: string;
    description: string;
  }[];
  academicProgress: {
    percentageComplete: number;
    creditsPerSemester?: number;
    estimatedGradTerm: string;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}