import { PregnancyInput, PregnancyResult } from './types';

function calculateDueDate(lastPeriod: Date, cycleLength: number): Date {
  const dueDate = new Date(lastPeriod);
  dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
  return dueDate;
}

function getCurrentWeek(lastPeriod: Date): number {
  const today = new Date();
  const days = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
  return Math.floor(days / 7);
}

function getTrimester(week: number): string {
  if (week < 13) return 'First';
  if (week < 27) return 'Second';
  return 'Third';
}

export function calculatePregnancy(input: PregnancyInput): PregnancyResult {
  const dueDate = calculateDueDate(input.lastPeriod, input.cycleLength);
  const currentWeek = getCurrentWeek(input.lastPeriod);
  const currentTrimester = getTrimester(currentWeek);

  const milestones = [
    { week: 4, event: 'Implantation', description: 'Embryo implants in uterus' },
    { week: 6, event: 'Heartbeat', description: 'First heartbeat detectable' },
    { week: 8, event: 'Embryo Development', description: 'Major organs begin forming' },
    { week: 12, event: 'First Trimester Complete', description: 'Risk of miscarriage decreases' },
    { week: 18, event: 'Gender Reveal', description: 'Gender may be visible on ultrasound' },
    { week: 20, event: 'Anatomy Scan', description: 'Detailed ultrasound examination' },
    { week: 24, event: 'Viability', description: 'Baby reaches viability milestone' },
    { week: 28, event: 'Third Trimester', description: 'Final trimester begins' },
    { week: 37, event: 'Full Term', description: 'Baby is considered full term' },
    { week: 40, event: 'Due Date', description: 'Estimated delivery date' }
  ].map(m => ({
    ...m,
    date: new Date(input.lastPeriod.getTime() + (m.week * 7 * 24 * 60 * 60 * 1000))
  }));

  const risks = [
    {
      factor: 'Maternal Age',
      level: input.age >= 35 ? 'high' : input.age <= 17 ? 'moderate' : 'low',
      description: input.age >= 35 ? 'Advanced maternal age requires additional monitoring' : 'Age-related risks are minimal'
    },
    {
      factor: 'First Pregnancy',
      level: input.firstPregnancy ? 'moderate' : 'low',
      description: input.firstPregnancy ? 'First-time pregnancy requires closer monitoring' : 'Previous pregnancy experience'
    },
    {
      factor: 'Multiple Pregnancy',
      level: input.multiples ? 'high' : 'low',
      description: input.multiples ? 'Twin/multiple pregnancy requires special care' : 'Single pregnancy'
    }
  ];

  const appointments = [
    { week: 8, type: 'First Prenatal Visit', description: 'Initial pregnancy confirmation and screening' },
    { week: 12, type: 'NT Scan', description: 'Nuchal translucency ultrasound' },
    { week: 16, type: 'Check-up', description: 'Regular prenatal check-up' },
    { week: 20, type: 'Anatomy Scan', description: 'Detailed ultrasound examination' },
    { week: 24, type: 'Glucose Test', description: 'Gestational diabetes screening' },
    { week: 28, type: 'Third Trimester Check', description: 'Begin more frequent monitoring' },
    { week: 36, type: 'Group B Strep Test', description: 'Routine screening' },
    { week: 38, type: 'Weekly Check', description: 'Weekly monitoring until delivery' }
  ].map(a => ({
    ...a,
    date: new Date(input.lastPeriod.getTime() + (a.week * 7 * 24 * 60 * 60 * 1000))
  }));

  const recommendations = [
    {
      category: 'Nutrition',
      suggestion: 'Take prenatal vitamins and maintain a balanced diet'
    },
    {
      category: 'Exercise',
      suggestion: 'Maintain moderate physical activity as approved by your doctor'
    },
    {
      category: 'Monitoring',
      suggestion: input.age >= 35 ? 
        'Schedule additional genetic screening tests' : 
        'Attend all regular prenatal appointments'
    },
    {
      category: 'Preparation',
      suggestion: currentWeek < 20 ? 
        'Begin planning for maternity leave and baby essentials' :
        'Finalize birth plan and hospital arrangements'
    }
  ];

  return {
    dueDate,
    currentWeek,
    currentTrimester,
    milestones,
    risks,
    recommendations,
    appointments
  };
}