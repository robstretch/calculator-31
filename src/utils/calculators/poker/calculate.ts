import { Card, PokerInput, PokerResult } from './types';

const HAND_RANKINGS = {
  'Royal Flush': 10,
  'Straight Flush': 9,
  'Four of a Kind': 8,
  'Full House': 7,
  'Flush': 6,
  'Straight': 5,
  'Three of a Kind': 4,
  'Two Pair': 3,
  'One Pair': 2,
  'High Card': 1
};

function calculateWinProbability(input: PokerInput): number {
  // Simplified probability calculation
  const remainingCards = 52 - input.holeCards.length - input.communityCards.length;
  const outs = calculateOuts(input.holeCards, input.communityCards);
  return (outs.count / remainingCards) * (1 / input.opponents);
}

function calculateOuts(holeCards: Card[], communityCards: Card[]): {
  count: number;
  cards: Card[];
} {
  // Simplified outs calculation
  const outs: Card[] = [];
  const usedRanks = new Set([...holeCards, ...communityCards].map(c => c.rank));
  
  // Add potential outs for pairs
  holeCards.forEach(card => {
    if (!usedRanks.has(card.rank)) {
      ['hearts', 'diamonds', 'clubs', 'spades'].forEach(suit => {
        if (suit !== card.suit) {
          outs.push({ rank: card.rank, suit });
        }
      });
    }
  });

  return {
    count: outs.length,
    cards: outs
  };
}

function evaluateHandStrength(cards: Card[]): string {
  // Simplified hand evaluation
  if (cards.length < 2) return 'High Card';
  
  const ranks = cards.map(c => c.rank);
  const suits = cards.map(c => c.suit);
  
  if (new Set(ranks).size === 1) return 'Pair';
  if (new Set(suits).size === 1) return 'Flush Draw';
  
  return 'High Card';
}

export function calculatePokerOdds(input: PokerInput): PokerResult {
  const winProbability = calculateWinProbability(input);
  const tieProbability = winProbability * 0.1; // Simplified tie calculation
  const loseProbability = 1 - winProbability - tieProbability;

  const outs = calculateOuts(input.holeCards, input.communityCards);
  const currentHand = evaluateHandStrength([...input.holeCards, ...input.communityCards]);

  const potOdds = {
    required: (outs.count / (52 - input.holeCards.length - input.communityCards.length)) * 100,
    implied: winProbability * 100,
    ratio: `${Math.round(winProbability * 100)}:${Math.round((1 - winProbability) * 100)}`
  };

  const recommendations = [
    {
      category: 'Action',
      suggestion: winProbability > 0.5 ?
        'Consider raising' :
        winProbability > 0.3 ?
        'Consider calling' :
        'Consider folding'
    },
    {
      category: 'Position',
      suggestion: input.opponents <= 2 ?
        'Heads-up play allows for more aggressive strategy' :
        'Multiple opponents - play more selectively'
    },
    {
      category: 'Pot Odds',
      suggestion: potOdds.implied > potOdds.required ?
        'Positive expected value - call or raise justified' :
        'Negative expected value - fold unless bluffing'
    },
    {
      category: 'Drawing',
      suggestion: outs.count > 12 ?
        'Strong drawing hand - consider semi-bluff' :
        'Weak drawing hand - proceed with caution'
    }
  ];

  return {
    winProbability,
    tieProbability,
    loseProbability,
    handStrength: {
      current: currentHand,
      potential: ['Pair', 'Two Pair', 'Three of a Kind'],
      rank: HAND_RANKINGS[currentHand as keyof typeof HAND_RANKINGS] || 1
    },
    outs: {
      count: outs.count,
      cards: outs.cards,
      probability: outs.count / (52 - input.holeCards.length - input.communityCards.length)
    },
    recommendations,
    potOdds
  };
}