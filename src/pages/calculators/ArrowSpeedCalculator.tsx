import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateArrowSpeed } from '../../utils/calculators/arrowSpeed';
import { formatNumber } from '../../utils/format';

export function ArrowSpeedCalculator() {
  const [drawWeight, setDrawWeight] = useState('70');
  const [drawLength, setDrawLength] = useState('29');
  const [arrowWeight, setArrowWeight] = useState('350');
  const [bowEfficiency, setBowEfficiency] = useState('75');

  const results = calculateArrowSpeed(
    parseFloat(drawWeight) || 0,
    parseFloat(drawLength) || 0,
    parseFloat(arrowWeight) || 0,
    parseFloat(bowEfficiency) || 75
  );

  return (
    <CalculatorLayout
      title="Arrow Speed Calculator"
      description="Calculate arrow speed and kinetic energy"
      icon={<Target />}
    >
      <SEO
        title="Arrow Speed Calculator | Archery Calculator"
        description="Calculate arrow speed, kinetic energy, and momentum for archery. Free arrow speed calculator with bow efficiency analysis."
        keywords={[
          'arrow speed calculator',
          'archery calculator',
          'bow speed calculator',
          'arrow velocity calculator',
          'kinetic energy calculator',
          'archery performance calculator'
        ]}
        canonicalUrl="/arrow-speed-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bow and Arrow Details</h2>
          
          <CalculatorInput
            label="Draw Weight (lbs)"
            value={drawWeight}
            onChange={setDrawWeight}
            min={0}
            max={200}
            step={1}
            placeholder="Enter draw weight"
          />
          
          <CalculatorInput
            label="Draw Length (inches)"
            value={drawLength}
            onChange={setDrawLength}
            min={0}
            max={36}
            step={0.5}
            placeholder="Enter draw length"
          />
          
          <CalculatorInput
            label="Arrow Weight (grains)"
            value={arrowWeight}
            onChange={setArrowWeight}
            min={0}
            step={1}
            placeholder="Enter arrow weight"
          />
          
          <CalculatorInput
            label="Bow Efficiency (%)"
            value={bowEfficiency}
            onChange={setBowEfficiency}
            min={0}
            max={100}
            step={1}
            placeholder="Enter bow efficiency"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Arrow Performance</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.speed} FPS
              </div>
              <div className="text-gray-500">Arrow Speed</div>
              <div className="text-sm text-gray-400 mt-1">
                {results.speedRating} Speed Rating
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Kinetic Energy"
              value={`${formatNumber(results.kineticEnergy)} ft-lbs`}
              helpText="Energy delivered on impact"
            />
            
            <CalculatorResult
              label="Momentum"
              value={`${formatNumber(results.momentum)} slug-ft/s`}
              helpText="Arrow's penetration potential"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Effective Ranges:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hunting Range:</span>
                  <span className="font-medium">{results.effectiveRange.hunting} yards</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Range:</span>
                  <span className="font-medium">{results.effectiveRange.target} yards</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Recommendations:</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Arrow Speed</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Draw weight affects power transfer</li>
                <li>• Draw length influences power stroke</li>
                <li>• Arrow weight impacts speed and energy</li>
                <li>• Bow efficiency determines energy transfer</li>
                <li>• Arrow spine affects flight stability</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Speed vs. Energy</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Faster isn't always better</li>
                <li>• Consider intended use</li>
                <li>• Balance with accuracy</li>
                <li>• Match to shooting style</li>
                <li>• Account for conditions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Target Archery</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 270-300 FPS typical</li>
                <li>• Lighter arrows</li>
                <li>• Focus on accuracy</li>
                <li>• Consistent spine</li>
                <li>• Wind consideration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Hunting</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 250-330 FPS ideal</li>
                <li>• Heavier arrows</li>
                <li>• Higher KE needed</li>
                <li>• Broadhead tuning</li>
                <li>• Penetration focus</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3D/Field</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 280-320 FPS common</li>
                <li>• Mid-weight arrows</li>
                <li>• Balance speed/accuracy</li>
                <li>• Various distances</li>
                <li>• Equipment rules</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}