import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateInflectionPoints } from '../../utils/calculators/inflectionPoint/calculate';

export function InflectionPointCalculator() {
  const [expression, setExpression] = useState('x^3 - 3x');
  const [rangeMin, setRangeMin] = useState('-10');
  const [rangeMax, setRangeMax] = useState('10');

  const result = calculateInflectionPoints({
    expression,
    range: {
      min: parseFloat(rangeMin),
      max: parseFloat(rangeMax)
    }
  });

  return (
    <>
      <SEO
        title="Inflection Point Calculator | Find Points of Concavity Change"
        description="Calculate inflection points and analyze function behavior with our free online calculator. Find critical points, derivatives, and concavity changes."
        keywords={[
          'inflection point calculator',
          'calculus calculator',
          'function analysis',
          'critical points',
          'concavity',
          'derivatives'
        ]}
        canonicalUrl="/inflection-point-calculator"
      />

      <CalculatorLayout
        title="Inflection Point Calculator"
        description="Find inflection points and analyze function behavior"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <CalculatorInput
              label="Function f(x)"
              value={expression}
              onChange={setExpression}
              type="text"
              placeholder="e.g., x^3 - 3x"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalculatorInput
                label="Range Minimum"
                value={rangeMin}
                onChange={setRangeMin}
                type="number"
                step="any"
              />
              <CalculatorInput
                label="Range Maximum"
                value={rangeMax}
                onChange={setRangeMax}
                type="number"
                step="any"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Results</h2>
            
            {/* Points */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-800">Points Found</h3>
              {result.points.map((point, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-700">
                    {point.type === 'inflection' ? 'Inflection Point' : 'Critical Point'}
                  </div>
                  <div className="text-gray-600">
                    x = {point.x.toFixed(4)}, y = {point.y.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>

            {/* Derivatives */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-800">Derivatives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-700">First Derivative</div>
                  <code className="text-sm font-mono">{result.derivatives.first}</code>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-700">Second Derivative</div>
                  <code className="text-sm font-mono">{result.derivatives.second}</code>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-800">Solution Steps</h3>
              {result.steps.map((step, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-700">{step.step}</div>
                  <code className="text-sm font-mono block mt-1">{step.expression}</code>
                  <div className="text-gray-600 text-sm mt-1">{step.explanation}</div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-800">Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">{rec.category}</div>
                    <div className="text-gray-600 text-sm">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Theory Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Understanding Inflection Points</h2>
            
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-800">Definition</h3>
              <p className="text-gray-600">
                An inflection point is a point on a curve where the concavity changes from concave upward to 
                concave downward, or vice versa. At these points, the second derivative changes sign.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Key Concepts</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>First derivative (f'(x)) shows rate of change</li>
                <li>Second derivative (f''(x)) shows concavity</li>
                <li>Inflection points occur where f''(x) = 0 and changes sign</li>
                <li>Critical points occur where f'(x) = 0 or undefined</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">Applications</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Optimization problems</li>
                <li>Economic analysis (marginal cost/revenue)</li>
                <li>Population growth models</li>
                <li>Physical systems analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}