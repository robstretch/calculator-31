export interface OvulationResult {
  ovulationDate: Date;
  fertileWindow: {
    start: Date;
    end: Date;
  };
  nextPeriod: Date;
  currentPhase: string;
  daysUntilOvulation: number;
  cycleDetails: {
    phase: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
}

export function calculateOvulation(
  lastPeriod: Date,
  cycleLength: number = 28,
  lutealPhase: number = 14
): OvulationResult {
  const today = new Date();
  
  // Calculate key dates
  const ovulationDate = new Date(lastPeriod);
  ovulationDate.setDate(ovulationDate.getDate() + cycleLength - lutealPhase);
  
  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);
  
  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(fertileEnd.getDate() + 1);
  
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  // Calculate days until ovulation
  const daysUntilOvulation = Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Determine current cycle phase
  let currentPhase = 'Menstrual';
  if (today > nextPeriod) {
    currentPhase = 'Next Cycle';
  } else if (today >= fertileEnd) {
    currentPhase = 'Luteal';
  } else if (today >= fertileStart) {
    currentPhase = 'Fertile Window';
  } else if (today > new Date(lastPeriod.getTime() + (5 * 24 * 60 * 60 * 1000))) {
    currentPhase = 'Follicular';
  }

  // Generate detailed cycle breakdown
  const cycleDetails = [
    {
      phase: 'Menstrual',
      startDate: lastPeriod,
      endDate: new Date(lastPeriod.getTime() + (5 * 24 * 60 * 60 * 1000)),
      description: 'Menstruation occurs'
    },
    {
      phase: 'Follicular',
      startDate: new Date(lastPeriod.getTime() + (5 * 24 * 60 * 60 * 1000)),
      endDate: fertileStart,
      description: 'Follicle development'
    },
    {
      phase: 'Fertile Window',
      startDate: fertileStart,
      endDate: fertileEnd,
      description: 'Highest chance of conception'
    },
    {
      phase: 'Luteal',
      startDate: fertileEnd,
      endDate: nextPeriod,
      description: 'Post-ovulation phase'
    }
  ];

  return {
    ovulationDate,
    fertileWindow: {
      start: fertileStart,
      end: fertileEnd
    },
    nextPeriod,
    currentPhase,
    daysUntilOvulation,
    cycleDetails
  };
}