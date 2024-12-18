import { StudentInfo, GraduationResult } from './types';

function calculateGraduationDate(info: StudentInfo): Date {
  const startDate = new Date(info.startYear, info.startMonth - 1);
  let yearsToAdd = 0;

  switch (info.programType) {
    case 'k12':
      yearsToAdd = 12 - info.currentGrade;
      break;
    case 'college-2year':
      yearsToAdd = info.partTime ? 4 : 2;
      if (info.creditsCompleted && info.creditsRequired) {
        yearsToAdd = Math.ceil((info.creditsRequired - info.creditsCompleted) / 
          (info.partTime ? 15 : 30));
      }
      break;
    case 'college-4year':
      yearsToAdd = info.partTime ? 6 : 4;
      if (info.creditsCompleted && info.creditsRequired) {
        yearsToAdd = Math.ceil((info.creditsRequired - info.creditsCompleted) / 
          (info.partTime ? 15 : 30));
      }
      break;
    case 'graduate':
      yearsToAdd = info.partTime ? 4 : 2;
      if (info.creditsCompleted && info.creditsRequired) {
        yearsToAdd = Math.ceil((info.creditsRequired - info.creditsCompleted) / 
          (info.partTime ? 9 : 18));
      }
      break;
  }

  const graduationDate = new Date(startDate);
  graduationDate.setFullYear(graduationDate.getFullYear() + yearsToAdd);
  graduationDate.setMonth(4); // May graduation

  return graduationDate;
}

function generateMilestones(info: StudentInfo, graduationDate: Date): {
  date: Date;
  event: string;
  description: string;
}[] {
  const milestones = [];
  const startDate = new Date(info.startYear, info.startMonth - 1);

  if (info.programType === 'k12') {
    // Add grade advancement milestones
    for (let grade = info.currentGrade; grade <= 12; grade++) {
      const date = new Date(startDate);
      date.setFullYear(date.getFullYear() + (grade - info.currentGrade));
      milestones.push({
        date,
        event: `Grade ${grade} Completion`,
        description: `Complete grade ${grade} academic requirements`
      });
    }
  } else {
    // Add college/graduate milestones
    const totalSemesters = Math.ceil((graduationDate.getTime() - startDate.getTime()) / 
      (1000 * 60 * 60 * 24 * 120)); // ~120 days per semester

    for (let i = 1; i <= totalSemesters; i++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + (i * 4));
      milestones.push({
        date,
        event: `Semester ${i} Completion`,
        description: `Complete semester ${i} coursework and requirements`
      });
    }
  }

  // Add graduation milestone
  milestones.push({
    date: graduationDate,
    event: 'Graduation',
    description: 'Complete all program requirements and graduate'
  });

  return milestones;
}

export function calculateGraduation(info: StudentInfo): GraduationResult {
  const graduationDate = calculateGraduationDate(info);
  const today = new Date();
  
  // Calculate remaining time
  const monthsDiff = (graduationDate.getFullYear() - today.getFullYear()) * 12 + 
    (graduationDate.getMonth() - today.getMonth());
  
  const remainingTime = {
    years: Math.floor(monthsDiff / 12),
    months: monthsDiff % 12,
    semesters: Math.ceil(monthsDiff / 4)
  };

  // Generate milestones
  const milestones = generateMilestones(info, graduationDate);

  // Calculate academic progress
  let percentageComplete = 0;
  let creditsPerSemester;

  if (info.creditsCompleted && info.creditsRequired) {
    percentageComplete = (info.creditsCompleted / info.creditsRequired) * 100;
    creditsPerSemester = info.partTime ? 
      (info.programType === 'graduate' ? 9 : 15) : 
      (info.programType === 'graduate' ? 18 : 30);
  } else if (info.programType === 'k12') {
    percentageComplete = ((info.currentGrade - 1) / 12) * 100;
  }

  // Generate recommendations
  const recommendations = [
    {
      category: 'Academic Planning',
      suggestion: info.programType === 'k12' ? 
        'Stay on track with grade-level requirements' :
        `Maintain ${creditsPerSemester} credits per semester for timely graduation`
    },
    {
      category: 'Timeline',
      suggestion: `Plan for graduation in ${remainingTime.years} years and ${remainingTime.months} months`
    },
    {
      category: 'Progress Tracking',
      suggestion: `You are ${Math.round(percentageComplete)}% complete with your program`
    },
    {
      category: 'Preparation',
      suggestion: info.programType === 'k12' ? 
        'Prepare for standardized tests and college applications' :
        'Review degree requirements and course prerequisites regularly'
    }
  ];

  return {
    graduationDate,
    remainingTime,
    milestones,
    academicProgress: {
      percentageComplete,
      creditsPerSemester,
      estimatedGradTerm: `${graduationDate.getMonth() === 4 ? 'Spring' : 'Fall'} ${graduationDate.getFullYear()}`
    },
    recommendations
  };
}