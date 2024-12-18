export interface TorqueInput {
  force: number;
  radius: number;
  angle?: number;
  unit: 'metric' | 'imperial';
}

export interface TorqueResult {
  torque: number;
  components: {
    perpendicular: number;
    parallel: number;
  };
  equivalents: {
    newtonMeters?: number;
    footPounds?: number;
    inchPounds?: number;
  };
  power?: {
    watts: number;
    horsepower: number;
  };
  calculations: {
    step: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}