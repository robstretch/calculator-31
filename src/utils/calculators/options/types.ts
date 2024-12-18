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