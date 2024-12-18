import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateSimpsons } from '../../utils/calculators/simpsons/calculate';

export function SimpsonsRuleCalculator() {
  const [function_, setFunction] = useState('x^2');
  const [lowerBound, setLowerBound] = useState('0');
  const [upperBound, setUpperBound] = useState('1');
  const [intervals, setIntervals] = useState('10');

  const result = calculateSimpsons({
    function: function_,
    lowerBound: parseFloat(lowerBound),
    upperBound: parseFloat(upperBound),
    intervals: parseInt(intervals)
  });

  return (
    <>
      <SEO
        title="Simpson's Rule Calculator | Numerical Integration"
        description="Calculate definite integrals using Simpson's Rule. Get step-by-step solutions and visualize the integration process."
        keywords={[
          'simpsons rule',
          'numerical integration',
          'definite integral',
          'calculus calculator',
          'integration calculator'
        ]}
        canonicalUrl="/simpsons-rule-calculator"
      />

      <CalculatorLayout
        title="Simpson's Rule Calculator"
        description="Calculate definite integrals using Simpson's Rule numerical approximation"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <CalculatorInput
              label="Function f(x)"
              value={function_}
              onChange={setFunction}
              type="text"
              placeholder="e.g., x^2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalculatorInput
                label="Lower Bound (a)"
                value={lowerBound}
                onChange={setLowerBound}
                type="number"
                step="any"
              />
              <CalculatorInput
                label="Upper Bound (b)"
                value={upperBound}
                onChange={setUpperBound}
                type="number"
                step="any"
              />
            </div>
            <CalculatorInput
              label="Number of Intervals (n)"
              value={intervals}
              onChange={setIntervals}
              type="number"
              min="2"
              step="2"
            />
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Results</h2>
            <div className="text-2xl font-bold text-indigo-600">
              ∫ = {result.result.toFixed(6)}
            </div>
            
            {/* Steps */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Calculation Steps</h3>
              <div className="space-y-2">
                {result.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">{step.step}</div>
                    <div className="text-sm text-gray-600">
                      <code className="font-mono">{step.formula}</code>
                    </div>
                    <div className="text-indigo-600">{step.value.toFixed(6)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Analysis */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Absolute Error</div>
                  <div className="font-medium">{result.error.absolute.toExponential(3)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Relative Error</div>
                  <div className="font-medium">{result.error.relative.toExponential(3)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Error Bound</div>
                  <div className="font-medium">{result.error.bound.toExponential(3)}</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">{rec.category}</div>
                    <div className="text-sm text-gray-600">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Theory Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Understanding Simpson's Rule</h2>
            
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-800">Formula</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm font-mono">
                  ∫[a→b] f(x)dx ≈ (h/3)[f(a) + 4f(x₁) + 2f(x₂) + 4f(x₃) + 2f(x₄) + ... + f(b)]
                </code>
                <p className="text-sm text-gray-600 mt-2">
                  where h = (b-a)/n and n is the number of intervals (must be even)
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Key Points</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Simpson's Rule provides better accuracy than the Trapezoidal Rule</li>
                <li>The number of intervals must be even</li>
                <li>Accuracy improves with more intervals</li>
                <li>Works best with smooth, continuous functions</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Applications</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Engineering calculations</li>
                <li>Physics simulations</li>
                <li>Statistical analysis</li>
                <li>Numerical approximations</li>
              </ul>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}