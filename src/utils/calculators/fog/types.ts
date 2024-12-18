export interface FogInput {
  temperature: number;
  dewPoint: number;
  relativeHumidity: number;
  windSpeed: number;
  unit: 'metric' | 'imperial';
}

export interface FogResult {
  probability: number;
  visibility: {
    meters: number;
    feet: number;
    category: string;
  };
  conditions: {
    factor: string;
    value: number;
    impact: string;
  }[];
  timing: {
    formation: string;
    dissipation: string;
    duration: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}