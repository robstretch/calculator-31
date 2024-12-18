export interface FenceSection {
  length: number;
  height: number;
  gateWidth?: number;
}

export interface FenceResult {
  totalLength: number;
  postCount: number;
  railCount: number;
  picketCount: number;
  gateCount: number;
  materials: {
    type: string;
    amount: number;
    unit: string;
  }[];
  estimatedCost: {
    materials: number;
    hardware: number;
    total: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}