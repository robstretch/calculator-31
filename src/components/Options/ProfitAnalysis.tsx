import React from 'react';
import { OptionsProfitResult } from '../../utils/calculators/options';
import { CalculatorResult } from '../Calculator/CalculatorResult';
import { formatCurrency, formatNumber } from '../../utils/format';

interface ProfitAnalysisProps {
  results: OptionsProfitResult;
}

export function ProfitAnalysis({ results }: ProfitAnalysisProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Max Profit</div>
            <div className={`text-xl font-bold ${results.maxProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(results.maxProfit)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Max Loss</div>
            <div className="text-xl font-bold text-red-600">
              {formatCurrency(results.maxLoss)}
            </div>
          </div>
        </div>
      </div>

      <CalculatorResult
        label="Breakeven Points"
        value={results.breakeven.map(price => formatCurrency(price)).join(', ')}
        helpText="Stock price(s) where profit is zero"
      />

      <CalculatorResult
        label="Risk/Reward Ratio"
        value={formatNumber(results.riskRewardRatio)}
        helpText="Ratio of maximum profit to maximum loss"
      />

      <CalculatorResult
        label="Return on Investment"
        value={`${formatNumber(results.returnOnInvestment)}%`}
        helpText="Potential return relative to investment"
      />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Profit at Different Prices:</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {results.profitPoints
            .filter((_, index) => index % 2 === 0)
            .map((point, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  At {formatCurrency(point.price)}:
                </span>
                <span className={point.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(point.profit)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}