export interface OptionPosition {
  type: 'call' | 'put';
  action: 'buy' | 'sell';
  strikePrice: number;
  premium: number;
  contracts: number;
}

export interface OptionsProfitResult {
  maxProfit: number;
  maxLoss: number;
  breakeven: number[];
  profitPoints: {
    price: number;
    profit: number;
  }[];
  riskRewardRatio: number;
  returnOnInvestment: number;
}

function calculateCallProfit(
  stockPrice: number,
  position: OptionPosition
): number {
  const multiplier = position.action === 'buy' ? 1 : -1;
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

function calculatePutProfit(
  stockPrice: number,
  position: OptionPosition
): number {
  const multiplier = position.action === 'buy' ? 1 : -1;
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

export function calculateOptionsProfit(
  currentPrice: number,
  position: OptionPosition
): OptionsProfitResult {
  const priceRange = Array.from(
    { length: 41 },
    (_, i) => currentPrice * (0.8 + (i * 0.01))
  );
  
  const profitPoints = priceRange.map(price => ({
    price,
    profit: position.type === 'call'
      ? calculateCallProfit(price, position)
      : calculatePutProfit(price, position)
  }));

  // Calculate max profit/loss
  const profits = profitPoints.map(p => p.profit);
  const maxProfit = Math.max(...profits);
  const maxLoss = Math.min(...profits);

  // Calculate breakeven points
  const breakeven = profitPoints
    .filter((point, index, array) => {
      if (index === 0) return false;
      return (
        (array[index - 1].profit < 0 && point.profit >= 0) ||
        (array[index - 1].profit >= 0 && point.profit < 0)
      );
    })
    .map(point => point.price);

  // Calculate risk/reward ratio
  const riskRewardRatio = Math.abs(maxProfit / maxLoss);

  // Calculate return on investment
  const investment = position.action === 'buy'
    ? position.premium * position.contracts * 100
    : position.strikePrice * position.contracts * 100;
  const returnOnInvestment = (maxProfit / investment) * 100;

  return {
    maxProfit,
    maxLoss,
    breakeven,
    profitPoints,
    riskRewardRatio,
    returnOnInvestment
  };
}