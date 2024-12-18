import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateAreaBetweenCurves } from '../../utils/calculators/areaBetweenCurves/calculate';
import type { AreaBetweenCurvesInput } from '../../utils/calculators/areaBetweenCurves/types';

export function AreaBetweenCurvesCalculator() {
  const [inputs, setInputs] = useState<AreaBetweenCurvesInput>({
    function1: 'x^2',
    function2: 'x',
    lowerBound: 0,
    upperBound: 1,
    intervals: 1000
  });

  const result = calculateAreaBetweenCurves(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Area Between Curves Calculator | Integration Calculator"
        description="Calculate the area between two functions using numerical integration methods. Find intersection points and visualize the region between curves."
        keywords={[
          'area between curves',
          'definite integral',
          'numerical integration',
          'calculus calculator',
          'math calculator'
        ]}
        canonicalUrl="/area-between-curves-calculator"
      />

      <CalculatorLayout
        title="Area Between Curves Calculator"
        description="Calculate the area between two functions using numerical integration."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upper Function f₁(x)
              </label>
              <input
                type="text"
                value={inputs.function1}
                onChange={(e) => setInputs({ ...inputs, function1: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., x^2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lower Function f₂(x)
              </label>
              <input
                type="text"
                value={inputs.function2}
                onChange={(e) => setInputs({ ...inputs, function2: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., x"
              />
            </div>

            <CalculatorInput
              label="Lower Bound"
              value={inputs.lowerBound}
              onChange={(value) => setInputs({ ...inputs, lowerBound: parseFloat(value) || 0 })}
              type="number"
              step="any"
            />

            <CalculatorInput
              label="Upper Bound"
              value={inputs.upperBound}
              onChange={(value) => setInputs({ ...inputs, upperBound: parseFloat(value) || 0 })}
              type="number"
              step="any"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Area</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {result.area} square units
                </div>
              </div>

              {result.intersectionPoints.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Intersection Points</div>
                  <div className="text-lg font-medium text-gray-900">
                    x = {result.intersectionPoints.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Steps</h3>
            <div className="space-y-3">
              {result.steps.map((step, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-900">{step.step}</div>
                  <div className="text-sm text-gray-600 mt-1">Formula: {step.formula}</div>
                  <div className="text-sm text-indigo-600 mt-1">Result: {step.result}</div>
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
                  <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Area Between Curves</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              The area between two curves is calculated by finding the definite integral of the difference 
              between the upper and lower functions over a specified interval.
            </p>
            
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Key Concepts</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• Definite integration</li>
                  <li>• Function intersection points</li>
                  <li>• Numerical methods</li>
                  <li>• Interval selection</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Common Applications</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• Physics problems</li>
                  <li>• Engineering analysis</li>
                  <li>• Economic modeling</li>
                  <li>• Statistical analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Integration Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Simpson's Rule</h3>
              <p className="mt-2 text-gray-600">
                A numerical integration method that approximates the definite integral by using quadratic 
                polynomials to estimate the area.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Trapezoidal Rule</h3>
              <p className="mt-2 text-gray-600">
                A simpler method that approximates the area using trapezoids. Less accurate but faster 
                than Simpson's Rule.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Accurate Results</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Function Input</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>• Use standard mathematical notation</li>
                <li>• Check for valid expressions</li>
                <li>• Verify function domains</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Interval Selection</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>• Check for intersections</li>
                <li>• Consider function behavior</li>
                <li>• Verify endpoint values</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>• Compare with graphs</li>
                <li>• Check reasonableness</li>
                <li>• Validate assumptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}