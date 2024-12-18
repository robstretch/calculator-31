export interface GearRatioInput {
  drivingTeeth: number;
  drivenTeeth: number;
  type: 'reduction' | 'overdrive';
  rpm?: number;
  unit?: 'metric' | 'imperial';
}

export interface GearRatioResult {
  ratio: number;
  outputSpeed?: number;
  torqueMultiplier: number;
  efficiency: number;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  analysis: {
    type: string;
    value: number;
    description: string;
  }[];
  applications: {
    field: string;
    example: string;
    typicalRatio: string;
  }[];
}