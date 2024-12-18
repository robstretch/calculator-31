export type RiderStyle = 'all-mountain' | 'freestyle' | 'freeride' | 'powder';

export interface SnowboardResult {
  recommendedLength: {
    min: number;
    max: number;
    ideal: number;
  };
  widthRecommendation: 'standard' | 'mid-wide' | 'wide';
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  styleCharacteristics: {
    flex: string;
    shape: string;
    setback: string;
  };
}