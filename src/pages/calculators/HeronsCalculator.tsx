import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { Calculator, Ruler } from 'lucide-react';
import { calculateHerons } from '../../utils/calculators/herons/calculate';
import type { HeronsResult } from '../../utils/calculators/herons/types';

export function HeronsCalculator() {
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [result, setResult] = useState<HeronsResult | null>(null);

  const handleCalculate = () => {
    const input = {
      sideA: parseFloat(sideA),
      sideB: parseFloat(sideB),
      sideC: parseFloat(sideC)
    };

    if (!isNaN(input.sideA) && !isNaN(input.sideB) && !isNaN(input.sideC)) {
      setResult(calculateHerons(input));
    }
  };

  return (
    <>
      <SEO
        title="Heron's Formula Calculator | Triangle Area Calculator"
        description="Calculate the area of any triangle using Heron's formula when you know all three sides. Free online calculator with step-by-step solutions."
        keywords={[
          'heron formula',
          'triangle area',
          'triangle calculator',
          'geometry calculator',
          'triangle area calculator'
        ]}
        canonicalUrl="/herons-calculator"
      />

      <CalculatorLayout
        title="Heron's Formula Calculator"
        description="Calculate the area of any triangle using Heron's formula by entering the lengths of all three sides."
        icon={<Ruler />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CalculatorInput
              label="Side A"
              value={sideA}
              onChange={setSideA}
              placeholder="Enter length"
              min={0}
            />
            <CalculatorInput
              label="Side B"
              value={sideB}
              onChange={setSideB}
              placeholder="Enter length"
              min={0}
            />
            <CalculatorInput
              label="Side C"
              value={sideC}
              onChange={setSideC}
              placeholder="Enter length"
              min={0}
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Calculate Area
          </button>

          {result && (
            <div className="space-y-6">
              <CalculatorResult
                label="Triangle Area"
                value={`${result.area.toFixed(2)} square units`}
                helpText="Calculated using Heron's formula"
              />

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Step-by-Step Solution</h3>
                <div className="space-y-3">
                  {result.steps.map((step, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium">{step.step}:</p>
                      <p className="text-gray-600">{step.formula}</p>
                      <p className="text-indigo-600">{step.result.toFixed(4)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Triangle Properties</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Type:</span> {result.properties.type}</p>
                  <p><span className="font-medium">Angles:</span></p>
                  <ul className="list-disc list-inside pl-4">
                    <li>A: {result.angles.A.toFixed(1)}°</li>
                    <li>B: {result.angles.B.toFixed(1)}°</li>
                    <li>C: {result.angles.C.toFixed(1)}°</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">About Heron's Formula</h2>
          <p className="text-gray-600">
            Heron's formula (also known as Hero's formula) is used to calculate the area of a triangle when you know the lengths of all three sides. It's particularly useful when you can't easily find the height of the triangle.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Enter the length of side A</li>
            <li>Enter the length of side B</li>
            <li>Enter the length of side C</li>
            <li>Click "Calculate Area" to see the results</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">Understanding the Results</h3>
          <p className="text-gray-600">
            The calculator provides:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>The area of the triangle</li>
            <li>Step-by-step solution using Heron's formula</li>
            <li>Triangle properties including angles and type</li>
            <li>Validation of the triangle inequality theorem</li>
          </ul>

          <div className="bg-indigo-50 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-semibold text-indigo-900">The Formula</h3>
            <p className="text-indigo-800">
              A = √(s(s-a)(s-b)(s-c))
            </p>
            <p className="text-indigo-700 mt-2">
              where s = (a + b + c)/2 is the semi-perimeter of the triangle
            </p>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}