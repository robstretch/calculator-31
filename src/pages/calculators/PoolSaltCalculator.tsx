import React, { useState } from 'react';
import { Waves } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculatePoolSalt } from '../../utils/calculators/poolSalt';
import { formatNumber, formatCurrency } from '../../utils/format';

export function PoolSaltCalculator() {
  const [gallons, setGallons] = useState('20000');
  const [currentPPM, setCurrentPPM] = useState('0');
  const [targetPPM, setTargetPPM] = useState('3200');

  const results = calculatePoolSalt(
    parseFloat(gallons) || 0,
    parseFloat(currentPPM) || 0,
    parseFloat(targetPPM) || 3200
  );

  return (
    <CalculatorLayout
      title="Pool Salt Calculator"
      description="Calculate pool salt system requirements"
      icon={<Waves />}
    >
      <SEO
        title="Pool Salt Calculator | Salt Water Pool Calculator"
        description="Calculate salt needed for your salt water pool system. Free pool salt calculator with maintenance recommendations."
        keywords={[
          'pool salt calculator',
          'salt water pool calculator',
          'pool maintenance calculator',
          'swimming pool calculator',
          'salt system calculator',
          'pool chemical calculator'
        ]}
        canonicalUrl="/pool-salt-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pool Information</h2>
          
          <CalculatorInput
            label="Pool Volume (gallons)"
            value={gallons}
            onChange={setGallons}
            min={0}
            step={100}
            placeholder="Enter pool volume"
          />
          
          <CalculatorInput
            label="Current Salt Level (ppm)"
            value={currentPPM}
            onChange={setCurrentPPM}
            min={0}
            max={10000}
            step={100}
            placeholder="Enter current salt level"
          />
          
          <CalculatorInput
            label="Target Salt Level (ppm)"
            value={targetPPM}
            onChange={setTargetPPM}
            min={2700}
            max={4500}
            step={100}
            placeholder="Enter target salt level"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Salt Requirements</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.saltNeeded)} lbs
              </div>
              <div className="text-gray-500">Salt Needed</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Current Salt Level"
              value={`${formatNumber(results.currentLevel)} ppm`}
              helpText="Current salt concentration"
            />
            
            <CalculatorResult
              label="Target Salt Level"
              value={`${formatNumber(results.targetLevel)} ppm`}
              helpText="Desired salt concentration"
            />
            
            <CalculatorResult
              label="Annual Maintenance"
              value={`${formatNumber(results.maintenanceAmount)} lbs`}
              helpText="Estimated yearly salt addition needed"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Estimated Costs:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Initial Cost:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.initial)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Maintenance:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.annual)}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Salt Water Pools</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How It Works</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Salt is converted to chlorine</li>
                <li>• Gentler on skin and eyes</li>
                <li>• More stable sanitization</li>
                <li>• Lower maintenance</li>
                <li>• Environmentally friendly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Optimal Levels</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Salt: 2700-4500 ppm</li>
                <li>• pH: 7.2-7.6</li>
                <li>• Alkalinity: 80-120 ppm</li>
                <li>• Stabilizer: 60-80 ppm</li>
                <li>• Free Chlorine: 1-3 ppm</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Regular Tasks</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Test salt levels monthly</li>
                <li>• Check cell condition</li>
                <li>• Monitor water balance</li>
                <li>• Clean salt cell</li>
                <li>• Backwash as needed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Troubleshooting</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Low chlorine output</li>
                <li>• Scale buildup</li>
                <li>• Cell warnings</li>
                <li>• Flow issues</li>
                <li>• Water balance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Seasonal Care</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Spring opening</li>
                <li>• Summer maintenance</li>
                <li>• Fall preparation</li>
                <li>• Winter shutdown</li>
                <li>• Weather adjustments</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}