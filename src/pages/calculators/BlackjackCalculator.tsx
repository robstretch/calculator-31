import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateBlackjack } from '../../utils/calculators/blackjack/calculate';
import type { Card } from '../../utils/calculators/blackjack/types';

export function BlackjackCalculator() {
  const [playerCards, setPlayerCards] = useState<Card[]>([
    { value: 10, isAce: false },
    { value: 8, isAce: false }
  ]);
  const [dealerUpCard, setDealerUpCard] = useState<Card>({ value: 10, isAce: false });
  const [deckCount, setDeckCount] = useState(6);

  const result = calculateBlackjack({
    playerCards,
    dealerUpCard,
    deckCount
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Blackjack Calculator | Optimal Strategy & Odds"
        description="Calculate optimal blackjack strategy, probabilities, and odds. Get recommendations for hitting, standing, doubling down, and splitting pairs."
        keywords={[
          'blackjack calculator',
          'blackjack odds',
          'blackjack strategy',
          'blackjack probability',
          'card counting',
          'casino odds'
        ]}
        canonicalUrl="/blackjack-calculator"
      />

      <CalculatorLayout
        title="Blackjack Calculator"
        description="Calculate optimal blackjack strategy and probabilities based on your hand and the dealer's up card."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Deck Count"
              value={deckCount}
              onChange={(value) => setDeckCount(parseInt(value))}
              min={1}
              max={8}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Player Total"
                value={result.playerTotal}
                helpText="Current hand total"
              />
              
              <CalculatorResult
                label="Recommendation"
                value={result.recommendation}
                helpText="Optimal play based on basic strategy"
              />

              <div className="grid grid-cols-2 gap-4">
                <CalculatorResult
                  label="Win Probability"
                  value={`${(result.probability.win * 100).toFixed(1)}%`}
                  helpText="Chance of winning this hand"
                />
                
                <CalculatorResult
                  label="Bust Probability"
                  value={`${(result.probability.bust * 100).toFixed(1)}%`}
                  helpText="Chance of busting if hitting"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategy Tips</h3>
            <div className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="font-medium text-gray-700">{rec.category}:</div>
                  <div className="text-gray-600">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}