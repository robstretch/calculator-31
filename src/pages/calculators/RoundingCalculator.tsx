import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateRounding } from '../../utils/calculators/rounding/calculate';
import { RoundingMethod } from '../../utils/calculators/rounding/types';
import { formatNumber } from '../../utils/format';

export function RoundingCalculator() {
  const [number, setNumber] = useState('3.14159');
  const [method, setMethod] = useState<RoundingMethod>('nearest');
  const [decimals, setDecimals] = useState('2');
  const [nearestValue, setNearestValue] = useState('5');

  const results = calculateRounding(
    parseFloat(number) || 0,
    method,
    parseInt(decimals) || 0,
    method === 'nearest-multiple' ? parseFloat(nearestValue) || 1 : undefined
  );

  return (
    <CalculatorLayout
      title="Rounding Calculator"
      description="Round numbers using various methods and precision levels"
      icon={<Calculator />}
    >
      <SEO
        title="Rounding Calculator | Number Rounding Tool"
        description="Round numbers using various methods including standard rounding, banker's rounding, and truncation. Free calculator with multiple rounding options."
        keywords={[
          'rounding calculator',
          'number rounding',
          'decimal rounding',
          'bankers rounding',
          'truncate calculator',
          'round to nearest'
        ]}
        canonicalUrl="/rounding-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Number Input</h2>

          <CalculatorInput
            label="Number to Round"
            value={number}
            onChange={setNumber}
            type="text"
            placeholder="Enter a number"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rounding Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as RoundingMethod)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="nearest">Round to Nearest</option>
              <option value="up">Round Up</option>
              <option value="down">Round Down</option>
              <option value="truncate">Truncate</option>
              <option value="bankers">Banker's Rounding</option>
              <option value="nearest-multiple">Nearest Multiple</option>
            </select>
          </div>

          {method !== 'nearest-multiple' ? (
            <CalculatorInput
              label="Decimal Places"
              value={decimals}
              onChange={setDecimals}
              min={0}
              max={10}
              step={1}
              type="number"
            />
          ) : (
            <CalculatorInput
              label="Round to Nearest"
              value={nearestValue}
              onChange={setNearestValue}
              min={0.000001}
              step={1}
              type="number"
              placeholder="Enter value to round to"
            />
          )}

          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use decimal points for fractional numbers</li>
              <li>• Negative numbers are supported</li>
              <li>• Scientific notation (e.g., 1.23e-4) works too</li>
              <li>• Choose the appropriate rounding method for your needs</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.rounded, parseInt(decimals))}
              </div>
              <div className="text-gray-500">Rounded Result</div>
              <div className="text-sm text-gray-400 mt-1">
                Original: {results.original}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Steps:</h3>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              {results.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rounding Methods Explained</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Methods</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Round to Nearest: Standard rounding to closest value</li>
                <li>• Round Up: Always rounds up (ceiling)</li>
                <li>• Round Down: Always rounds down (floor)</li>
                <li>• Truncate: Removes decimal places without rounding</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Methods</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Banker's Rounding: Rounds to nearest even number when tied</li>
                <li>• Nearest Multiple: Rounds to closest multiple of a value</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Applications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Currency calculations</li>
                <li>• Interest rates</li>
                <li>• Tax calculations</li>
                <li>• Financial reporting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Scientific</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Measurement data</li>
                <li>• Statistical analysis</li>
                <li>• Experimental results</li>
                <li>• Engineering calculations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Programming</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Data processing</li>
                <li>• Display formatting</li>
                <li>• Numerical algorithms</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}