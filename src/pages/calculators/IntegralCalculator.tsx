import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateIntegral } from '../../utils/calculators/integral/calculate';

export function IntegralCalculator() {
  const [expression, setExpression] = useState('');
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const input = {
      expression,
      lowerBound: lowerBound ? parseFloat(lowerBound) : undefined,
      upperBound: upperBound ? parseFloat(upperBound) : undefined
    };
    setResult(calculateIntegral(input));
  };

  return (
    <>
      <SEO
        title="Integral Calculator | Calculate Antiderivatives and Definite Integrals"
        description="Calculate indefinite and definite integrals with step-by-step solutions. Learn integration rules and visualize results with our free online integral calculator."
        keywords={[
          'integral calculator',
          'integration calculator',
          'antiderivative calculator',
          'definite integral',
          'indefinite integral',
          'calculus calculator'
        ]}
        canonicalUrl="/integral-calculator"
      />

      <CalculatorLayout
        title="Integral Calculator"
        description="Calculate indefinite and definite integrals with step-by-step solutions"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <CalculatorInput
                label="Expression to Integrate"
                value={expression}
                onChange={setExpression}
                type="text"
                placeholder="Enter expression (e.g., x^2)"
              />
              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Lower Bound (optional)"
                  value={lowerBound}
                  onChange={setLowerBound}
                  type="number"
                  placeholder="Lower bound"
                />
                <CalculatorInput
                  label="Upper Bound (optional)"
                  value={upperBound}
                  onChange={setUpperBound}
                  type="number"
                  placeholder="Upper bound"
                />
              </div>
              <button
                onClick={handleCalculate}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                Calculate Integral
              </button>
            </div>
          </div>

          {result && (
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Result</h3>
                <p className="text-gray-700">∫ {expression} dx = {result.antiderivative}</p>
                {result.definiteResult !== undefined && (
                  <p className="mt-2 text-gray-700">
                    Definite integral: {result.definiteResult}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Steps</h3>
                <div className="space-y-2">
                  {result.steps.map((step, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">{step.rule}</p>
                      <p className="text-gray-600">{step.expression}</p>
                      <p className="text-sm text-gray-500">{step.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Integration Rules</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {result.rules.map((rule, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-gray-600">{rule.formula}</p>
                      <p className="text-sm text-gray-500">Example: {rule.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Integration</h2>
            
            <p>
              Integration is a fundamental concept in calculus that allows us to calculate areas, volumes, and accumulation of quantities over time or space. Whether you're studying physics, engineering, or mathematics, understanding integration is crucial for solving real-world problems.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Indefinite Integrals</h3>
                <p className="text-gray-600">
                  An indefinite integral, or antiderivative, is a function whose derivative equals the integrand. The result includes a constant of integration (C) because derivatives of functions that differ only by a constant are equal.
                </p>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Example:</p>
                  <p className="font-mono">∫x² dx = x³/3 + C</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Definite Integrals</h3>
                <p className="text-gray-600">
                  A definite integral calculates the signed area between a function and the x-axis over a specified interval. It's computed using the Fundamental Theorem of Calculus by evaluating the antiderivative at the bounds.
                </p>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Example:</p>
                  <p className="font-mono">∫₁² x² dx = [x³/3]₁² = 7/3</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Integration Rules</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Power Rule</h4>
                  <p className="font-mono">∫xⁿ dx = (xⁿ⁺¹)/(n+1) + C</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Constant Rule</h4>
                  <p className="font-mono">∫a dx = ax + C</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Sum Rule</h4>
                  <p className="font-mono">∫(f(x) + g(x)) dx = ∫f(x) dx + ∫g(x) dx</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Exponential Rule</h4>
                  <p className="font-mono">∫eˣ dx = eˣ + C</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Applications</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Physics</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Work and energy calculations</li>
                    <li>• Center of mass determination</li>
                    <li>• Fluid pressure and force</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Engineering</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Area calculations</li>
                    <li>• Volume of revolution</li>
                    <li>• Moment of inertia</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Statistics</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Probability distributions</li>
                    <li>• Expected value calculations</li>
                    <li>• Continuous random variables</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}