export interface OsrsSkill {
  name: string;
  currentLevel: number;
  currentXp: number;
  targetLevel: number;
  targetXp?: number;
}

export interface OsrsAction {
  name: string;
  xpPerAction: number;
  levelRequired: number;
  itemsRequired?: string[];
  cost?: number;
}

export interface OsrsResult {
  xpNeeded: number;
  actionsNeeded: number;
  estimatedCost?: number;
  timeEstimate: {
    hours: number;
    minutes: number;
  };
  levelMilestones: {
    level: number;
    xpRequired: number;
    actionsRemaining: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  efficiency: {
    xpPerHour: number;
    costPerXp?: number;
    profitLoss?: number;
  };
}