export type OddsFormat = 'american' | 'decimal' | 'fractional';

export interface OddsResult {
  american: string;
  decimal: number;
  fractional: string;
  impliedProbability: number;
  payout: {
    stake: number;
    toWin: number;
    totalReturn: number;
  };
  breakeven: number;
  fairValue: {
    american: string;
    decimal: number;
    fractional: string;
  };
}

export interface OddsConversion {
  american: string;
  decimal: number;
  fractional: string;
}