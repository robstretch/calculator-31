import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { SEO } from '../../components/SEO/SEO';
import { calculateFactoring } from '../../utils/calculators/factoring/calculate';

export function FactoringCalculator() {
  const [expression, setExpression] = useState('x^2 - 4');
  const result = calculateFactoring({ expression });

  return (
    <>
      <SEO 
        title="Polynomial Factoring Calculator | Factor Expressions"
        description="Factor polynomials step by step with our free calculator. Supports GCF, difference of squares, trinomials, and grouping methods."
        keywords={[
          'polynomial factoring',
          'factor calculator',
          'algebra calculator',
          'math factoring',
          'polynomial roots'
        ]}
        canonicalUrl="/factoring-calculator"
      />

      <CalculatorLayout
        title="Polynomial Factoring Calculator"
        description="Factor polynomial expressions with step-by-step solutions"
        icon={<Calculator />}
      >
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                label="Expression"
                type="text"
                value={expression}
                onChange={setExpression}
                placeholder="Enter polynomial (e.g., x^2 - 4)"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Result</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-mono text-lg text-indigo-600">
                    {result.factored}
                  </div>
                  {result.roots.length > 0 && (
                    <div className="text-sm text-gray-600 mt-2">
                      Roots: {result.roots.join(', ')}
                    </div>
                  )}
                </div>

                {result.steps.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Steps:</h4>
                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        <div key={index} className="text-sm">
                          <div className="font-medium">{step.method}:</div>
                          <div className="text-gray-600">{step.explanation}</div>
                          <div className="font-mono">{step.expression}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Polynomial Factoring</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Methods</h3>
                <div className="space-y-4">
                  {result.methods.map((method, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-indigo-600 mb-2">{method.name}</h4>
                      <div className="font-mono text-sm mb-1">{method.pattern}</div>
                      <div className="text-gray-600 text-sm">Example: {method.example}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Concepts</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div>
                    <h4 className="font-medium text-indigo-600 mb-2">Greatest Common Factor (GCF)</h4>
                    <p className="text-gray-600 text-sm">
                      Always check for common factors first before applying other methods.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-600 mb-2">Difference of Squares</h4>
                    <p className="text-gray-600 text-sm">
                      Look for expressions in the form a² - b².
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-600 mb-2">Trinomials</h4>
                    <p className="text-gray-600 text-sm">
                      Factor quadratic expressions ax² + bx + c.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">Tips for Factoring</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">Step 1: GCF</h4>
                  <p className="text-indigo-700 text-sm">
                    Always start by factoring out the greatest common factor.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">Step 2: Pattern</h4>
                  <p className="text-indigo-700 text-sm">
                    Identify special patterns like difference of squares.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">Step 3: Check</h4>
                  <p className="text-indigo-700 text-sm">
                    Verify your answer by multiplying the factors.
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