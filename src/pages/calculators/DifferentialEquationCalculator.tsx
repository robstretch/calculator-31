import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateDifferentialEquation } from '../../utils/calculators/differentialEquation/calculate';
import { DifferentialEquationResult } from '../../utils/calculators/differentialEquation/types';

export function DifferentialEquationCalculator() {
  const [equation, setEquation] = useState("y' + y = x");
  const [hasInitialConditions, setHasInitialConditions] = useState(false);
  const [initialX, setInitialX] = useState('0');
  const [initialY, setInitialY] = useState('1');
  const [error, setError] = useState('');
  const [results, setResults] = useState<DifferentialEquationResult | null>(null);

  useEffect(() => {
    try {
      const initialConditions = hasInitialConditions 
        ? { x: parseFloat(initialX), y: parseFloat(initialY) }
        : undefined;
      
      const newResults = calculateDifferentialEquation(equation, initialConditions);
      setResults(newResults);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setResults(null);
    }
  }, [equation, hasInitialConditions, initialX, initialY]);

  return (
    <CalculatorLayout
      title="Differential Equation Calculator"
      description="Solve differential equations step by step"
      icon={<Calculator />}
    >
      <SEO
        title="Differential Equation Calculator | ODE Solver"
        description="Solve differential equations with step-by-step solutions. Free differential equation calculator for linear and separable equations."
        keywords={[
          'differential equation calculator',
          'ode calculator',
          'differential equation solver',
          'calculus calculator',
          'math solver',
          'equation solver'
        ]}
        canonicalUrl="/differential-equation-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Equation Input</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Differential Equation
            </label>
            <textarea
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="Enter differential equation (e.g., y' + y = x)"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasInitialConditions}
                onChange={(e) => setHasInitialConditions(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Include Initial Conditions</span>
            </label>
          </div>

          {hasInitialConditions && (
            <div className="space-y-4">
              <CalculatorInput
                label="Initial x"
                value={initialX}
                onChange={setInitialX}
                type="number"
                step="any"
                placeholder="Enter initial x value"
              />
              <CalculatorInput
                label="Initial y"
                value={initialY}
                onChange={setInitialY}
                type="number"
                step="any"
                placeholder="Enter initial y value"
              />
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Input Format:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use y' for first derivative</li>
              <li>• Use y'' for second derivative</li>
              <li>• Use * for multiplication</li>
              <li>• Use ^ for exponents</li>
              <li>• Include = sign in equation</li>
            </ul>
          </div>
        </div>

        {results && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Solution</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Equation Type</div>
                  <div className="text-lg font-medium">
                    {results.type.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')} Order
                    {results.isLinear ? ' Linear' : ' Non-linear'}
                    {results.isSeparable ? ' (Separable)' : ''}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">General Solution</div>
                  <div className="text-lg font-medium">{results.generalSolution}</div>
                </div>
                {results.particularSolution && (
                  <div>
                    <div className="text-sm text-gray-500">Particular Solution</div>
                    <div className="text-lg font-medium">{results.particularSolution}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Solution Steps:</h3>
              <ol className="space-y-4">
                {results.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Differential Equations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Types of Equations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• First-order: Contains only first derivatives</li>
                <li>• Second-order: Contains second derivatives</li>
                <li>• Linear: Variable and derivatives appear linearly</li>
                <li>• Separable: Variables can be separated</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Solution Methods</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Separation of variables</li>
                <li>• Integrating factor method</li>
                <li>• Characteristic equation</li>
                <li>• Variation of parameters</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Physics</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Motion equations</li>
                <li>• Wave equations</li>
                <li>• Heat transfer</li>
                <li>• Quantum mechanics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Engineering</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Circuit analysis</li>
                <li>• Control systems</li>
                <li>• Structural analysis</li>
                <li>• Fluid dynamics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Biology</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Population growth</li>
                <li>• Disease spread</li>
                <li>• Chemical reactions</li>
                <li>• Neural networks</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}