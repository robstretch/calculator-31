import React, { useState } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { Calculator } from 'lucide-react';
import { calculatePokerOdds } from '../../utils/calculators/poker/calculate';
import type { Card, PokerResult } from '../../utils/calculators/poker/types';

export function PokerOddsCalculator() {
  const [holeCards, setHoleCards] = useState<Card[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [opponents, setOpponents] = useState('2');
  const [result, setResult] = useState<PokerResult | null>(null);

  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  const handleCalculate = () => {
    if (holeCards.length === 2) {
      setResult(calculatePokerOdds({
        holeCards,
        communityCards,
        opponents: parseInt(opponents)
      }));
    }
  };

  const addCard = (type: 'hole' | 'community', rank: string, suit: string) => {
    const card = { rank, suit };
    if (type === 'hole' && holeCards.length < 2) {
      setHoleCards([...holeCards, card]);
    } else if (type === 'community' && communityCards.length < 5) {
      setCommunityCards([...communityCards, card]);
    }
  };

  return (
    <>
      <SEO
        title="Poker Odds Calculator | Texas Hold'em Probability"
        description="Calculate poker hand odds, outs, and probabilities for Texas Hold'em. Get real-time odds calculations and strategic recommendations."
        keywords={[
          'poker calculator',
          'poker odds',
          'texas holdem calculator',
          'poker probability',
          'poker outs'
        ]}
        canonicalUrl="/poker-odds-calculator"
      />

      <CalculatorLayout
        title="Poker Odds Calculator"
        description="Calculate poker hand odds and get strategic recommendations for Texas Hold'em."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Hole Cards</h3>
            <div className="grid grid-cols-4 gap-2">
              {ranks.map(rank => (
                <button
                  key={rank}
                  onClick={() => addCard('hole', rank, 'hearts')}
                  disabled={holeCards.length >= 2}
                  className="px-3 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  {rank}
                </button>
              ))}
            </div>
            <div className="mt-4">
              Selected: {holeCards.map(card => `${card.rank}${card.suit[0]}`).join(', ')}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Community Cards</h3>
            <div className="grid grid-cols-4 gap-2">
              {ranks.map(rank => (
                <button
                  key={rank}
                  onClick={() => addCard('community', rank, 'hearts')}
                  disabled={communityCards.length >= 5}
                  className="px-3 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  {rank}
                </button>
              ))}
            </div>
            <div className="mt-4">
              Selected: {communityCards.map(card => `${card.rank}${card.suit[0]}`).join(', ')}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Opponents</h3>
            <input
              type="number"
              value={opponents}
              onChange={(e) => setOpponents(e.target.value)}
              min="1"
              max="9"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            onClick={handleCalculate}
            disabled={holeCards.length !== 2}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            Calculate Odds
          </button>

          {result && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Probabilities</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Win</p>
                    <p className="font-medium">{(result.winProbability * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tie</p>
                    <p className="font-medium">{(result.tieProbability * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lose</p>
                    <p className="font-medium">{(result.loseProbability * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Hand Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Hand</p>
                    <p className="font-medium">{result.handStrength.current}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Outs</p>
                    <p className="font-medium">{result.outs.count} cards</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pot Odds</p>
                    <p className="font-medium">{result.potOdds.ratio}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <div key={index}>
                      <p className="font-medium">{rec.category}</p>
                      <p className="text-gray-600">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Understanding Poker Odds</h2>
          
          <div className="text-gray-600 space-y-4">
            <p>
              The poker odds calculator helps you make informed decisions during Texas Hold'em games by calculating probabilities, analyzing hand strength, and providing strategic recommendations based on your current situation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">How to Use the Calculator</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select your two hole cards</li>
              <li>Add any community cards (flop, turn, river)</li>
              <li>Enter the number of opponents</li>
              <li>Click "Calculate Odds" to see results</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Understanding Results</h3>
            <div className="space-y-4">
              <p>The calculator provides:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Win/tie/lose probabilities</li>
                <li>Current hand strength and potential hands</li>
                <li>Number of outs and their probability</li>
                <li>Pot odds and implied odds analysis</li>
                <li>Strategic recommendations</li>
              </ul>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg mt-6">
              <h3 className="text-xl font-semibold text-indigo-900">Key Terms</h3>
              <dl className="mt-4 space-y-4 text-indigo-800">
                <div>
                  <dt className="font-semibold">Outs</dt>
                  <dd>Cards that can improve your hand</dd>
                </div>
                <div>
                  <dt className="font-semibold">Pot Odds</dt>
                  <dd>The ratio of the current pot size to the cost of a call</dd>
                </div>
                <div>
                  <dt className="font-semibold">Implied Odds</dt>
                  <dd>Potential future bets you may win if you hit your hand</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}