import React, { useState } from 'react';
import { Percent } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculatePercentage } from '../../utils/calculators/percentage';
import { formatNumber } from '../../utils/format';

export function PercentageCalculator() {
  const [value1, setValue1] = useState('100');
  const [value2, setValue2] = useState('25');
  const [calculationType, setCalculationType] = useState<'percentage-of' | 'percentage-change' | 'is-what-percent'>('percentage-of');

  const results = calculatePercentage(
    parseFloat(value1) || 0,
    parseFloat(value2) || 0,
    calculationType
  );

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, percentage changes, and proportions"
      icon={<Percent />}
    >
      <SEO
        title="Percentage Calculator | Calculate Percentages & Changes"
        description="Free online percentage calculator. Calculate percentages, find percentage changes, and determine what percent one number is of another."
        keywords={[
          'percentage calculator',
          'percent calculator',
          'percentage change',
          'percent increase',
          'percent decrease',
          'proportion calculator'
        ]}
        canonicalUrl="/percentage-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calculate Percentages</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => setCalculationType('percentage-of')}
                className={`px-4 py-2 rounded-md ${
                  calculationType === 'percentage-of'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                What is % of X?
              </button>
              <button
                onClick={() => setCalculationType('percentage-change')}
                className={`px-4 py-2 rounded-md ${
                  calculationType === 'percentage-change'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                % Change
              </button>
              <button
                onClick={() => setCalculationType('is-what-percent')}
                className={`px-4 py-2 rounded-md ${
                  calculationType === 'is-what-percent'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                X is what % of Y?
              </button>
            </div>
          </div>

          <CalculatorInput
            label={
              calculationType === 'percentage-of' ? 'Value' :
              calculationType === 'percentage-change' ? 'Original Value' :
              'First Value'
            }
            value={value1}
            onChange={setValue1}
            type="number"
            step="any"
            placeholder="Enter value"
          />

          <CalculatorInput
            label={
              calculationType === 'percentage-of' ? 'Percentage' :
              calculationType === 'percentage-change' ? 'New Value' :
              'Second Value'
            }
            value={value2}
            onChange={setValue2}
            type="number"
            step="any"
            placeholder="Enter value"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.result)}
                {calculationType !== 'percentage-of' && '%'}
              </div>
              <div className="text-gray-500">Result</div>
              <div className="text-sm text-gray-400 mt-1">
                Formula: {results.formula}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Calculation Steps:</h3>
            <ol className="space-y-2">
              {results.steps.map((step, index) => (
                <li key={index} className="text-gray-600">
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Related Calculations:</h3>
            <div className="space-y-3">
              {results.relatedCalculations.map((calc, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{calc.description}:</span>
                  <span className="font-medium">
                    {formatNumber(calc.value)}
                    {calculationType !== 'percentage-of' && '%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Percentages</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Concepts</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Percentage means "per hundred"</li>
                <li>• 100% equals the whole amount</li>
                <li>• 50% is half of the amount</li>
                <li>• Can be greater than 100%</li>
                <li>• Used to compare quantities</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Applications</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Discounts and sales</li>
                <li>• Interest rates</li>
                <li>• Growth rates</li>
                <li>• Statistics</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Types</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Finding Percentage Of</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Example: 25% of 100</li>
                <li>• Convert % to decimal</li>
                <li>• Multiply by value</li>
                <li>• Common in discounts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Percentage Change</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Increase or decrease</li>
                <li>• Compare two values</li>
                <li>• Used for growth rates</li>
                <li>• Can be negative</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Finding What Percent</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Compare two numbers</li>
                <li>• Divide and multiply by 100</li>
                <li>• Used in proportions</li>
                <li>• Shows relationships</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}