import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateTattooCost } from '../../utils/calculators/tattoo/calculate';
import { TattooInput } from '../../utils/calculators/tattoo/types';
import { formatCurrency } from '../../utils/format';

export function TattooCalculator() {
  const [size, setSize] = useState('4');
  const [complexity, setComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate');
  const [colors, setColors] = useState('1');
  const [placement, setPlacement] = useState<'easy' | 'moderate' | 'difficult'>('moderate');
  const [artistExperience, setArtistExperience] = useState<'apprentice' | 'experienced' | 'master'>('experienced');

  const result = calculateTattooCost({
    size: parseFloat(size),
    complexity,
    colors: parseInt(colors),
    placement,
    artistExperience
  });

  return (
    <>
      <SEO 
        title="Tattoo Cost Calculator | Estimate Tattoo Prices"
        description="Calculate estimated tattoo costs based on size, complexity, colors, placement, and artist experience. Get accurate price ranges and time estimates."
        keywords={[
          'tattoo calculator',
          'tattoo cost',
          'tattoo price estimate',
          'tattoo size calculator',
          'tattoo pricing guide'
        ]}
      />

      <CalculatorLayout
        title="Tattoo Cost Calculator"
        description="Estimate tattoo costs and time requirements based on multiple factors"
        icon={<Calculator />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <CalculatorInput
              label="Size (square inches)"
              value={size}
              onChange={setSize}
              min={1}
              max={1000}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complexity
              </label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="simple">Simple (linework, minimal shading)</option>
                <option value="moderate">Moderate (detailed shading, basic color)</option>
                <option value="complex">Complex (photorealistic, intricate design)</option>
              </select>
            </div>

            <CalculatorInput
              label="Number of Colors"
              value={colors}
              onChange={setColors}
              min={1}
              max={20}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placement
              </label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="easy">Easy (outer arm, leg, back)</option>
                <option value="moderate">Moderate (inner arm, ankle, chest)</option>
                <option value="difficult">Difficult (ribs, hands, head)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artist Experience
              </label>
              <select
                value={artistExperience}
                onChange={(e) => setArtistExperience(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="apprentice">Apprentice (1-2 years)</option>
                <option value="experienced">Experienced (3-9 years)</option>
                <option value="master">Master (10+ years)</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Cost</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-500">Low</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(result.estimatedCost.low)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Average</div>
                  <div className="text-lg font-semibold text-indigo-600">
                    {formatCurrency(result.estimatedCost.average)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">High</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(result.estimatedCost.high)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Estimate</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours:</span>
                  <span className="font-semibold">{result.timeEstimate.hours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions:</span>
                  <span className="font-semibold">{result.timeEstimate.sessions}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Factors</h3>
              <div className="space-y-3">
                {result.priceFactors.map((factor, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{factor.factor}:</span>
                    <span className="font-semibold">{factor.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aftercare Guide</h3>
            <div className="space-y-4">
              {result.aftercare.map((phase, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{phase.phase}</h4>
                  <p className="text-sm text-gray-500 mb-2">{phase.duration}</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {phase.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}