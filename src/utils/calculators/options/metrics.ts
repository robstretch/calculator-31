import { OptionPosition } from './types';

export function calculateRiskRewardRatio(maxProfit: number, maxLoss: number): number {
  return Math.abs(maxProfit / maxLoss);
}

export function calculateReturnOnInvestment(
  maxProfit: number,
  position: OptionPosition
): number {
  const investment = position.action === 'buy'
    ? position.premium * position.contracts * 100
    : position.strikePrice * position.contracts * 100;
  return (maxProfit / investment) * 100;
}

export function findBreakeven(
  profitPoints: { price: number; profit: number; }[]
): number[] {
  return profitPoints
    .filter((point, index, array) => {
      if (index === 0) return false;
      return (
        (array[index - 1].profit < 0 && point.profit >= 0) ||
        (array[index - 1].profit >= 0 && point.profit < 0)
      );
    })
    .map(point => point.price);
}