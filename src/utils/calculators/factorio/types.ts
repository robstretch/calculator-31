export interface Recipe {
  name: string;
  ingredients: {
    item: string;
    amount: number;
  }[];
  craftingTime: number;
  output: number;
  machineType: 'assembler' | 'furnace' | 'chemical-plant' | 'refinery';
}

export interface FactorioInput {
  recipe: Recipe;
  targetOutput: number;
  machineSpeed: number;
  productivityBonus?: number;
  speedModules?: number;
  productivityModules?: number;
}

export interface FactorioResult {
  machinesNeeded: number;
  actualOutput: number;
  ingredients: {
    item: string;
    amountPerSecond: number;
    amountPerMinute: number;
  }[];
  efficiency: {
    machineEfficiency: number;
    powerConsumption: number;
    pollution: number;
  };
  modules: {
    recommended: string[];
    impact: {
      speed: number;
      productivity: number;
      energy: number;
    };
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}