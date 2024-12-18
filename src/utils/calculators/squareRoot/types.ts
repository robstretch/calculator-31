export interface SquareRootResult {
  result: number;
  steps: string[];
  approximationMethod: string;
  precision: number;
  alternativeMethods: {
    method: string;
    value: number;
  }[];
}