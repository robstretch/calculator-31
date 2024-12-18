import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateLHopital } from '../../utils/calculators/lhopital/calculate';

export function LHopitalCalculator() {
  const [numerator, setNumerator] = useState('x');
  const [denominator, setDenominator] = useState('x');
  const [point, setPoint] = useState('0');

  const result = calculateLHopital({
    numerator,
    denominator,
    point: parseFloat(point)
  });

  return (
    <>
      <SEO 
        title="L'Hôpital's Rule Calculator | Evaluate Limits"
        description="Calculate limits using L'Hôpital's Rule. Evaluate indeterminate forms and find limits step by step."
        keywords={[
          'lhopital rule',
          'limit calculator',
          'indeterminate forms',
          'calculus',
          'derivatives'
        ]}
        canonicalUrl="/lhopital-calculator"
      />

      <CalculatorLayout
        title="L'Hôpital's Rule Calculator"
        description="Evaluate limits of indeterminate forms using L'Hôpital's Rule"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Enter Function</h2>
            <div className="grid gap-4">
              <CalculatorInput
                label="Numerator f(x)"
                value={numerator}
                onChange={setNumerator}
                type="text"
                placeholder="Enter numerator (e.g., x^2)"
              />
              <CalculatorInput
                label="Denominator g(x)"
                value={denominator}
                onChange={setDenominator}
                type="text"
                placeholder="Enter denominator (e.g., x)"
              />
              <CalculatorInput
                label="Point x"
                value={point}
                onChange={setPoint}
                type="number"
                placeholder="Enter point of evaluation"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Indeterminate Form:</p>
                <p className="text-lg font-mono">{result.indeterminateForm}</p>
              </div>
              <div>
                <p className="text-gray-600">Limit:</p>
                <p className="text-lg font-mono">{result.limit}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Solution Steps</h2>
            <div className="space-y-4">
              {result.steps.map((step, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <p className="font-medium">Iteration {step.iteration}</p>
                  <p className="font-mono text-sm">
                    {step.numerator} / {step.denominator}
                  </p>
                  <p className="text-gray-600 text-sm">{step.explanation}</p>
                  <p className="font-mono text-sm">= {step.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <div className="grid gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <p className="font-medium">{rec.category}</p>
                  <p className="text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}