export interface Card {
  rank: string;
  suit: string;
}

export interface PokerInput {
  holeCards: Card[];
  communityCards: Card[];
  opponents: number;
}

export interface PokerResult {
  winProbability: number;
  tieProbability: number;
  loseProbability: number;
  handStrength: {
    current: string;
    potential: string[];
    rank: number;
  };
  outs: {
    count: number;
    cards: Card[];
    probability: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  potOdds: {
    required: number;
    implied: number;
    ratio: string;
  };
}