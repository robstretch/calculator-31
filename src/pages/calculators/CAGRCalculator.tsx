import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateCAGR } from '../../utils/calculators/cagr/calculate';
import type { CAGRInput } from '../../utils/calculators/cagr/types';

export function CAGRCalculator() {
  const [inputs, setInputs] = useState<CAGRInput>({
    initialValue: 1000,
    finalValue: 2000,
    years: 5,
    adjustForInflation: false,
    inflationRate: 2.5
  });

  const result = calculateCAGR(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="CAGR Calculator | Compound Annual Growth Rate"
        description="Calculate Compound Annual Growth Rate (CAGR) and analyze investment growth over time. Get real returns adjusted for inflation."
        keywords={[
          'CAGR calculator',
          'compound annual growth rate',
          'investment growth',
          'annualized return',
          'real returns calculator'
        ]}
        canonicalUrl="/cagr-calculator"
      />

      <CalculatorLayout
        title="CAGR Calculator"
        description="Calculate Compound Annual Growth Rate (CAGR) and analyze investment performance over time."
        icon={<TrendingUp />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Initial Value"
              value={inputs.initialValue}
              onChange={(value) => setInputs({ ...inputs, initialValue: parseFloat(value) })}
              min={0}
            />

            <CalculatorInput
              label="Final Value"
              value={inputs.finalValue}
              onChange={(value) => setInputs({ ...inputs, finalValue: parseFloat(value) })}
              min={0}
            />

            <CalculatorInput
              label="Time Period (Years)"
              value={inputs.years}
              onChange={(value) => setInputs({ ...inputs, years: parseFloat(value) })}
              min={1}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adjust for Inflation
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={inputs.adjustForInflation}
                    onChange={(e) => setInputs({ ...inputs, adjustForInflation: e.target.checked })}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                {inputs.adjustForInflation && (
                  <CalculatorInput
                    label="Inflation Rate (%)"
                    value={inputs.inflationRate || 2.5}
                    onChange={(value) => setInputs({ ...inputs, inflationRate: parseFloat(value) })}
                    min={0}
                    max={100}
                    step={0.1}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="CAGR"
                value={`${result.cagr.toFixed(2)}%`}
                helpText="Compound Annual Growth Rate"
              />
              
              {result.realCAGR !== undefined && (
                <CalculatorResult
                  label="Real CAGR"
                  value={`${result.realCAGR.toFixed(2)}%`}
                  helpText="CAGR adjusted for inflation"
                />
              )}

              <CalculatorResult
                label="Total Growth"
                value={`${result.totalGrowth.toFixed(2)}%`}
                helpText="Total percentage growth over entire period"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-by-Year Projections</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Year</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Value</th>
                    {inputs.adjustForInflation && (
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Real Value
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {result.projections.map((projection) => (
                    <tr key={projection.year}>
                      <td className="px-4 py-2 text-sm text-gray-900">Year {projection.year}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        ${projection.value.toLocaleString()}
                      </td>
                      {inputs.adjustForInflation && projection.realValue && (
                        <td className="px-4 py-2 text-sm text-gray-900">
                          ${projection.realValue.toLocaleString()}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.analysis.map((metric, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{metric.metric}</div>
                  <div className="text-2xl font-bold text-indigo-600 my-1">
                    {metric.value}%
                  </div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
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