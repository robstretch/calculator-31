export interface Card {
  value: number;
  suit?: string;
  isAce?: boolean;
}

export interface BlackjackInput {
  playerCards: Card[];
  dealerUpCard?: Card;
  deckCount?: number;
}

export interface BlackjackResult {
  playerTotal: number;
  probability: {
    bust: number;
    win: number;
    push: number;
    lose: number;
  };
  recommendation: string;
  odds: {
    hitting: number;
    standing: number;
    doubling?: number;
    splitting?: number;
  };
  counts: {
    remainingCards: number;
    favorableCards: number;
    unfavorableCards: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}