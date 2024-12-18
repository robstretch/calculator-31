import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateChemistry } from '../../utils/calculators/chemistry/calculate';
import type { ChemistryInput } from '../../utils/calculators/chemistry/types';

export function ChemistryCalculator() {
  const [input, setInput] = useState<ChemistryInput>({
    type: 'molarity',
    moles: 1,
    volume: 1,
    volumeUnit: 'L'
  });

  const result = calculateChemistry(input);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Chemistry Calculator | Chemical Equations & Solutions"
        description="Calculate molarity, stoichiometry, and chemical equations with our free chemistry calculator. Get step-by-step solutions and safety information."
        keywords={[
          'chemistry calculator',
          'molarity calculator',
          'stoichiometry calculator',
          'chemical equations',
          'solution calculator',
          'concentration calculator'
        ]}
        canonicalUrl="/chemistry-calculator"
      />

      <CalculatorLayout
        title="Chemistry Calculator"
        description="Calculate chemical equations, molarity, and stoichiometry with step-by-step solutions."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Moles"
              value={input.moles || ''}
              onChange={(value) => setInput({ ...input, moles: parseFloat(value) })}
              min={0}
              step="0.1"
            />
            <CalculatorInput
              label="Volume"
              value={input.volume || ''}
              onChange={(value) => setInput({ ...input, volume: parseFloat(value) })}
              min={0}
              step="0.1"
            />
          </div>

          {result.molarity !== undefined && (
            <CalculatorResult
              label="Molarity"
              value={`${result.molarity.toFixed(3)} M`}
              helpText="Moles of solute per liter of solution"
            />
          )}

          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Safety Information</h3>
            <div className="space-y-2">
              {result.safetyInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="font-medium text-gray-700">{info.hazard}:</div>
                  <div className="text-gray-600">{info.precaution}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}