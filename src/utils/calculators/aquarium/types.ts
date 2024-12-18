export interface AquariumDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'inches' | 'centimeters';
}

export interface AquariumResult {
  volume: {
    gallons: number;
    liters: number;
  };
  stocking: {
    smallFish: number;
    mediumFish: number;
    largeFish: number;
  };
  maintenance: {
    waterChangeVolume: number;
    weeklyEvaporation: number;
    filterSize: number;
    heaterWattage: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  waterParameters: {
    parameter: string;
    idealRange: string;
    recommendation: string;
  }[];
}