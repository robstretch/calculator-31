export interface PaverInput {
  length: number;
  width: number;
  paverLength: number;
  paverWidth: number;
  paverHeight: number;
  pattern: 'running-bond' | 'herringbone' | 'basketweave' | 'stack-bond';
  slopePercent?: number;
  edging?: boolean;
}

export interface PaverResult {
  totalArea: number;
  paversNeeded: number;
  sandNeeded: {
    base: number;     // Cubic yards
    bedding: number;  // Cubic yards
    joint: number;    // Cubic yards
  };
  gravelNeeded: number; // Cubic yards
  edgingNeeded?: number; // Linear feet
  wastageRecommended: number;
  pattern: {
    name: string;
    efficiency: number;
    difficulty: string;
  };
  estimatedCost: {
    pavers: number;
    sand: number;
    gravel: number;
    edging?: number;
    total: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}