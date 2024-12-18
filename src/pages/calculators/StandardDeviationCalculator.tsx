import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateStandardDeviation } from '../../utils/calculators/standardDeviation/calculate';
import { formatNumber } from '../../utils/format';

export function StandardDeviationCalculator() {
  const [numbers, setNumbers] = useState<string>('1, 2, 3, 4, 5');
  const [isSample, setIsSample] = useState(true);

  const values = numbers
    .split(',')
    .map(n => parseFloat(n.trim()))
    .filter(n => !isNaN(n));

  const results = values.length > 0 ? calculateStandardDeviation(values, isSample) : null;

  return (
    <CalculatorLayout
      title="Standard Deviation Calculator"
      description="Calculate standard deviation and statistics"
      icon={<Calculator />}
    >
      <SEO
        title="Standard Deviation Calculator | Statistical Analysis Tool"
        description="Calculate standard deviation, variance, and other statistical measures. Free statistics calculator with comprehensive analysis."
        keywords={[
          'standard deviation calculator',
          'statistics calculator',
          'variance calculator',
          'statistical analysis',
          'descriptive statistics',
          'data analysis tool'
        ]}
        canonicalUrl="/standard-deviation-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Data Input</h2>
          
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

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isSample}
                onChange={(e) => setIsSample(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Sample Data (n-1)</span>
            </label>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Enter numbers separated by commas</li>
              <li>• Decimals are supported</li>
              <li>• Use sample mode for sample data</li>
              <li>• Population mode for complete data</li>
            </ul>
          </div>
        </div>

        {results && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {formatNumber(results.standardDeviation, 4)}
                </div>
                <div className="text-gray-500">Standard Deviation</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Basic Statistics:</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mean:</span>
                    <span className="font-medium">{formatNumber(results.mean, 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Median:</span>
                    <span className="font-medium">{formatNumber(results.descriptiveStats.median, 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mode:</span>
                    <span className="font-medium">
                      {results.descriptiveStats.mode.map(formatNumber).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Range:</span>
                    <span className="font-medium">{formatNumber(results.descriptiveStats.range, 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variance:</span>
                    <span className="font-medium">{formatNumber(results.variance, 4)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Advanced Statistics:</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skewness:</span>
                    <span className="font-medium">{formatNumber(results.descriptiveStats.skewness, 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kurtosis:</span>
                    <span className="font-medium">{formatNumber(results.descriptiveStats.kurtosis, 4)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Confidence Intervals:</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">68% Confidence Interval</div>
                    <div className="font-medium">
                      {formatNumber(results.confidenceIntervals.sixtyEight.lower, 4)} to{' '}
                      {formatNumber(results.confidenceIntervals.sixtyEight.upper, 4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">95% Confidence Interval</div>
                    <div className="font-medium">
                      {formatNumber(results.confidenceIntervals.ninetyFive.lower, 4)} to{' '}
                      {formatNumber(results.confidenceIntervals.ninetyFive.upper, 4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">99% Confidence Interval</div>
                    <div className="font-medium">
                      {formatNumber(results.confidenceIntervals.ninetyNine.lower, 4)} to{' '}
                      {formatNumber(results.confidenceIntervals.ninetyNine.upper, 4)}
                    </div>
                  </div>
                </div>
              </div>

              {results.outliers.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold mb-4">Outliers:</h3>
                  <div className="space-x-2">
                    {results.outliers.map((outlier, index) => (
                      <span key={index} className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full">
                        {formatNumber(outlier, 4)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Standard Deviation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is Standard Deviation?</h3>
              <p className="text-gray-600">
                Standard deviation measures the amount of variation in a dataset. It indicates how far
                a set of numbers spreads out from their average value (mean).
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>• Small SD: Data clusters near the mean</li>
                <li>• Large SD: Data spreads far from mean</li>
                <li>• Units match original data</li>
                <li>• Always non-negative</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Sample vs Population</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Population: Complete dataset (n)</li>
                <li>• Sample: Subset of population (n-1)</li>
                <li>• Sample SD slightly larger</li>
                <li>• Use sample for estimates</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Science</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Experimental error</li>
                <li>• Quality control</li>
                <li>• Natural variation</li>
                <li>• Measurement precision</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Finance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Investment risk</li>
                <li>• Market volatility</li>
                <li>• Portfolio analysis</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Education</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Test score analysis</li>
                <li>• Grade distribution</li>
                <li>• Performance metrics</li>
                <li>• Research analysis</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}