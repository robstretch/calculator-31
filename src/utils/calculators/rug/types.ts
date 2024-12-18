export interface RoomDimensions {
  length: number;
  width: number;
  unit: 'feet' | 'meters';
}

export interface RoomLayout {
  type: 'living' | 'dining' | 'bedroom' | 'office';
  furniture: {
    type: string;
    dimensions: {
      length: number;
      width: number;
    };
  }[];
}

export interface RugResult {
  recommendedSizes: {
    size: string;
    dimensions: {
      length: number;
      width: number;
    };
    coverage: number;
    layout: string;
  }[];
  guidelines: {
    category: string;
    rule: string;
    description: string;
  }[];
  roomAnalysis: {
    totalArea: number;
    idealCoverage: number;
    minimumSize: {
      length: number;
      width: number;
    };
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}