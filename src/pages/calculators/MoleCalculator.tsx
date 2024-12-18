import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateMole } from '../../utils/calculators/mole/calculate';
import type { MoleInput } from '../../utils/calculators/mole/types';

export function MoleCalculator() {
  const [inputs, setInputs] = useState<MoleInput>({
    value: 1,
    molarMass: 18.015, // Default to water
    volume: 1,
    calculationType: 'moles-to-grams'
  });

  const result = calculateMole(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Mole Calculator | Chemistry Conversion Tool"
        description="Calculate moles, grams, and molarity with this chemistry calculator. Convert between mass and moles, calculate solution concentrations."
        keywords={[
          'mole calculator',
          'chemistry calculator',
          'molarity calculator',
          'molar mass',
          'stoichiometry',
          'solution concentration'
        ]}
        canonicalUrl="/mole-calculator"
      />

      <CalculatorLayout
        title="Mole Calculator"
        description="Convert between moles, grams, and calculate solution concentrations."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calculation Type
              </label>
              <select
                value={inputs.calculationType}
                onChange={(e) => setInputs({ ...inputs, calculationType: e.target.value as MoleInput['calculationType'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="moles-to-grams">Moles to Grams</option>
                <option value="grams-to-moles">Grams to Moles</option>
                <option value="molarity">Calculate Molarity</option>
              </select>
            </div>

            <CalculatorInput
              label={inputs.calculationType === 'grams-to-moles' ? 'Mass (g)' : 'Moles (mol)'}
              value={inputs.value}
              onChange={(value) => setInputs({ ...inputs, value: parseFloat(value) })}
              min={0}
            />

            <CalculatorInput
              label="Molar Mass (g/mol)"
              value={inputs.molarMass}
              onChange={(value) => setInputs({ ...inputs, molarMass: parseFloat(value) })}
              min={0}
            />

            {inputs.calculationType === 'molarity' && (
              <CalculatorInput
                label="Volume (L)"
                value={inputs.volume}
                onChange={(value) => setInputs({ ...inputs, volume: parseFloat(value) })}
                min={0}
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label={inputs.calculationType === 'moles-to-grams' ? 'Mass' : 
                       inputs.calculationType === 'grams-to-moles' ? 'Moles' : 'Molarity'}
                value={`${result.result.toFixed(4)} ${
                  inputs.calculationType === 'moles-to-grams' ? 'g' :
                  inputs.calculationType === 'grams-to-moles' ? 'mol' : 'M'
                }`}
                helpText="Calculated result"
              />

              {result.conversions.moles && (
                <CalculatorResult
                  label="Moles"
                  value={`${result.conversions.moles.toFixed(4)} mol`}
                  helpText="Amount in moles"
                />
              )}

              {result.conversions.grams && (
                <CalculatorResult
                  label="Mass"
                  value={`${result.conversions.grams.toFixed(4)} g`}
                  helpText="Mass in grams"
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Steps</h3>
            <div className="space-y-2">
              {result.steps.map((step, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="font-medium text-gray-700">{step.step}</div>
                  <div className="text-gray-600">
                    <code className="bg-gray-100 px-2 py-1 rounded">{step.formula}</code>
                  </div>
                  <div className="text-gray-600">Result: {step.value.toFixed(4)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="font-medium text-gray-700">{rec.category}:</div>
                  <div className="text-gray-600">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}