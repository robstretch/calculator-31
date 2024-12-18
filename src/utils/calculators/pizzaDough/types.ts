export interface PizzaSpecs {
  pizzaCount: number;
  pizzaSize: number;
  doughStyle: 'neapolitan' | 'ny-style' | 'thin-crust' | 'deep-dish';
  proofTime: number;
  roomTemp: number;
}

export interface PizzaDoughResult {
  ingredients: {
    flour: number;
    water: number;
    salt: number;
    yeast: number;
    oliveOil?: number;
    sugar?: number;
  };
  hydration: number;
  timing: {
    mixingTime: number;
    kneadingTime: number;
    bulkFermentation: number;
    ballProofing: number;
    totalTime: number;
  };
  ballWeight: number;
  instructions: {
    step: string;
    description: string;
    duration?: number;
  }[];
  tips: {
    category: string;
    suggestion: string;
  }[];
}