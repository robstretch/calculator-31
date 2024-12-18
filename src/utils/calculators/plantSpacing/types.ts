export interface PlantSpacingInput {
  plotLength: number;
  plotWidth: number;
  plantSpacing: number;
  rowSpacing: number;
  unit: 'inches' | 'feet' | 'centimeters' | 'meters';
  plantType?: string;
}

export interface PlantSpacingResult {
  plantsPerRow: number;
  numberOfRows: number;
  totalPlants: number;
  coverage: {
    area: number;
    percentageUsed: number;
  };
  spacing: {
    betweenPlants: number;
    betweenRows: number;
    fromEdges: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  plantingPattern: {
    type: string;
    description: string;
    efficiency: number;
  }[];
}