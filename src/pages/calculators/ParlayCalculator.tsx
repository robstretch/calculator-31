import React, { useState } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateParlay, Bet } from '../../utils/calculators/parlay';
import { formatCurrency, formatNumber } from '../../utils/format';

export function ParlayCalculator() {
  const [bets, setBets] = useState<Bet[]>([
    { odds: -110, description: 'Bet 1' },
    { odds: -110, description: 'Bet 2' }
  ]);
  const [risk, setRisk] = useState('100');

  const addBet = () => {
    setBets([...bets, { odds: -110, description: `Bet ${bets.length + 1}` }]);
  };

  const removeBet = (index: number) => {
    setBets(bets.filter((_, i) => i !== index));
  };

  const updateBet = (index: number, field: keyof Bet, value: string) => {
    const newBets = [...bets];
    if (field === 'odds') {
      newBets[index][field] = parseInt(value) || 0;
    } else {
      newBets[index][field] = value;
    }
    setBets(newBets);
  };

  const results = calculateParlay(bets, parseFloat(risk) || 0);

  return (
    <CalculatorLayout
      title="Parlay Calculator"
      description="Calculate parlay odds and potential payouts"
      icon={<Target />}
    >
      <SEO
        title="Parlay Calculator | Sports Betting Calculator"
        description="Calculate parlay odds, potential payouts, and implied probabilities. Free parlay calculator for sports betting analysis."
        keywords={[
          'parlay calculator',
          'sports betting calculator',
          'parlay odds calculator',
          'parlay payout calculator',
          'betting odds calculator',
          'accumulator calculator'
        ]}
        canonicalUrl="/parlay-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Parlay Details</h2>
            <button
              onClick={addBet}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Leg
            </button>
          </div>

          <CalculatorInput
            label="Risk Amount"
            value={risk}
            onChange={setRisk}
            min={0}
            step={1}
            placeholder="Enter risk amount"
          />

          <div className="mt-6 space-y-4">
            {bets.map((bet, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Leg {index + 1}</h3>
                  {bets.length > 2 && (
                    <button
                      onClick={() => removeBet(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CalculatorInput
                    label="American Odds"
                    value={bet.odds.toString()}
                    onChange={(value) => updateBet(index, 'odds', value)}
                    placeholder="Enter odds (e.g., -110)"
                  />
                  <CalculatorInput
                    label="Description"
                    value={bet.description}
                    onChange={(value) => updateBet(index, 'description', value)}
                    type="text"
                    placeholder="Enter bet description"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Understanding Odds:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Negative odds (e.g., -110): Amount needed to win $100</li>
              <li>• Positive odds (e.g., +150): Amount won on $100 bet</li>
              <li>• All legs must win for parlay to pay</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Parlay Summary</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.potentialPayout)}
              </div>
              <div className="text-gray-500">Potential Payout</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Total Parlay Odds"
              value={results.totalOdds > 0 ? `+${results.totalOdds}` : results.totalOdds.toString()}
              helpText="Combined odds for all selections"
            />

            <CalculatorResult
              label="Implied Probability"
              value={`${formatNumber(results.impliedProbability)}%`}
              helpText="Probability of all selections winning"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Individual Bet Comparison:</h3>
              <div className="space-y-3">
                {results.individualPayouts.map((payout, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{payout.description}:</span>
                    <span className="font-medium">{formatCurrency(payout.payout)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Parlays</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is a Parlay?</h3>
              <p className="text-gray-600">
                A parlay is a single bet that links together multiple individual wagers. To win a parlay:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• All selections must win</li>
                <li>• Higher risk, higher reward</li>
                <li>• Combines odds multiplicatively</li>
                <li>• One loss voids entire bet</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Advantages & Disadvantages</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-800">Advantages:</p>
                  <ul className="text-gray-600">
                    <li>• Higher potential payouts</li>
                    <li>• Lower initial risk</li>
                    <li>• Exciting multi-game action</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Disadvantages:</p>
                  <ul className="text-gray-600">
                    <li>• Higher variance</li>
                    <li>• More difficult to win</li>
                    <li>• No partial wins</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Parlay Betting Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Research</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Study each selection</li>
                <li>• Check injury reports</li>
                <li>• Compare odds across books</li>
                <li>• Consider correlations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Risk Management</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Limit number of legs</li>
                <li>• Keep stakes reasonable</li>
                <li>• Avoid massive underdogs</li>
                <li>• Consider round robins</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Strategy</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Focus on value bets</li>
                <li>• Avoid forcing picks</li>
                <li>• Track your results</li>
                <li>• Stay disciplined</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}