export interface VoriciInput {
  requiredColors: {
    red: number;
    green: number;
    blue: number;
  };
  itemLevel: number;
  itemType: 'body' | 'gloves' | 'boots' | 'helmet' | 'shield' | 'weapon';
  attributeRequirements: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
}

export interface VoriciResult {
  bestMethod: {
    method: string;
    averageCost: number;
    successRate: number;
  };
  methods: {
    method: string;
    averageCost: number;
    successRate: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  probabilities: {
    color: string;
    chance: number;
    weightFactor: number;
  }[];
}