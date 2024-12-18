import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateBattingAverage } from '../../utils/calculators/battingAverage/calculate';

export function BattingAverageCalculator() {
  const [hits, setHits] = useState('0');
  const [atBats, setAtBats] = useState('0');

  const result = calculateBattingAverage({
    hits: parseInt(hits) || 0,
    atBats: parseInt(atBats) || 0
  });

  return (
    <>
      <SEO 
        title="Batting Average Calculator | Baseball Statistics Tool"
        description="Calculate baseball batting average, projected stats, and get performance analysis. Free online tool for baseball statistics."
        keywords={[
          'batting average calculator',
          'baseball stats',
          'baseball calculator',
          'batting statistics',
          'baseball metrics'
        ]}
        canonicalUrl="/batting-average-calculator"
      />
      
      <CalculatorLayout
        title="Batting Average Calculator"
        description="Calculate batting average and analyze baseball hitting statistics"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Hits"
              value={hits}
              onChange={setHits}
              min={0}
              type="number"
            />
            <CalculatorInput
              label="At Bats"
              value={atBats}
              onChange={setAtBats}
              min={0}
              type="number"
            />
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Batting Average"
              value={result.battingAverage.toFixed(3)}
              helpText="Hits divided by at-bats"
            />
            
            <CalculatorResult
              label="Projected Hits (Full Season)"
              value={result.projectedStats.hits}
              helpText="Based on 550 at-bats"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Analysis</h3>
            <div className="space-y-2">
              {result.ranking.map((rank, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{rank.category}</span>
                  <span className={`font-medium ${
                    rank.rating === 'Excellent' || rank.rating === 'Good' 
                      ? 'text-green-600' 
                      : rank.rating === 'Average' 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                  }`}>
                    {rank.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}