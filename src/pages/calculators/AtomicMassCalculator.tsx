import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateAtomicMass } from '../../utils/calculators/atomicMass/calculate';
import { Element } from '../../utils/calculators/atomicMass/types';

export function AtomicMassCalculator() {
  const [elements, setElements] = useState<Element[]>([
    { symbol: 'H', mass: 1.008, count: 2 },
    { symbol: 'O', mass: 15.999, count: 1 }
  ]);

  const result = calculateAtomicMass(elements);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Atomic Mass Calculator | Molecular Weight Calculator"
        description="Calculate atomic mass, molecular weight, and empirical formulas. Free online calculator for chemistry and molecular calculations."
        keywords={[
          'atomic mass calculator',
          'molecular weight calculator',
          'molar mass',
          'empirical formula',
          'chemistry calculator'
        ]}
        canonicalUrl="/atomic-mass-calculator"
      />

      <CalculatorLayout
        title="Atomic Mass Calculator"
        description="Calculate molecular weight, empirical formulas, and composition percentages"
        icon={<Calculator />}
      >
        <div className="grid gap-6">
          {elements.map((element, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <CalculatorInput
                label="Element Symbol"
                value={element.symbol}
                onChange={(value) => {
                  const newElements = [...elements];
                  newElements[index].symbol = value;
                  setElements(newElements);
                }}
                type="text"
              />
              <CalculatorInput
                label="Atomic Mass"
                value={element.mass}
                onChange={(value) => {
                  const newElements = [...elements];
                  newElements[index].mass = parseFloat(value);
                  setElements(newElements);
                }}
              />
              <CalculatorInput
                label="Count"
                value={element.count}
                onChange={(value) => {
                  const newElements = [...elements];
                  newElements[index].count = parseInt(value);
                  setElements(newElements);
                }}
              />
            </div>
          ))}

          <button
            onClick={() => setElements([...elements, { symbol: '', mass: 0, count: 1 }])}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Element
          </button>

          <div className="space-y-4 mt-8">
            <CalculatorResult
              label="Total Molecular Mass"
              value={`${result.totalMass.toFixed(4)} g/mol`}
            />
            <CalculatorResult
              label="Empirical Formula"
              value={result.empiricalFormula}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Composition Breakdown</h3>
            <div className="space-y-2">
              {result.composition.map((comp, index) => (
                <div key={index} className="flex justify-between">
                  <span>{comp.element}</span>
                  <span>{comp.percentage.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}