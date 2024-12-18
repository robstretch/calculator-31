export interface PoolDimensions {
  length: number;
  width: number;
  averageDepth: number;
  shape: 'rectangular' | 'circular' | 'oval';
  unit: 'feet' | 'meters';
}

export interface PoolVolumeResult {
  volume: {
    gallons: number;
    liters: number;
    cubicFeet: number;
    cubicMeters: number;
  };
  chemicals: {
    chlorine: number;
    alkalinity: number;
    stabilizer: number;
    shock: number;
  };
  maintenance: {
    filterHours: number;
    weeklyWaterLoss: number;
    pumpSize: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}