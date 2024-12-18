import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateZScore } from '../../utils/calculators/zscore';
import { formatNumber } from '../../utils/format';

export function ZScoreCalculator() {
  const [value, setValue] = useState('75');
  const [mean, setMean] = useState('70');
  const [standardDeviation, setStandardDeviation] = useState('5');

  const results = calculateZScore(
    parseFloat(value) || 0,
    parseFloat(mean) || 0,
    parseFloat(standardDeviation) || 1
  );

  return (
    <CalculatorLayout
      title="Z-Score Calculator"
      description="Calculate z-scores and probabilities"
      icon={<Calculator />}
    >
      <SEO
        title="Z-Score Calculator | Standard Score Calculator"
        description="Calculate z-scores, probabilities, and confidence intervals. Free z-score calculator for statistical analysis."
        keywords={[
          'z-score calculator',
          'standard score calculator',
          'normal distribution',
          'probability calculator',
          'statistics calculator',
          'standardized score'
        ]}
        canonicalUrl="/z-score-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Distribution Parameters</h2>
          
          <CalculatorInput
            label="Value"
            value={value}
            onChange={setValue}
            step="any"
            placeholder="Enter the value to standardize"
          />
          
          <CalculatorInput
            label="Mean (μ)"
            value={mean}
            onChange={setMean}
            step="any"
            placeholder="Enter the population mean"
          />
          
          <CalculatorInput
            label="Standard Deviation (σ)"
            value={standardDeviation}
            onChange={setStandardDeviation}
            min="0.000001"
            step="any"
            placeholder="Enter the standard deviation"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.zScore, 3)}
              </div>
              <div className="text-gray-500">Z-Score</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Percentile"
              value={`${formatNumber(results.percentile)}%`}
              helpText="Position relative to the population"
            />
            
            <CalculatorResult
              label="Probability"
              value={formatNumber(results.probability, 3)}
              helpText="Probability of value being less than or equal"
            />
            
            <CalculatorResult
              label="Interpretation"
              value={results.interpretation}
              helpText="Statistical significance"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Confidence Intervals:</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500 mb-1">68% Confidence Interval</div>
                  <div className="font-medium">
                    {formatNumber(results.confidenceIntervals.sixtyEight.lower)} to{' '}
                    {formatNumber(results.confidenceIntervals.sixtyEight.upper)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">95% Confidence Interval</div>
                  <div className="font-medium">
                    {formatNumber(results.confidenceIntervals.ninetyFive.lower)} to{' '}
                    {formatNumber(results.confidenceIntervals.ninetyFive.upper)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">99% Confidence Interval</div>
                  <div className="font-medium">
                    {formatNumber(results.confidenceIntervals.ninetyNine.lower)} to{' '}
                    {formatNumber(results.confidenceIntervals.ninetyNine.upper)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Z-Scores</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is a Z-Score?</h3>
              <p className="text-gray-600">
                A z-score (or standard score) indicates how many standard deviations away from the 
                mean a data point is. It allows comparison of values from different normal 
                distributions by standardizing them to a common scale.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Interpretation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Z = 0: Value equals the mean</li>
                <li>• Z {'>'} 0: Value is above the mean</li>
                <li>• Z {'<'} 0: Value is below the mean</li>
                <li>• |Z| = 1: One standard deviation from mean</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Normal Distribution Properties</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">68-95-99.7 Rule</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 68% within ±1σ</li>
                <li>• 95% within ±2σ</li>
                <li>• 99.7% within ±3σ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Z-Scores</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Z = ±1.645: 90% confidence</li>
                <li>• Z = ±1.96: 95% confidence</li>
                <li>• Z = ±2.576: 99% confidence</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Applications</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Statistical testing</li>
                <li>• Quality control</li>
                <li>• Educational scoring</li>
                <li>• Research analysis</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}