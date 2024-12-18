import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateTScore } from '../../utils/calculators/tScore/calculate';

export function TScoreCalculator() {
  const [input, setInput] = useState({
    value: 75,
    mean: 70,
    standardDeviation: 10,
    sampleSize: 30
  });

  const result = calculateTScore(input);

  return (
    <>
      <SEO 
        title="T-Score Calculator | Statistical Analysis Tool"
        description="Calculate t-scores, p-values, and confidence intervals for statistical analysis. Free online t-score calculator with detailed explanations."
        keywords={[
          't-score calculator',
          'statistical analysis',
          'p-value calculator',
          'confidence interval calculator',
          'statistical significance'
        ]}
      />

      <CalculatorLayout
        title="T-Score Calculator"
        description="Calculate t-scores and analyze statistical significance"
        icon={<Calculator />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <CalculatorInput
              label="Sample Value"
              value={input.value}
              onChange={(value) => setInput(prev => ({ ...prev, value: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Population Mean"
              value={input.mean}
              onChange={(value) => setInput(prev => ({ ...prev, mean: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Standard Deviation"
              value={input.standardDeviation}
              onChange={(value) => setInput(prev => ({ ...prev, standardDeviation: parseFloat(value) || 0 }))}
              min={0.1}
              step={0.1}
            />

            <CalculatorInput
              label="Sample Size"
              value={input.sampleSize}
              onChange={(value) => setInput(prev => ({ ...prev, sampleSize: parseInt(value) || 1 }))}
              min={1}
              step={1}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">T-Score:</span>
                  <span className="font-medium">{result.tScore.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P-Value:</span>
                  <span className="font-medium">{result.pValue.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Significance:</span>
                  <span className="font-medium">{result.interpretation.significance}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confidence Intervals</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">90%:</span>
                  <span className="font-medium">
                    [{result.confidenceIntervals.ninety.lower.toFixed(2)}, {result.confidenceIntervals.ninety.upper.toFixed(2)}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">95%:</span>
                  <span className="font-medium">
                    [{result.confidenceIntervals.ninetyFive.lower.toFixed(2)}, {result.confidenceIntervals.ninetyFive.upper.toFixed(2)}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">99%:</span>
                  <span className="font-medium">
                    [{result.confidenceIntervals.ninetyNine.lower.toFixed(2)}, {result.confidenceIntervals.ninetyNine.upper.toFixed(2)}]
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interpretation</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Effect Size</h4>
                  <p className="text-gray-600">{result.interpretation.effectSize}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Direction</h4>
                  <p className="text-gray-600">{result.interpretation.direction}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculations</h3>
            <div className="space-y-4">
              {result.calculations.map((calc, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{calc.step}</h4>
                  <p className="text-sm font-mono text-gray-600">{calc.formula}</p>
                  <p className="text-gray-600">{calc.result.toFixed(4)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}