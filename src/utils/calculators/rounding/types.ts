export interface RoundingResult {
  original: number;
  rounded: number;
  method: RoundingMethod;
  steps: string[];
  nearestValue?: number;
}

export type RoundingMethod = 
  | 'up'
  | 'down'
  | 'nearest'
  | 'truncate'
  | 'bankers'
  | 'nearest-multiple';