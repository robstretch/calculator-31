export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  type: 'triangle' | 'rectangle' | 'circle';
  points?: Point[];
  radius?: number;
  width?: number;
  height?: number;
}

export interface CentroidResult {
  centroid: Point;
  area: number;
  calculations: {
    step: string;
    formula: string;
    result: string;
  }[];
  properties: {
    property: string;
    value: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}