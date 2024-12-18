import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateGoldenRatio } from '../../utils/calculators/goldenRatio/calculate';

export function GoldenRatioCalculator() {
  const [value, setValue] = useState('1');
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  const result = calculateGoldenRatio({
    value: parseFloat(value) || 0,
    direction
  });

  return (
    <>
      <SEO 
        title="Golden Ratio Calculator | Divine Proportion Tool"
        description="Calculate golden ratio proportions for art, design, and architecture. Find the perfect balance using the divine proportion (phi ≈ 1.618)."
        keywords={[
          'golden ratio calculator',
          'divine proportion',
          'phi calculator',
          'fibonacci sequence',
          'design proportions'
        ]}
        canonicalUrl="/golden-ratio-calculator"
      />
      
      <CalculatorLayout
        title="Golden Ratio Calculator"
        description="Calculate proportions using the golden ratio (φ ≈ 1.618), also known as the divine proportion"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Value"
              value={value}
              onChange={setValue}
              type="number"
              min={0}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Direction
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDirection('up')}
                  className={`px-4 py-2 rounded-md ${
                    direction === 'up'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Multiply
                </button>
                <button
                  onClick={() => setDirection('down')}
                  className={`px-4 py-2 rounded-md ${
                    direction === 'down'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Divide
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Result"
              value={result.result}
              helpText={`Value ${direction === 'up' ? 'multiplied' : 'divided'} by φ`}
            />
            
            <CalculatorResult
              label="Ratio (φ)"
              value={result.ratio}
              helpText="The golden ratio constant"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sequence</h3>
            <div className="grid grid-cols-5 gap-4">
              {result.sequence.map((num, index) => (
                <div key={index} className="text-center">
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <span className="font-mono">{num}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">n{index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Proportions</h3>
            <div className="space-y-4">
              {result.proportions.map((prop, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium text-gray-700">{prop.dimension}</span>
                  <span className="text-gray-600">
                    {prop.larger.toFixed(2)} : {prop.smaller.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.applications.map((app, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{app.field}</h4>
                  <p className="text-gray-600 text-sm mt-1">{app.example}</p>
                  <p className="text-indigo-600 text-sm mt-2">φ ≈ {app.ratio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}