export interface VertexInput {
  spectaclePower: number;
  vertexDistance: number;
  direction: 'spectacle-to-contact' | 'contact-to-spectacle';
}

export interface VertexResult {
  contactLensPower: number;
  spectaclePower: number;
  difference: number;
  calculations: {
    step: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  conversions: {
    power: number;
    distance: number;
    description: string;
  }[];
}