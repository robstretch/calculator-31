export interface Point {
  x: number;
  y: number;
  z?: number;
}

export interface MidpointResult {
  midpoint: Point;
  distance: number;
  slope?: number;
  calculations: {
    step: string;
    formula: string;
    result: string;
  }[];
  coordinates: {
    type: string;
    points: Point[];
  }[];
}