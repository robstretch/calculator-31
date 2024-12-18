import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateGearRatio } from '../../utils/calculators/gearRatio/calculate';
import type { GearRatioInput } from '../../utils/calculators/gearRatio/types';

export function GearRatioCalculator() {
  const [inputs, setInputs] = useState<GearRatioInput>({
    drivingTeeth: 20,
    drivenTeeth: 40,
    type: 'reduction',
    rpm: 1750
  });

  const result = calculateGearRatio(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Gear Ratio Calculator | Mechanical Drive Calculator"
        description="Calculate gear ratios, speed reduction, and torque multiplication. Get recommendations for gear selection and efficiency optimization."
        keywords={[
          'gear ratio calculator',
          'mechanical advantage calculator',
          'speed reduction calculator',
          'torque multiplication',
          'gear train calculator'
        ]}
        canonicalUrl="/gear-ratio-calculator"
      />

      <CalculatorLayout
        title="Gear Ratio Calculator"
        description="Calculate gear ratios, speed reduction, and torque multiplication for mechanical drives."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Driving Gear Teeth"
              value={inputs.drivingTeeth}
              onChange={(value) => setInputs({ ...inputs, drivingTeeth: parseFloat(value) })}
              min={1}
            />

            <CalculatorInput
              label="Driven Gear Teeth"
              value={inputs.drivenTeeth}
              onChange={(value) => setInputs({ ...inputs, drivenTeeth: parseFloat(value) })}
              min={1}
            />

            <CalculatorInput
              label="Input Speed (RPM)"
              value={inputs.rpm || ''}
              onChange={(value) => setInputs({ ...inputs, rpm: parseFloat(value) })}
              min={0}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drive Type
              </label>
              <select
                value={inputs.type}
                onChange={(e) => setInputs({ ...inputs, type: e.target.value as 'reduction' | 'overdrive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="reduction">Speed Reduction</option>
                <option value="overdrive">Speed Increase</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Gear Ratio"
                value={`${result.ratio.toFixed(3)}:1`}
                helpText={result.ratio > 1 ? 'Speed reduction' : 'Speed increase'}
              />
              
              {result.outputSpeed && (
                <CalculatorResult
                  label="Output Speed"
                  value={`${Math.round(result.outputSpeed)} RPM`}
                  helpText="Calculated output shaft speed"
                />
              )}

              <CalculatorResult
                label="Torque Multiplier"
                value={result.torqueMultiplier.toFixed(3)}
                helpText="Factor of torque increase/decrease"
              />

              <CalculatorResult
                label="Mechanical Efficiency"
                value={`${(result.efficiency * 100).toFixed(1)}%`}
                helpText="Estimated power transmission efficiency"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis</h3>
            <div className="space-y-4">
              {result.analysis.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-700">{item.type}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <div className="text-lg font-semibold text-indigo-600">
                    {item.value.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Applications</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {result.applications.map((app, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{app.field}</div>
                  <div className="text-sm text-gray-600 mt-1">{app.example}</div>
                  <div className="text-sm text-indigo-600 mt-2">{app.typicalRatio}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-gray-600">{rec.suggestion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}