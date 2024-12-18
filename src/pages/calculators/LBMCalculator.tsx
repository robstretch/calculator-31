import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateLBM } from '../../utils/calculators/lbm/calculate';
import type { LBMInput } from '../../utils/calculators/lbm/types';

export function LBMCalculator() {
  const [inputs, setInputs] = useState<LBMInput>({
    weight: 70,
    height: 170,
    gender: 'male',
    unit: 'metric',
    method: 'boer'
  });

  const result = calculateLBM(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Lean Body Mass Calculator | LBM & Fat-Free Mass"
        description="Calculate your lean body mass (LBM) and fat-free mass using multiple formulas. Get personalized recommendations for body composition and training."
        keywords={[
          'lean body mass calculator',
          'LBM calculator',
          'fat-free mass',
          'body composition',
          'muscle mass calculator'
        ]}
        canonicalUrl="/lbm-calculator"
      />

      <CalculatorLayout
        title="Lean Body Mass Calculator"
        description="Calculate your lean body mass and body composition metrics using various formulas."
        icon={<Scale />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Weight"
              value={inputs.weight}
              onChange={(value) => setInputs({ ...inputs, weight: parseFloat(value) })}
              min={1}
              placeholder={inputs.unit === 'metric' ? 'kg' : 'lbs'}
            />

            <CalculatorInput
              label="Height"
              value={inputs.height}
              onChange={(value) => setInputs({ ...inputs, height: parseFloat(value) })}
              min={1}
              placeholder={inputs.unit === 'metric' ? 'cm' : 'inches'}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={inputs.gender}
                onChange={(e) => setInputs({ ...inputs, gender: e.target.value as 'male' | 'female' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit System
              </label>
              <select
                value={inputs.unit}
                onChange={(e) => setInputs({ ...inputs, unit: e.target.value as 'metric' | 'imperial' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="metric">Metric (kg/cm)</option>
                <option value="imperial">Imperial (lbs/in)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calculation Method
              </label>
              <select
                value={inputs.method}
                onChange={(e) => setInputs({ ...inputs, method: e.target.value as LBMInput['method'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="boer">Boer Formula</option>
                <option value="james">James Formula</option>
                <option value="hume">Hume Formula</option>
                <option value="bodyFat">Body Fat Percentage</option>
              </select>
            </div>

            {inputs.method === 'bodyFat' && (
              <CalculatorInput
                label="Body Fat %"
                value={inputs.bodyFat || ''}
                onChange={(value) => setInputs({ ...inputs, bodyFat: parseFloat(value) })}
                min={1}
                max={100}
                step={0.1}
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Lean Body Mass"
                value={`${result.leanMass.toFixed(1)} ${inputs.unit === 'metric' ? 'kg' : 'lbs'}`}
                helpText="Total weight minus fat mass"
              />
              
              <CalculatorResult
                label="Fat Mass"
                value={`${result.fatMass.toFixed(1)} ${inputs.unit === 'metric' ? 'kg' : 'lbs'}`}
                helpText="Estimated body fat weight"
              />

              <CalculatorResult
                label="Body Fat Percentage"
                value={`${result.bodyFatPercentage.toFixed(1)}%`}
                helpText={`Ideal range: ${result.idealRange.min}-${result.idealRange.max}%`}
              />

              <CalculatorResult
                label="Fat-Free Mass Index"
                value={result.metrics.ffmi.toFixed(1)}
                helpText={`Category: ${result.metrics.category}`}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculations</h3>
            <div className="space-y-4">
              {result.calculations.map((calc, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="font-medium text-gray-700">{calc.method}</div>
                  <div className="text-sm text-gray-500 font-mono mt-1">{calc.formula}</div>
                  <div className="text-indigo-600 mt-1">
                    Result: {calc.result.toFixed(2)} {inputs.unit === 'metric' ? 'kg' : 'lbs'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{rec.category}</div>
                  <div className="text-gray-600 mt-1">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}