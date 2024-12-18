export interface ProRataInput {
  totalShares: number;
  newShares: number;
  currentHolding: number;
  sharePrice: number;
}

export interface ProRataResult {
  entitlement: number;
  cost: number;
  newHolding: {
    shares: number;
    percentage: number;
    value: number;
  };
  dilution: {
    withoutParticipation: number;
    withParticipation: number;
  };
  calculations: {
    step: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}