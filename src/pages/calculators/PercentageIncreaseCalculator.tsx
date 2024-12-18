import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { SEO } from '../../components/SEO/SEO';
import { calculatePercentageIncrease } from '../../utils/calculators/percentageIncrease/calculate';

export function PercentageIncreaseCalculator() {
  const [oldValue, setOldValue] = useState('100');
  const [newValue, setNewValue] = useState('150');
  
  const result = calculatePercentageIncrease({
    oldValue: parseFloat(oldValue) || 0,
    newValue: parseFloat(newValue) || 0
  });

  return (
    <>
      <SEO 
        title="Percentage Increase Calculator | Calculate Percent Change"
        description="Calculate percentage increase or decrease between two values. Get step-by-step calculations and understand percent changes."
        keywords={[
          'percentage increase',
          'percentage decrease',
          'percent change',
          'percentage calculator',
          'percent difference'
        ]}
        canonicalUrl="/percentage-increase-calculator"
      />

      <CalculatorLayout
        title="Percentage Increase Calculator"
        description="Calculate the percentage change between two values"
        icon={<Calculator />}
      >
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                label="Original Value"
                value={oldValue}
                onChange={setOldValue}
                type="number"
                placeholder="Enter original value"
              />
              <CalculatorInput
                label="New Value"
                value={newValue}
                onChange={setNewValue}
                type="number"
                placeholder="Enter new value"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Result</h3>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-indigo-600">
                  {result.percentageChange.toFixed(2)}%
                  <span className="text-lg text-gray-500 ml-2">
                    {result.isIncrease ? 'Increase' : 'Decrease'}
                  </span>
                </div>

                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Absolute Change:</span>
                    <span className="font-medium">{result.absoluteChange.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Multiplier:</span>
                    <span className="font-medium">{result.multiplier.toFixed(4)}x</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Calculation Steps:</h4>
                  <div className="space-y-2">
                    {result.calculations.map((step, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium text-gray-700">{step.step}:</div>
                        <div className="font-mono text-gray-600">{step.formula}</div>
                        <div className="text-indigo-600">{step.result}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Percentage Changes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Concepts</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <div className="font-medium text-indigo-600">Percentage Increase</div>
                      <p className="text-gray-600 text-sm">When the new value is higher than the original value</p>
                    </div>
                    <div>
                      <div className="font-medium text-indigo-600">Percentage Decrease</div>
                      <p className="text-gray-600 text-sm">When the new value is lower than the original value</p>
                    </div>
                    <div>
                      <div className="font-medium text-indigo-600">Multiplier</div>
                      <p className="text-gray-600 text-sm">Factor to multiply original value to get new value</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Examples</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {result.examples.map((example, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-medium text-indigo-600 mb-2">{example.type}</h4>
                        <div className="space-y-1 text-sm">
                          {example.values.map((value, vIndex) => (
                            <div key={vIndex} className="flex justify-between">
                              <span className="text-gray-600">
                                {value.old} → {value.new}
                              </span>
                              <span className="font-medium">
                                {value.percentage > 0 ? '+' : ''}{value.percentage}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Calculation Tips</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">Basic Formula</h4>
                  <p className="text-indigo-700 text-sm">
                    ((New - Original) ÷ |Original|) × 100
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">Negative Values</h4>
                  <p className="text-indigo-700 text-sm">
                    Use absolute value of original for consistent results
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">Multiplier</h4>
                  <p className="text-indigo-700 text-sm">
                    Convert percentage to decimal: 50% = 1.5x multiplier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}