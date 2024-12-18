import { MoonPhaseInput, MoonPhaseResult } from './types';

const LUNAR_MONTH = 29.530588853; // Synodic month in days
const LUNAR_YEAR = 354.367056; // Lunar year in days

function getLunarAge(date: Date): number {
  // Known new moon date
  const knownNewMoon = new Date('2000-01-06T18:14:00.000Z');
  const timeDiff = date.getTime() - knownNewMoon.getTime();
  const daysSinceNewMoon = timeDiff / (1000 * 60 * 60 * 24);
  return (daysSinceNewMoon % LUNAR_MONTH + LUNAR_MONTH) % LUNAR_MONTH;
}

function getPhaseFromAge(age: number): string {
  if (age < 1.84566) return 'New Moon';
  if (age < 5.53699) return 'Waxing Crescent';
  if (age < 9.22831) return 'First Quarter';
  if (age < 12.91963) return 'Waxing Gibbous';
  if (age < 16.61096) return 'Full Moon';
  if (age < 20.30228) return 'Waning Gibbous';
  if (age < 23.99361) return 'Last Quarter';
  if (age < 27.68493) return 'Waning Crescent';
  return 'New Moon';
}

function getNextPhases(currentDate: Date, age: number): { phase: string; date: string; daysUntil: number; }[] {
  const phases = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'];
  const phaseAges = [0, 7.38, 14.76, 22.14];
  const nextPhases = [];

  for (let i = 0; i < phases.length; i++) {
    let daysUntil = (phaseAges[i] - age + LUNAR_MONTH) % LUNAR_MONTH;
    if (daysUntil < 0) daysUntil += LUNAR_MONTH;
    
    const phaseDate = new Date(currentDate.getTime() + daysUntil * 24 * 60 * 60 * 1000);
    nextPhases.push({
      phase: phases[i],
      date: phaseDate.toISOString().split('T')[0],
      daysUntil: Math.round(daysUntil)
    });
  }

  return nextPhases.sort((a, b) => a.daysUntil - b.daysUntil);
}

export function calculateMoonPhase(input: MoonPhaseInput): MoonPhaseResult {
  const date = new Date(input.date);
  const age = getLunarAge(date);
  const phase = getPhaseFromAge(age);
  const illumination = Math.sin((age / LUNAR_MONTH) * Math.PI * 2) * 0.5 + 0.5;

  return {
    phase,
    illumination: Math.round(illumination * 100),
    age: Math.round(age * 100) / 100,
    nextPhases: getNextPhases(date, age),
    characteristics: [
      {
        category: 'Visibility',
        description: `Moon is ${Math.round(illumination * 100)}% illuminated`
      },
      {
        category: 'Best Viewing',
        description: phase.includes('Full') ? 'Midnight' : 'Early evening'
      },
      {
        category: 'Tides',
        description: (phase === 'Full Moon' || phase === 'New Moon') ?
          'Spring tides (higher high and lower low tides)' :
          'Neap tides (moderate tidal range)'
      }
    ],
    astronomicalData: {
      distance: 384400, // Average distance in kilometers
      angularDiameter: 0.5181, // Average angular diameter in degrees
      surfaceBrightness: -12.74 // Apparent magnitude
    }
  };
}