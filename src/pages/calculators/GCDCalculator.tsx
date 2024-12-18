import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { SEO } from '../../components/SEO/SEO';
import { calculateGCD } from '../../utils/calculators/gcd/calculate';

export function GCDCalculator() {
  const [numbers, setNumbers] = useState(['', '', '']);
  
  const result = calculateGCD({
    numbers: numbers.map(n => parseInt(n)).filter(n => !isNaN(n))
  });

  return (
    <>
      <SEO 
        title="GCD Calculator | Greatest Common Divisor"
        description="Calculate the Greatest Common Divisor (GCD) of multiple numbers. View step-by-step calculations and prime factorizations."
        keywords={[
          'gcd calculator',
          'greatest common divisor',
          'euclidean algorithm',
          'prime factorization',
          'number theory calculator'
        ]}
        canonicalUrl="/gcd-calculator"
      />

      <CalculatorLayout
        title="GCD Calculator"
        description="Calculate the Greatest Common Divisor of multiple numbers"
        icon={<Calculator />}
      >
        <div className="grid gap-8">
          <div className="grid gap-4">
            {numbers.map((num, index) => (
              <CalculatorInput
                key={index}
                label={`Number ${index + 1}`}
                value={num}
                onChange={(value) => {
                  const newNumbers = [...numbers];
                  newNumbers[index] = value;
                  setNumbers(newNumbers);
                }}
                type="number"
              />
            ))}
          </div>

          {result.gcd > 0 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Result</h2>
                <div className="text-3xl font-bold text-indigo-600">
                  GCD = {result.gcd}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Solution</h2>
                <div className="space-y-3">
                  {result.steps.map((step, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-mono text-gray-600">
                        {step.numbers.join(', ')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {step.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Prime Factorizations</h2>
                <div className="grid gap-4">
                  {result.factors.map((factor, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">
                        {factor.number} = {factor.primeFactors.join(' × ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Properties</h2>
                  <div className="space-y-3">
                    {result.properties.map((prop, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">{prop.category}</div>
                        <div className="text-sm text-gray-600">{prop.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Applications</h2>
                  <div className="space-y-3">
                    {result.applications.map((app, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">{app.field}</div>
                        <div className="text-sm text-gray-600">{app.example}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding GCD</h2>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                The Greatest Common Divisor (GCD) of two or more numbers is the largest positive integer 
                that divides each of them without leaving a remainder. It's also known as the Greatest 
                Common Factor (GCF) or Highest Common Factor (HCF).
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Concepts</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>GCD is always positive</li>
                    <li>GCD(a,b) ≤ min(|a|, |b|)</li>
                    <li>If GCD(a,b) = 1, a and b are coprime</li>
                    <li>GCD can be found using prime factorization</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Uses</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Simplifying fractions</li>
                    <li>Solving Diophantine equations</li>
                    <li>Cryptography algorithms</li>
                    <li>Computer graphics scaling</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Euclidean Algorithm</h3>
                <p className="text-gray-600">
                  This calculator uses the Euclidean algorithm, which is based on the principle that the 
                  GCD of two numbers also divides their difference. It's one of the oldest algorithms 
                  still in use today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}