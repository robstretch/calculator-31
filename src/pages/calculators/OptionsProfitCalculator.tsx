import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { OptionTypeSelector } from '../../components/Options/OptionTypeSelector';
import { OptionActionSelector } from '../../components/Options/OptionActionSelector';
import { ProfitAnalysis } from '../../components/Options/ProfitAnalysis';
import { calculateOptionsProfit, OptionPosition } from '../../utils/calculators/options';

export function OptionsProfitCalculator() {
  const [currentPrice, setCurrentPrice] = useState('100');
  const [position, setPosition] = useState<OptionPosition>({
    type: 'call',
    action: 'buy',
    strikePrice: 100,
    premium: 3.50,
    contracts: 1
  });

  const results = calculateOptionsProfit(parseFloat(currentPrice) || 0, position);

  return (
    <CalculatorLayout
      title="Options Profit Calculator"
      description="Calculate potential profits and losses for options trades"
      icon={<TrendingUp />}
    >
      <SEO
        title="Options Profit Calculator | Options Trading Calculator"
        description="Calculate potential profits and losses for options trades. Analyze risk/reward ratios and breakeven points with our free options calculator."
        keywords={[
          'options profit calculator',
          'options trading calculator',
          'options roi calculator',
          'call option calculator',
          'put option calculator',
          'options strategy calculator'
        ]}
        canonicalUrl="/options-profit-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Options Trade Details</h2>

          <CalculatorInput
            label="Current Stock Price"
            value={currentPrice}
            onChange={setCurrentPrice}
            min={0}
            step={0.01}
            placeholder="Enter current stock price"
          />

          <OptionTypeSelector position={position} onChange={setPosition} />
          <OptionActionSelector position={position} onChange={setPosition} />

          <CalculatorInput
            label="Strike Price"
            value={position.strikePrice.toString()}
            onChange={(value) => setPosition({ ...position, strikePrice: parseFloat(value) || 0 })}
            min={0}
            step={0.01}
            placeholder="Enter strike price"
          />

          <CalculatorInput
            label="Premium (per share)"
            value={position.premium.toString()}
            onChange={(value) => setPosition({ ...position, premium: parseFloat(value) || 0 })}
            min={0}
            step={0.01}
            placeholder="Enter premium per share"
          />

          <CalculatorInput
            label="Number of Contracts"
            value={position.contracts.toString()}
            onChange={(value) => setPosition({ ...position, contracts: parseInt(value) || 0 })}
            min={1}
            step={1}
            placeholder="Enter number of contracts"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Profit Analysis</h2>
          <ProfitAnalysis results={results} />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Call Options</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Right to buy at strike price</li>
                <li>• Profit from price increases</li>
                <li>• Limited risk when buying</li>
                <li>• Unlimited profit potential</li>
                <li>• Time decay works against buyers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Put Options</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Right to sell at strike price</li>
                <li>• Profit from price decreases</li>
                <li>• Limited risk when buying</li>
                <li>• Limited profit potential</li>
                <li>• Used for hedging</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Options Trading Concepts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Premium</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Cost per share</li>
                <li>• Affected by volatility</li>
                <li>• Time value component</li>
                <li>• Intrinsic value</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Greeks</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Delta: Price sensitivity</li>
                <li>• Theta: Time decay</li>
                <li>• Gamma: Delta change</li>
                <li>• Vega: Volatility impact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Risk Management</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Position sizing</li>
                <li>• Stop-loss orders</li>
                <li>• Diversification</li>
                <li>• Regular monitoring</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}