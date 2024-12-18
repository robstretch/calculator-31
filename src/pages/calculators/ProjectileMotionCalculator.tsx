import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateProjectileMotion } from '../../utils/calculators/projectileMotion/calculate';

export function ProjectileMotionCalculator() {
  const [velocity, setVelocity] = useState('10');
  const [angle, setAngle] = useState('45');
  const [height, setHeight] = useState('0');
  const [useAirResistance, setUseAirResistance] = useState(false);

  const result = calculateProjectileMotion({
    initialVelocity: parseFloat(velocity),
    angle: parseFloat(angle),
    height: parseFloat(height),
    airResistance: useAirResistance
  });

  return (
    <>
      <SEO
        title="Projectile Motion Calculator | Physics Motion Calculator"
        description="Calculate projectile motion parameters including maximum height, range, and time of flight. Analyze trajectories with optional air resistance."
        keywords={[
          'projectile motion calculator',
          'physics calculator',
          'trajectory calculator',
          'ballistic motion',
          'parabolic motion'
        ]}
        canonicalUrl="/projectile-motion-calculator"
      />

      <CalculatorLayout
        title="Projectile Motion Calculator"
        description="Calculate and analyze projectile motion trajectories"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <CalculatorInput
              label="Initial Velocity (m/s)"
              value={velocity}
              onChange={setVelocity}
              type="number"
              min="0"
              step="0.1"
            />
            <CalculatorInput
              label="Launch Angle (degrees)"
              value={angle}
              onChange={setAngle}
              type="number"
              min="0"
              max="90"
              step="1"
            />
            <CalculatorInput
              label="Initial Height (m)"
              value={height}
              onChange={setHeight}
              type="number"
              min="0"
              step="0.1"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="airResistance"
                checked={useAirResistance}
                onChange={(e) => setUseAirResistance(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="airResistance" className="text-sm text-gray-700">
                Include air resistance
              </label>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Maximum Height</div>
                <div className="text-xl font-semibold text-indigo-600">
                  {result.maxHeight.toFixed(2)} m
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Range</div>
                <div className="text-xl font-semibold text-indigo-600">
                  {result.range.toFixed(2)} m
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Time of Flight</div>
                <div className="text-xl font-semibold text-indigo-600">
                  {result.timeOfFlight.toFixed(2)} s
                </div>
              </div>
            </div>

            {/* Velocity Components */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Initial Velocity Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Horizontal (v₀x)</div>
                  <div className="text-lg font-medium text-gray-900">
                    {result.components.horizontal.toFixed(2)} m/s
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Vertical (v₀y)</div>
                  <div className="text-lg font-medium text-gray-900">
                    {result.components.vertical.toFixed(2)} m/s
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Calculation Steps</h3>
              <div className="space-y-2">
                {result.calculations.map((calc, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">{calc.step}</div>
                    <code className="text-sm font-mono block mt-1">{calc.formula}</code>
                    <div className="text-gray-600 text-sm mt-1">
                      Result: {calc.result.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">{rec.category}</div>
                    <div className="text-gray-600 text-sm">{rec.suggestion}</div>
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