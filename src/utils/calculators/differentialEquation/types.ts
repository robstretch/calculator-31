export interface DifferentialEquationResult {
  solution: string;
  steps: string[];
  type: string;
  order: number;
  isLinear: boolean;
  isSeparable: boolean;
  generalSolution: string;
  particularSolution?: string;
}

export type EquationType = 'first-order' | 'second-order' | 'separable' | 'linear';