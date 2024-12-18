import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateMedian } from '../../utils/calculators/median';
import { formatNumber } from '../../utils/format';

export function MedianCalculator() {
  const [numbers, setNumbers] = useState<string>('4, 7, 2, 9, 1, 5');

  const values = numbers
    .split(',')
    .map(n => parseFloat(n.trim()))
    .filter(n => !isNaN(n));

  const results = calculateMedian(values);

  return (
    <CalculatorLayout
      title="Median Calculator"
      description="Calculate median, mean, mode, and range for a set of numbers"
      icon={<Calculator />}
    >
      <SEO
        title="Median Calculator | Statistical Analysis Tool"
        description="Calculate median, mean, mode, and other statistical measures for your data set. Free statistical calculator with detailed analysis."
        keywords={[
          'median calculator',
          'mean calculator',
          'mode calculator',
          'statistics calculator',
          'average calculator',
          'data analysis tool'
        ]}
        canonicalUrl="/median-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enter Numbers</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numbers (comma-separated)
            </label>
            <textarea
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter numbers separated by commas"
            />
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Quick Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Enter numbers separated by commas</li>
              <li>• Decimals are supported</li>
              <li>• Spaces are automatically trimmed</li>
              <li>• Invalid entries are ignored</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Statistical Results</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Median</span>
                <span className="text-xl font-semibold text-indigo-600">
                  {formatNumber(results.median)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                The middle value in the sorted dataset
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mean</span>
                <span className="text-xl font-semibold text-indigo-600">
                  {formatNumber(results.mean)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                The average of all values
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mode</span>
                <span className="text-xl font-semibold text-indigo-600">
                  {results.mode.map(formatNumber).join(', ') || 'No mode'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                The most frequent value(s)
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Range</span>
                <span className="text-xl font-semibold text-indigo-600">
                  {formatNumber(results.range)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                The difference between the largest and smallest values
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Sorted Values</span>
              </div>
              <div className="text-sm text-gray-700 break-all">
                {results.sortedValues.map(formatNumber).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Statistical Measures</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Central Tendency</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Median:</strong> The middle value when data is ordered
                </p>
                <p>
                  <strong>Mean:</strong> The average of all values
                </p>
                <p>
                  <strong>Mode:</strong> The most frequently occurring value(s)
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">When to Use Each</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Median: Best for skewed data</li>
                <li>• Mean: Best for normal distributions</li>
                <li>• Mode: Best for categorical data</li>
                <li>• Range: Shows data spread</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Applications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Business</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Salary distributions</li>
                <li>• Sales analysis</li>
                <li>• Market research</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Education</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Test scores</li>
                <li>• Grade distributions</li>
                <li>• Student performance</li>
                <li>• Research analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Science</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Experimental data</li>
                <li>• Population studies</li>
                <li>• Environmental metrics</li>
                <li>• Medical research</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}