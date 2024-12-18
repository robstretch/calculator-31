import { BlackjackInput, BlackjackResult, Card } from './types';

function calculateHandTotal(cards: Card[]): number {
  let total = 0;
  let aces = 0;

  // First count non-aces
  cards.forEach(card => {
    if (card.isAce) {
      aces++;
    } else {
      total += card.value;
    }
  });

  // Then add aces optimally
  for (let i = 0; i < aces; i++) {
    if (total + 11 <= 21) {
      total += 11;
    } else {
      total += 1;
    }
  }

  return total;
}

function calculateProbabilities(
  playerTotal: number,
  dealerUpCard?: Card,
  deckCount: number = 6
): { bust: number; win: number; push: number; lose: number } {
  // Simplified probability calculations
  if (playerTotal > 21) {
    return { bust: 1, win: 0, push: 0, lose: 0 };
  }

  if (!dealerUpCard) {
    // Basic probabilities without dealer card
    if (playerTotal >= 19) {
      return { bust: 0, win: 0.7, push: 0.1, lose: 0.2 };
    } else if (playerTotal >= 17) {
      return { bust: 0, win: 0.5, push: 0.1, lose: 0.4 };
    } else if (playerTotal >= 12) {
      return { bust: 0.3, win: 0.3, push: 0.1, lose: 0.3 };
    } else {
      return { bust: 0.1, win: 0.4, push: 0.1, lose: 0.4 };
    }
  }

  // Adjust probabilities based on dealer's up card
  const dealerValue = dealerUpCard.value;
  const dealerBustProb = dealerValue >= 7 ? 0.2 : 0.4;
  
  return {
    bust: playerTotal > 16 ? 0 : 0.3,
    win: dealerValue >= 7 ? 0.4 : 0.5,
    push: 0.1,
    lose: dealerValue >= 7 ? 0.5 : 0.4
  };
}

function getRecommendation(
  playerTotal: number,
  dealerUpCard?: Card,
  canSplit: boolean = false
): string {
  if (playerTotal > 21) return 'Bust';
  if (playerTotal === 21) return 'Stand';
  
  if (!dealerUpCard) {
    if (playerTotal >= 17) return 'Stand';
    if (playerTotal <= 11) return 'Hit';
    return 'Stand on 17 or higher';
  }

  const dealerValue = dealerUpCard.value;
  
  if (playerTotal >= 17) return 'Stand';
  if (playerTotal <= 11) return 'Hit';
  if (playerTotal === 16 && dealerValue >= 7) return 'Hit';
  if (playerTotal === 12 && (dealerValue === 2 || dealerValue === 3)) return 'Hit';
  
  return 'Stand';
}

export function calculateBlackjack(input: BlackjackInput): BlackjackResult {
  const playerTotal = calculateHandTotal(input.playerCards);
  const probability = calculateProbabilities(playerTotal, input.dealerUpCard, input.deckCount);
  const recommendation = getRecommendation(playerTotal, input.dealerUpCard);

  // Calculate odds for different actions
  const odds = {
    hitting: playerTotal < 12 ? 0.8 : 0.4,
    standing: playerTotal > 16 ? 0.7 : 0.3
  };

  if (input.playerCards.length === 2) {
    odds.doubling = playerTotal === 11 ? 0.9 : playerTotal === 10 ? 0.8 : 0.4;
    if (input.playerCards[0].value === input.playerCards[1].value) {
      odds.splitting = input.playerCards[0].value >= 8 ? 0.7 : 0.4;
    }
  }

  const recommendations = [
    {
      category: 'Basic Strategy',
      suggestion: recommendation
    },
    {
      category: 'Risk Level',
      suggestion: playerTotal > 16 ? 
        'Conservative - protect your hand' : 
        'Aggressive - improve your hand'
    },
    {
      category: 'Card Counting',
      suggestion: input.deckCount ? 
        'Consider remaining deck composition' :
        'Watch for high/low card frequency'
    },
    {
      category: 'Betting',
      suggestion: probability.win > 0.5 ?
        'Consider increasing bet size' :
        'Maintain conservative betting'
    }
  ];

  return {
    playerTotal,
    probability,
    recommendation,
    odds,
    counts: {
      remainingCards: (input.deckCount || 6) * 52,
      favorableCards: Math.round(((input.deckCount || 6) * 52) * 0.3),
      unfavorableCards: Math.round(((input.deckCount || 6) * 52) * 0.3)
    },
    recommendations
  };
}