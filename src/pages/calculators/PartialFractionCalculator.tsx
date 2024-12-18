import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculatePartialFraction } from '../../utils/calculators/partialFraction/calculate';

export function PartialFractionCalculator() {
  const [numerator, setNumerator] = useState('x + 1');
  const [denominator, setDenominator] = useState('x^2 - 1');
  const [error, setError] = useState('');

  const results = calculatePartialFraction(numerator, denominator);

  return (
    <CalculatorLayout
      title="Partial Fraction Calculator"
      description="Decompose rational expressions"
      icon={<Calculator />}
    >
      <SEO
        title="Partial Fraction Calculator | Fraction Decomposition"
        description="Decompose rational expressions into partial fractions with step-by-step solutions. Free partial fraction calculator for algebra and calculus."
        keywords={[
          'partial fraction calculator',
          'fraction decomposition',
          'rational expression calculator',
          'algebra calculator',
          'calculus calculator',
          'math solver'
        ]}
        canonicalUrl="/partial-fraction-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expression Input</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numerator
            </label>
            <input
              type="text"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter numerator (e.g., x + 1)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Denominator
            </label>
            <input
              type="text"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter denominator (e.g., x^2 - 1)"
            />
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Input Format:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use x as the variable</li>
              <li>• Use ^ for exponents (e.g., x^2)</li>
              <li>• Use + and - for operations</li>
              <li>• Coefficients can be integers or decimals</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Solution</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-xl font-medium mb-2">
                Original Expression:
              </div>
              <div className="text-2xl font-bold text-indigo-600">
                {results.originalExpression}
              </div>
            </div>
          </div>

          {!results.isProper && results.longDivision && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Long Division:</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Quotient: </span>
                  <span className="font-medium">{results.longDivision.quotient}</span>
                </div>
                <div>
                  <span className="text-gray-600">Remainder: </span>
                  <span className="font-medium">{results.longDivision.remainder}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Factored Form:</h3>
            <div className="space-y-2">
              {results.factors.map((factor, index) => (
                <div key={index} className="font-medium">
                  {factor.terms.map(term => term.coefficient + term.variable + (term.exponent > 1 ? `^${term.exponent}` : '')).join(' + ')}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Partial Fraction Decomposition:</h3>
            <div className="text-lg font-medium text-indigo-600">
              {results.decomposition}
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
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Partial Fractions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">When to Use</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Integration of rational functions</li>
                <li>• Simplifying complex fractions</li>
                <li>• Finding inverse Laplace transforms</li>
                <li>• Solving differential equations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Prerequisites</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Proper/improper fractions</li>
                <li>• Polynomial factoring</li>
                <li>• Linear equations</li>
                <li>• Polynomial long division</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Decomposition Types</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Linear Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• A/(x + a)</li>
                <li>• Simple terms</li>
                <li>• One coefficient</li>
                <li>• Basic integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Repeated Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• A/(x + a)^n</li>
                <li>• Multiple terms</li>
                <li>• Higher powers</li>
                <li>• More complex</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Irreducible Quadratic</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• (Ax + B)/(x² + px + q)</li>
                <li>• Cannot factor</li>
                <li>• Two coefficients</li>
                <li>• Special methods</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}