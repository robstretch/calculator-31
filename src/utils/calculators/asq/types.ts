export interface ASQInput {
  lotSize: number;
  acceptableQualityLevel: number;
  sampleSize: number;
  acceptanceNumber: number;
}

export interface ASQResult {
  probabilityAcceptance: number;
  aoc: {
    quality: number;
    probability: number;
  }[];
  risks: {
    producerRisk: number;
    consumerRisk: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  metrics: {
    averageOutgoingQuality: number;
    averageInspectionLevel: number;
    effectivenessIndex: number;
  };
}