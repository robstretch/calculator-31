export interface DuctInput {
  airflow: number;          // CFM (Cubic Feet per Minute)
  velocity: number;         // FPM (Feet per Minute)
  shape: 'round' | 'rectangular';
  maxAspectRatio?: number; // For rectangular ducts
}

export interface DuctResult {
  size: {
    diameter?: number;      // For round ducts (inches)
    width?: number;        // For rectangular ducts (inches)
    height?: number;       // For rectangular ducts (inches)
    area: number;         // Square inches
  };
  pressure: {
    velocityPressure: number;
    frictionLoss: number;
    totalPressure: number;
  };
  velocity: {
    actual: number;
    recommended: {
      min: number;
      max: number;
    };
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}