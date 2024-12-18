export interface FactoringInput {
  expression: string;
  method?: 'gcf' | 'difference-squares' | 'trinomial' | 'grouping';
}

export interface FactoringResult {
  factored: string;
  steps: {
    method: string;
    expression: string;
    explanation: string;
  }[];
  roots: number[];
  methods: {
    name: string;
    pattern: string;
    example: string;
  }[];
  visualPoints?: {
    x: number;
    y: number;
  }[];
}