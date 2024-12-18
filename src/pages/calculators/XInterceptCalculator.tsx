import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateXIntercepts } from '../../utils/calculators/xIntercept/calculate';

export function XInterceptCalculator() {
  const [coefficients, setCoefficients] = useState(['1', '0', '0']); // Default to x²

  const handleCoefficientChange = (index: number, value: string) => {
    const newCoefficients = [...coefficients];
    newCoefficients[index] = value;
    setCoefficients(newCoefficients);
  };

  const result = calculateXIntercepts({
    coefficients: coefficients.map(c => parseFloat(c) || 0)
  });

  return (
    <>
      <SEO 
        title="X-Intercept Calculator | Find Roots of Polynomial Functions"
        description="Calculate x-intercepts (roots) of polynomial functions. Find where a polynomial crosses the x-axis with step-by-step solutions."
        keywords={[
          'x-intercept calculator',
          'root finder',
          'polynomial roots',
          'zero calculator',
          'polynomial solver'
        ]}
        canonicalUrl="/x-intercept-calculator"
      />

      <CalculatorLayout
        title="X-Intercept Calculator"
        description="Find the x-intercepts (roots) of polynomial functions"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Enter Coefficients</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coefficients.map((coef, index) => (
                <CalculatorInput
                  key={index}
                  label={`x^${coefficients.length - 1 - index}`}
                  value={coef}
                  onChange={(value) => handleCoefficientChange(index, value)}
                  type="number"
                  step="any"
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Function:</p>
                <p className="text-lg font-mono">{result.polynomial.expression}</p>
              </div>
              <div>
                <p className="text-gray-600">X-Intercepts:</p>
                {result.intercepts.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {result.intercepts.map((x, i) => (
                      <li key={i} className="font-mono">x = {x}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No real x-intercepts found</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Solution Steps</h2>
            <div className="space-y-4">
              {result.steps.map((step, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <p className="font-medium">{step.method}</p>
                  <p className="font-mono text-sm">{step.expression}</p>
                  <p className="text-gray-600 text-sm">{step.explanation}</p>
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