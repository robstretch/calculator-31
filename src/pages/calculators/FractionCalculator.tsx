import React, { useState } from 'react';
import { Divide } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { SitemapLink } from '../../components/Calculator/SitemapLink';
import { calculateFraction, Fraction } from '../../utils/calculators/fraction';
import { formatNumber } from '../../utils/format';

export function FractionCalculator() {
  const [fraction1, setFraction1] = useState<Fraction>({ numerator: 1, denominator: 2 });
  const [fraction2, setFraction2] = useState<Fraction>({ numerator: 1, denominator: 3 });
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');

  const results = calculateFraction(fraction1, fraction2, operation);

  const operations = [
    { value: 'add', label: '+', title: 'Add' },
    { value: 'subtract', label: '−', title: 'Subtract' },
    { value: 'multiply', label: '×', title: 'Multiply' },
    { value: 'divide', label: '÷', title: 'Divide' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Fraction Calculator | Calculate & Simplify Fractions"
        description="Calculate fraction operations with step-by-step solutions. Add, subtract, multiply and divide fractions with our free calculator."
        keywords={[
          'fraction calculator',
          'fraction operations',
          'simplify fractions',
          'add fractions',
          'multiply fractions',
          'divide fractions'
        ]}
        canonicalUrl="/fraction-calculator"
      />
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Divide className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fraction Calculator</h1>
        <p className="text-gray-600">
          Perform calculations with fractions and see step-by-step solutions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enter Fractions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">First Fraction</h3>
              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Numerator"
                  value={fraction1.numerator.toString()}
                  onChange={(value) => setFraction1({ ...fraction1, numerator: parseInt(value) || 0 })}
                  type="number"
                />
                <CalculatorInput
                  label="Denominator"
                  value={fraction1.denominator.toString()}
                  onChange={(value) => setFraction1({ ...fraction1, denominator: parseInt(value) || 1 })}
                  type="number"
                  min={1}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                {operations.map((op) => (
                  <button
                    key={op.value}
                    onClick={() => setOperation(op.value as typeof operation)}
                    className={`px-4 py-2 text-sm font-medium ${
                      operation === op.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } border border-gray-300 first:rounded-l-md last:rounded-r-md -ml-px first:ml-0`}
                    title={op.title}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Second Fraction</h3>
              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Numerator"
                  value={fraction2.numerator.toString()}
                  onChange={(value) => setFraction2({ ...fraction2, numerator: parseInt(value) || 0 })}
                  type="number"
                />
                <CalculatorInput
                  label="Denominator"
                  value={fraction2.denominator.toString()}
                  onChange={(value) => setFraction2({ ...fraction2, denominator: parseInt(value) || 1 })}
                  type="number"
                  min={1}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">
                {fraction1.numerator}/{fraction1.denominator} {operations.find(op => op.value === operation)?.label} {fraction2.numerator}/{fraction2.denominator} =
              </div>
              <div className="text-3xl font-bold text-indigo-600">
                {results.simplified.numerator}/{results.simplified.denominator}
              </div>
              <div className="text-gray-500 mt-2">
                = {formatNumber(results.decimal, 4)}
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Solution Steps:</h3>
            <ol className="space-y-2">
              {results.steps.map((step, index) => (
                <li key={index} className="text-indigo-700">
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <SitemapLink />
    </div>
  );
}