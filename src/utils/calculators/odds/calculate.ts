import { OddsResult } from './types';
import { convertOdds } from './conversion';

export function calculateOdds(
  odds: string | number,
  format: 'american' | 'decimal' | 'fractional',
  stake: number = 100,
  margin: number = 0
): OddsResult {
  // Convert odds to all formats
  const converted = convertOdds(odds, format);
  
  // Calculate implied probability
  const impliedProbability = (1 / converted.decimal) * 100;
  
  // Calculate payout
  const toWin = stake * (converted.decimal - 1);
  const totalReturn = stake * converted.decimal;
  
  // Calculate breakeven percentage
  const breakeven = (1 / converted.decimal) * 100;
  
  // Calculate fair value (removing margin)
  const fairDecimal = converted.decimal * (1 - margin / 100);
  const fairValue = convertOdds(fairDecimal, 'decimal');

  return {
    ...converted,
    impliedProbability,
    payout: {
      stake,
      toWin,
      totalReturn
    },
    breakeven,
    fairValue
  };
}