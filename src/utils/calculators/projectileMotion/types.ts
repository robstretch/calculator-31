export interface ProjectileMotionInput {
  initialVelocity: number;
  angle: number;
  height: number;
  gravity?: number;
  airResistance?: boolean;
}

export interface ProjectileMotionResult {
  maxHeight: number;
  range: number;
  timeOfFlight: number;
  trajectory: {
    x: number;
    y: number;
    time: number;
  }[];
  components: {
    horizontal: number;
    vertical: number;
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