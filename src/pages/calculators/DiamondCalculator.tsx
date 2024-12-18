import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateDiamond } from '../../utils/calculators/diamond/calculate';

export function DiamondCalculator() {
  const [input, setInput] = useState({
    carat: 1.0,
    cut: 'Excellent' as const,
    color: 'G' as const,
    clarity: 'VS1' as const,
    shape: 'Round' as const
  });

  const result = calculateDiamond(input);

  return (
    <>
      <SEO 
        title="Diamond Calculator | Estimate Diamond Value and Quality"
        description="Calculate diamond value based on the 4 Cs (cut, color, clarity, carat) and shape. Get detailed specifications and recommendations."
        keywords={[
          'diamond calculator',
          'diamond value',
          'diamond price',
          '4 Cs calculator',
          'diamond quality'
        ]}
      />

      <CalculatorLayout
        title="Diamond Calculator"
        description="Calculate diamond value and specifications based on the 4 Cs"
        icon={<Calculator />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <CalculatorInput
              label="Carat Weight"
              value={input.carat}
              onChange={(value) => setInput(prev => ({ ...prev, carat: parseFloat(value) || 0 }))}
              min={0.1}
              max={30}
              step={0.01}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Cut Grade</label>
              <select
                value={input.cut}
                onChange={(e) => setInput(prev => ({ ...prev, cut: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {['Ideal', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Color Grade</label>
              <select
                value={input.color}
                onChange={(e) => setInput(prev => ({ ...prev, color: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Clarity Grade</label>
              <select
                value={input.clarity}
                onChange={(e) => setInput(prev => ({ ...prev, clarity: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Shape</label>
              <select
                value={input.shape}
                onChange={(e) => setInput(prev => ({ ...prev, shape: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {['Round', 'Princess', 'Cushion', 'Oval', 'Emerald', 'Pear', 'Marquise', 'Radiant'].map(shape => (
                  <option key={shape} value={shape}>{shape}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Value</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Price:</span>
                  <span className="font-medium">{result.estimatedPrice.average.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-medium">
                    {result.estimatedPrice.low.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} - 
                    {result.estimatedPrice.high.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quality Score:</span>
                  <span className="font-medium">{result.qualityScore}/100</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Characteristics</h3>
              <div className="space-y-3">
                {result.characteristics.map((char, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{char.factor}:</span>
                    <span className="font-medium">{char.rating}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900">{rec.category}</h4>
                    <p className="text-sm text-gray-600">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}