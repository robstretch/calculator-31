export interface MoonPhaseInput {
  date: string;
}

export interface MoonPhaseResult {
  phase: string;
  illumination: number;
  age: number;
  nextPhases: {
    phase: string;
    date: string;
    daysUntil: number;
  }[];
  characteristics: {
    category: string;
    description: string;
  }[];
  astronomicalData: {
    distance: number;
    angularDiameter: number;
    surfaceBrightness: number;
  };
}