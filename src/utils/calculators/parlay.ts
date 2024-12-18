export interface Bet {
  odds: number;
  description: string;
}

export interface ParlayResult {
  totalOdds: number;
  potentialPayout: number;
  totalRisk: number;
  individualPayouts: {
    description: string;
    odds: number;
    payout: number;
  }[];
  impliedProbability: number;
}

function convertAmericanToDecimal(americanOdds: number): number {
  if (americanOdds > 0) {
    return (americanOdds / 100) + 1;
  } else {
    return (100 / Math.abs(americanOdds)) + 1;
  }
}

function convertDecimalToAmerican(decimalOdds: number): number {
  if (decimalOdds >= 2) {
    return Math.round((decimalOdds - 1) * 100);
  } else {
    return Math.round(-100 / (decimalOdds - 1));
  }
}

export function calculateParlay(
  bets: Bet[],
  risk: number
): ParlayResult {
  // Convert all odds to decimal and multiply them together
  const decimalOdds = bets.map(bet => convertAmericanToDecimal(bet.odds));
  const totalDecimalOdds = decimalOdds.reduce((acc, curr) => acc * curr, 1);
  
  // Calculate potential payout
  const potentialPayout = risk * totalDecimalOdds;
  
  // Calculate individual payouts if each bet was placed separately
  const individualPayouts = bets.map((bet, index) => ({
    description: bet.description,
    odds: bet.odds,
    payout: risk * decimalOdds[index]
  }));

  // Calculate implied probability
  const impliedProbability = (1 / totalDecimalOdds) * 100;

  return {
    totalOdds: convertDecimalToAmerican(totalDecimalOdds),
    potentialPayout,
    totalRisk: risk,
    individualPayouts,
    impliedProbability
  };
}