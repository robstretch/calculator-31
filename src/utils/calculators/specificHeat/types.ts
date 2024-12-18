export interface SpecificHeatInput {
  mass: number;
  initialTemp: number;
  finalTemp: number;
  material: string;
  unit: 'metric' | 'imperial';
}

export interface SpecificHeatResult {
  heatEnergy: number;
  specificHeat: number;
  deltaTemp: number;
  conversions: {
    joules: number;
    calories: number;
    btu: number;
  };
  materialProperties: {
    material: string;
    specificHeat: number;
    conductivity: number;
    density: number;
  };
  calculations: {
    step: string;
    formula: string;
    result: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}