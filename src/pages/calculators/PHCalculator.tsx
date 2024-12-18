import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculatePH } from '../../utils/calculators/ph/calculate';

export function PHCalculator() {
  const [concentration, setConcentration] = useState('0.1');
  const [unit, setUnit] = useState<'mol/L' | 'g/L'>('mol/L');
  const [temperature, setTemperature] = useState('25');

  const result = calculatePH({
    concentration: parseFloat(concentration),
    unit,
    temperature: parseFloat(temperature)
  });

  return (
    <>
      <SEO 
        title="pH Calculator | Calculate Solution pH and Ion Concentrations"
        description="Calculate pH, pOH, and ion concentrations for chemical solutions. Free online pH calculator with temperature correction and solution properties."
        keywords={[
          'pH calculator',
          'pOH calculator',
          'acid base calculator',
          'hydrogen ion concentration',
          'hydroxide ion concentration'
        ]}
        canonicalUrl="/ph-calculator"
      />

      <CalculatorLayout
        title="pH Calculator"
        description="Calculate pH, pOH, and ion concentrations for chemical solutions"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CalculatorInput
                label="Concentration"
                value={concentration}
                onChange={setConcentration}
                type="number"
                min="0"
                step="0.000001"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'mol/L' | 'g/L')}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="mol/L">mol/L</option>
                <option value="g/L">g/L</option>
              </select>
            </div>
            <CalculatorInput
              label="Temperature (°C)"
              value={temperature}
              onChange={setTemperature}
              type="number"
              min="-273.15"
              step="0.1"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">pH</p>
                <p className="text-2xl font-bold text-indigo-600">{result.pH}</p>
              </div>
              <div>
                <p className="text-gray-600">pOH</p>
                <p className="text-2xl font-bold text-indigo-600">{result.pOH}</p>
              </div>
              <div>
                <p className="text-gray-600">Classification</p>
                <p className="text-lg font-semibold">{result.classification}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Properties</h2>
            <div className="space-y-4">
              {result.properties.map((prop, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{prop.metric}</p>
                    <p className="text-sm text-gray-600">{prop.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono">{prop.value.toExponential(3)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Safety Recommendations</h2>
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