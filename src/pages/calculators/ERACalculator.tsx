import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateERA } from '../../utils/calculators/era';
import { formatNumber } from '../../utils/format';

export function ERACalculator() {
  const [earnedRuns, setEarnedRuns] = useState('12');
  const [inningsPitched, setInningsPitched] = useState('27');
  const [hits, setHits] = useState('24');
  const [walks, setWalks] = useState('9');
  const [strikeouts, setStrikeouts] = useState('18');

  const results = calculateERA(
    parseFloat(earnedRuns) || 0,
    parseFloat(inningsPitched) || 1,
    parseFloat(hits) || 0,
    parseFloat(walks) || 0,
    parseFloat(strikeouts) || 0
  );

  return (
    <CalculatorLayout
      title="ERA Calculator"
      description="Calculate baseball ERA and pitching stats"
      icon={<Target />}
    >
      <SEO
        title="ERA Calculator | Baseball Statistics Calculator"
        description="Calculate Earned Run Average (ERA) and other pitching statistics. Free baseball stats calculator with detailed analysis."
        keywords={[
          'era calculator',
          'baseball calculator',
          'pitching stats calculator',
          'earned run average',
          'whip calculator',
          'baseball statistics'
        ]}
        canonicalUrl="/era-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pitching Statistics</h2>
          
          <CalculatorInput
            label="Earned Runs"
            value={earnedRuns}
            onChange={setEarnedRuns}
            min={0}
            step={1}
            placeholder="Enter earned runs"
          />
          
          <CalculatorInput
            label="Innings Pitched"
            value={inningsPitched}
            onChange={setInningsPitched}
            min={0.1}
            step={0.1}
            placeholder="Enter innings pitched"
          />
          
          <CalculatorInput
            label="Hits Allowed"
            value={hits}
            onChange={setHits}
            min={0}
            step={1}
            placeholder="Enter hits allowed"
          />
          
          <CalculatorInput
            label="Walks"
            value={walks}
            onChange={setWalks}
            min={0}
            step={1}
            placeholder="Enter walks"
          />
          
          <CalculatorInput
            label="Strikeouts"
            value={strikeouts}
            onChange={setStrikeouts}
            min={0}
            step={1}
            placeholder="Enter strikeouts"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pitching Analysis</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.era, 2)}
              </div>
              <div className="text-gray-500">ERA (Earned Run Average)</div>
              <div className="text-sm text-gray-400 mt-1">
                Rating: {results.rating}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="WHIP"
              value={formatNumber(results.whip, 2)}
              helpText="Walks + Hits per Inning Pitched"
            />
            
            <CalculatorResult
              label="K/9"
              value={formatNumber(results.k9, 1)}
              helpText="Strikeouts per 9 innings"
            />
            
            <CalculatorResult
              label="MLB Comparison"
              value={`${results.comparison.difference > 0 ? '+' : ''}${formatNumber(results.comparison.difference, 2)}`}
              helpText={`${results.comparison.percentile}th percentile`}
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Pitching Stats:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">IP</div>
                  <div className="font-medium">{results.stats.inningsPitched}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">ER</div>
                  <div className="font-medium">{results.stats.earnedRuns}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">H</div>
                  <div className="font-medium">{results.stats.hits}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">BB</div>
                  <div className="font-medium">{results.stats.walks}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg col-span-2">
                  <div className="text-sm text-gray-500">K</div>
                  <div className="font-medium">{results.stats.strikeouts}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding ERA</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is ERA?</h3>
              <p className="text-gray-600">
                Earned Run Average (ERA) represents the average number of earned runs a pitcher allows 
                per nine innings pitched. It's calculated by dividing earned runs by innings pitched, 
                then multiplying by nine.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">ERA Ratings</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Elite: Under 2.00</li>
                <li>• Excellent: 2.00-2.99</li>
                <li>• Above Average: 3.00-3.99</li>
                <li>• Average: 4.00-4.99</li>
                <li>• Below Average: 5.00+</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Statistics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">WHIP</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Walks + Hits per IP</li>
                <li>• Measures baserunners</li>
                <li>• Elite: Under 1.00</li>
                <li>• Average: ~1.30</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">K/9</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Strikeouts per 9 IP</li>
                <li>• Shows dominance</li>
                <li>• Elite: 9.0+</li>
                <li>• Average: ~7.5</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Context</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Ballpark factors</li>
                <li>• League averages</li>
                <li>• Run environment</li>
                <li>• Defense impact</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}