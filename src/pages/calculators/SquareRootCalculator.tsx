import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateSquareRoot } from '../../utils/calculators/squareRoot/calculate';
import { formatNumber } from '../../utils/format';

export function SquareRootCalculator() {
  const [number, setNumber] = useState('16');
  const [precision, setPrecision] = useState('10');
  const [error, setError] = useState('');
  const [results, setResults] = useState(calculateSquareRoot(16, 10));

  useEffect(() => {
    try {
      const newResults = calculateSquareRoot(parseFloat(number) || 0, parseInt(precision) || 10);
      setResults(newResults);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }, [number, precision]);

  return (
    <CalculatorLayout
      title="Square Root Calculator"
      description="Calculate square roots with multiple methods"
      icon={<Calculator />}
    >
      <SEO
        title="Square Root Calculator | Root Calculator"
        description="Calculate square roots using multiple methods with step-by-step solutions. Free square root calculator with detailed explanations."
        keywords={[
          'square root calculator',
          'root calculator',
          'radical calculator',
          'perfect square calculator',
          'newton method calculator',
          'math calculator'
        ]}
        canonicalUrl="/square-root-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          
          <CalculatorInput
            label="Number"
            value={number}
            onChange={setNumber}
            type="number"
            step="any"
            placeholder="Enter a number"
          />
          
          <CalculatorInput
            label="Precision (iterations)"
            value={precision}
            onChange={setPrecision}
            min={1}
            max={100}
            step={1}
            type="number"
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {results && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {formatNumber(results.result, 6)}
                </div>
                <div className="text-gray-500">Square Root</div>
                <div className="text-sm text-gray-400 mt-1">
                  Using {results.approximationMethod}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Alternative Methods:</h3>
              <div className="space-y-3">
                {results.alternativeMethods.map((method, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{method.method}:</span>
                    <span className="font-medium">{formatNumber(method.value, 6)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Verification:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Result squared:</span>
                  <span className="font-medium">
                    {formatNumber(results.result * results.result, 6)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Original number:</span>
                  <span className="font-medium">{number}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Square Roots</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Definition</h3>
              <p className="text-gray-600">
                The square root of a number is a value that, when multiplied by itself, gives the number.
                For example, the square root of 16 is 4, because 4 × 4 = 16.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Properties</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Every positive number has two square roots</li>
                <li>• The principal square root is positive</li>
                <li>• Perfect squares have whole number roots</li>
                <li>• Negative numbers have complex roots</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Methods</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Newton's Method</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Iterative approximation</li>
                <li>• Fast convergence</li>
                <li>• High precision</li>
                <li>• Used in computers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Long Division</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Traditional method</li>
                <li>• Step by step process</li>
                <li>• Good for learning</li>
                <li>• Works with paper</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Prime Factorization</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Works for perfect squares</li>
                <li>• Shows number structure</li>
                <li>• Simplifies radicals</li>
                <li>• Educational value</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}