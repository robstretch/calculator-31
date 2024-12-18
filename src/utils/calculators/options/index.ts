import { OptionPosition, OptionsProfitResult } from './types';
import { calculateCallProfit, calculatePutProfit } from './profitCalculations';
import { generatePriceRange } from './priceRange';
import { 
  calculateRiskRewardRatio, 
  calculateReturnOnInvestment,
  findBreakeven 
} from './metrics';

export function calculateOptionsProfit(
  currentPrice: number,
  position: OptionPosition
): OptionsProfitResult {
  const priceRange = generatePriceRange(currentPrice);
  
  const profitPoints = priceRange.map(price => ({
    price,
    profit: position.type === 'call'
      ? calculateCallProfit(price, position)
      : calculatePutProfit(price, position)
  }));

  const profits = profitPoints.map(p => p.profit);
  const maxProfit = Math.max(...profits);
  const maxLoss = Math.min(...profits);
  const breakeven = findBreakeven(profitPoints);
  const riskRewardRatio = calculateRiskRewardRatio(maxProfit, maxLoss);
  const returnOnInvestment = calculateReturnOnInvestment(maxProfit, position);

  return {
    maxProfit,
    maxLoss,
    breakeven,
    profitPoints,
    riskRewardRatio,
    returnOnInvestment
  };
}

export * from './types';