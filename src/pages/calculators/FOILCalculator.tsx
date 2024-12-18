import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateFOIL } from '../../utils/calculators/foil/calculate';

export function FOILCalculator() {
  const [firstX, setFirstX] = useState('1');
  const [firstConstant, setFirstConstant] = useState('2');
  const [secondX, setSecondX] = useState('1');
  const [secondConstant, setSecondConstant] = useState('3');

  const result = calculateFOIL({
    firstBinomial: {
      x: parseFloat(firstX),
      constant: parseFloat(firstConstant)
    },
    secondBinomial: {
      x: parseFloat(secondX),
      constant: parseFloat(secondConstant)
    }
  });

  return (
    <>
      <SEO
        title="FOIL Calculator | Binomial Multiplication Calculator"
        description="Calculate the product of two binomials using the FOIL method. Get step-by-step solutions and explanations for binomial multiplication."
        keywords={[
          'foil calculator',
          'binomial multiplication',
          'algebra calculator',
          'polynomial multiplication',
          'math calculator'
        ]}
        canonicalUrl="/foil-calculator"
      />

      <CalculatorLayout
        title="FOIL Calculator"
        description="Multiply two binomials using the FOIL method (First, Outer, Inner, Last)"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-lg font-medium text-gray-900">First Binomial (ax + b)</h2>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Coefficient of x"
                value={firstX}
                onChange={setFirstX}
                type="number"
                step="any"
              />
              <CalculatorInput
                label="Constant"
                value={firstConstant}
                onChange={setFirstConstant}
                type="number"
                step="any"
              />
            </div>

            <h2 className="text-lg font-medium text-gray-900 mt-6">Second Binomial (cx + d)</h2>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Coefficient of x"
                value={secondX}
                onChange={setSecondX}
                type="number"
                step="any"
              />
              <CalculatorInput
                label="Constant"
                value={secondConstant}
                onChange={setSecondConstant}
                type="number"
                step="any"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Result</h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-medium text-gray-900">{result.expanded}</div>
            </div>

            {/* FOIL Steps */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Step-by-Step Solution</h3>
              <div className="space-y-3">
                {result.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">{step.step}</div>
                    <code className="text-sm font-mono block mt-1">{step.expression}</code>
                    <div className="text-gray-600 text-sm mt-1">{step.explanation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Tips & Recommendations</h3>
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
        </div>
      </CalculatorLayout>
    </>
  );
}