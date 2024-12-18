import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateDerivative } from '../../utils/calculators/derivative';

export function DerivativeCalculator() {
  const [expression, setExpression] = useState('x^2 + 2x + 1');
  const [error, setError] = useState('');
  const [results, setResults] = useState<ReturnType<typeof calculateDerivative> | null>(null);

  useEffect(() => {
    try {
      const newResults = calculateDerivative(expression);
      setResults(newResults);
      setError('');
    } catch (e) {
      setError('Invalid expression. Please check your input.');
      setResults(null);
    }
  }, [expression]);

  return (
    <CalculatorLayout
      title="Derivative Calculator"
      description="Calculate derivatives with step-by-step solutions"
      icon={<Calculator />}
    >
      <SEO
        title="Derivative Calculator | Calculus Calculator"
        description="Calculate derivatives of polynomial functions with step-by-step solutions. Free derivative calculator with detailed explanations."
        keywords={[
          'derivative calculator',
          'calculus calculator',
          'differentiation calculator',
          'polynomial derivative',
          'math calculator',
          'calculus tool'
        ]}
        canonicalUrl="/derivative-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Function Input</h2>
          
          <CalculatorInput
            label="Enter Polynomial Function"
            value={expression}
            onChange={setExpression}
            type="text"
            placeholder="Example: x^2 + 2x + 1"
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Input Format:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use ^ for exponents (e.g., x^2)</li>
              <li>• Include all terms (e.g., 2x + 1)</li>
              <li>• Spaces are optional</li>
              <li>• Constants can be written as numbers</li>
            </ul>
          </div>
        </div>

        {results && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Original Function</div>
                  <div className="text-xl font-medium">f(x) = {results.originalFunction}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Derivative</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    f'(x) = {results.derivativeFunction}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Step-by-Step Solution:</h3>
              <ol className="space-y-4">
                {results.steps.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    {step.startsWith('•') ? (
                      <div className="ml-4 text-gray-600">{step}</div>
                    ) : (
                      <div>{step}</div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Derivatives</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Rules</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Power Rule: d/dx(x^n) = nx^(n-1)</li>
                <li>• Constant Rule: d/dx(c) = 0</li>
                <li>• Sum Rule: d/dx(f + g) = f' + g'</li>
                <li>• Constant Multiple: d/dx(cf) = c·f'</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Applications</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Rate of change</li>
                <li>• Slope of tangent lines</li>
                <li>• Optimization problems</li>
                <li>• Motion analysis</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Derivatives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Functions</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• d/dx(x) = 1</li>
                <li>• d/dx(x²) = 2x</li>
                <li>• d/dx(x³) = 3x²</li>
                <li>• d/dx(1) = 0</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Examples</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• d/dx(2x² + 3x) = 4x + 3</li>
                <li>• d/dx(x³ - 2x + 1) = 3x² - 2</li>
                <li>• d/dx(5x⁴) = 20x³</li>
                <li>• d/dx(-x² + 4) = -2x</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Break down complex terms</li>
                <li>• Apply rules one at a time</li>
                <li>• Check your work</li>
                <li>• Simplify final answer</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}