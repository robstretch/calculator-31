export interface Point {
  x: number;
  y: number;
}

export interface SlopeResult {
  slope: number | undefined;
  angle: number | undefined;
  perpendicular?: number;
  yIntercept?: number;
  equation: string;
  calculations: {
    step: string;
    formula: string;
    result: string;
  }[];
  points: {
    type: string;
    coordinates: Point[];
  }[];
}