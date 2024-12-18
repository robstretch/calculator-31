import { OptionPosition } from './types';

export function calculateCallProfit(
  stockPrice: number,
  position: OptionPosition
): number {
  const contractMultiplier = position.contracts * 100;
  
  if (position.action === 'buy') {
    return Math.max(
      -position.premium * contractMultiplier,
      ((stockPrice - position.strikePrice) * contractMultiplier) - (position.premium * contractMultiplier)
    );
  } else {
    return Math.min(
      position.premium * contractMultiplier,
      (position.premium * contractMultiplier) - ((stockPrice - position.strikePrice) * contractMultiplier)
    );
  }
}

export function calculatePutProfit(
  stockPrice: number,
  position: OptionPosition
): number {
  const contractMultiplier = position.contracts * 100;
  
  if (position.action === 'buy') {
    return Math.max(
      -position.premium * contractMultiplier,
      ((position.strikePrice - stockPrice) * contractMultiplier) - (position.premium * contractMultiplier)
    );
  } else {
    return Math.min(
      position.premium * contractMultiplier,
      (position.premium * contractMultiplier) - ((position.strikePrice - stockPrice) * contractMultiplier)
    );
  }
}