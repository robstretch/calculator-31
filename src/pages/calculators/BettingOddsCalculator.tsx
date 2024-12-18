import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateOdds } from '../../utils/calculators/odds/calculate';
import { OddsFormat } from '../../utils/calculators/odds/types';
import { formatNumber, formatCurrency } from '../../utils/format';

export function BettingOddsCalculator() {
  const [odds, setOdds] = useState('100');
  const [format, setFormat] = useState<OddsFormat>('american');
  const [stake, setStake] = useState('100');
  const [margin, setMargin] = useState('5');

  const results = calculateOdds(odds, format, parseFloat(stake), parseFloat(margin));

  return (
    <CalculatorLayout
      title="Betting Odds Calculator"
      description="Convert betting odds between formats and calculate potential payouts"
      icon={<Calculator />}
    >
      <SEO
        title="Betting Odds Calculator | Odds Converter & Payout Calculator"
        description="Convert betting odds between American, decimal, and fractional formats. Calculate potential payouts with our free betting odds calculator."
        keywords={[
          'betting odds calculator',
          'odds converter',
          'sports betting calculator',
          'american odds calculator',
          'decimal odds calculator',
          'fractional odds calculator'
        ]}
        canonicalUrl="/betting-odds-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Odds Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Odds Format</label>
            <div className="grid grid-cols-3 gap-2">
              {(['american', 'decimal', 'fractional'] as OddsFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-2 rounded-md ${
                    format === f
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <CalculatorInput
            label="Odds"
            value={odds}
            onChange={setOdds}
            type={format === 'fractional' ? 'text' : 'number'}
            placeholder={`Enter ${format} odds`}
          />

          <CalculatorInput
            label="Stake"
            value={stake}
            onChange={setStake}
            min={0}
            step={1}
            placeholder="Enter stake amount"
          />

          <CalculatorInput
            label="Bookmaker Margin (%)"
            value={margin}
            onChange={setMargin}
            min={0}
            max={100}
            step={0.1}
            placeholder="Enter bookmaker margin"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Conversion Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="space-y-4">
              <div>
                <div className="text-gray-600 mb-1">American Odds:</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {results.american}
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Decimal Odds:</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {formatNumber(results.decimal, 3)}
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Fractional Odds:</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {results.fractional}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Payout Information:</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Potential Win:</span>
                <span className="font-medium">{formatCurrency(results.payout.toWin)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Return:</span>
                <span className="font-medium">{formatCurrency(results.payout.totalReturn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Implied Probability:</span>
                <span className="font-medium">{formatNumber(results.impliedProbability)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Fair Value (No Margin):</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">American:</span>
                <span className="font-medium">{results.fairValue.american}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Decimal:</span>
                <span className="font-medium">{formatNumber(results.fairValue.decimal, 3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fractional:</span>
                <span className="font-medium">{results.fairValue.fractional}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Betting Odds</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">American Odds</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Positive (+150): Profit on $100 stake</li>
                <li>• Negative (-150): Stake needed for $100 profit</li>
                <li>• Common in US markets</li>
                <li>• Based on $100 unit</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Decimal Odds</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Total return per unit wagered</li>
                <li>• Includes original stake</li>
                <li>• Popular in Europe</li>
                <li>• Easy to calculate returns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Fractional Odds</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Profit relative to stake</li>
                <li>• Traditional UK format</li>
                <li>• Written as 5/1 (five-to-one)</li>
                <li>• Historical horse racing format</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Betting Concepts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Implied Probability</h3>
              <p className="text-gray-600">
                The probability of an outcome occurring based on the odds. Used to:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Identify value bets</li>
                <li>• Compare to actual probability</li>
                <li>• Understand bookmaker margin</li>
                <li>• Make informed decisions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Bookmaker Margin</h3>
              <p className="text-gray-600">
                The built-in profit margin in odds that ensures bookmaker profit:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Also called "vigorish" or "juice"</li>
                <li>• Affects true probability</li>
                <li>• Varies by market/sport</li>
                <li>• Higher in less competitive markets</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}