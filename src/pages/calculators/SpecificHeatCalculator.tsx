import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateSpecificHeat } from '../../utils/calculators/specificHeat/calculate';

export function SpecificHeatCalculator() {
  const [input, setInput] = useState({
    mass: 100,
    initialTemp: 20,
    finalTemp: 80,
    material: 'water',
    unit: 'metric'
  });

  const result = calculateSpecificHeat(input);

  return (
    <>
      <SEO 
        title="Specific Heat Calculator | Heat Energy & Capacity"
        description="Calculate specific heat, heat energy, and thermal properties of materials. Free online calculator for physics and engineering applications."
        keywords={[
          'specific heat calculator',
          'heat capacity',
          'thermal energy',
          'physics calculator',
          'engineering calculator'
        ]}
      />

      <CalculatorLayout
        title="Specific Heat Calculator"
        description="Calculate heat energy and thermal properties of materials"
        icon={<Calculator />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <select
                value={input.material}
                onChange={(e) => setInput(prev => ({ ...prev, material: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="water">Water</option>
                <option value="aluminum">Aluminum</option>
                <option value="copper">Copper</option>
                <option value="iron">Iron</option>
                <option value="glass">Glass</option>
                <option value="wood">Wood</option>
                <option value="steel">Steel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Units
              </label>
              <select
                value={input.unit}
                onChange={(e) => setInput(prev => ({ ...prev, unit: e.target.value as 'metric' | 'imperial' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="metric">Metric (g, °C)</option>
                <option value="imperial">Imperial (lb, °F)</option>
              </select>
            </div>

            <CalculatorInput
              label="Mass"
              value={input.mass}
              onChange={(value) => setInput(prev => ({ ...prev, mass: parseFloat(value) || 0 }))}
              min={0}
              step={1}
            />

            <CalculatorInput
              label="Initial Temperature"
              value={input.initialTemp}
              onChange={(value) => setInput(prev => ({ ...prev, initialTemp: parseFloat(value) || 0 }))}
              step={0.1}
            />

            <CalculatorInput
              label="Final Temperature"
              value={input.finalTemp}
              onChange={(value) => setInput(prev => ({ ...prev, finalTemp: parseFloat(value) || 0 }))}
              step={0.1}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Heat Energy:</span>
                  <span className="font-medium">{result.heatEnergy.toFixed(2)} J</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temperature Change:</span>
                  <span className="font-medium">{result.deltaTemp.toFixed(2)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specific Heat:</span>
                  <span className="font-medium">{result.specificHeat} J/g·°C</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Conversions</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories:</span>
                  <span className="font-medium">{result.conversions.calories.toFixed(2)} cal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">BTU:</span>
                  <span className="font-medium">{result.conversions.btu.toFixed(4)} BTU</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Properties</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thermal Conductivity:</span>
                  <span className="font-medium">{result.materialProperties.conductivity} W/m·K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Density:</span>
                  <span className="font-medium">{result.materialProperties.density} kg/m³</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Steps</h3>
            <div className="space-y-4">
              {result.calculations.map((step, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{step.step}</h4>
                  <p className="text-sm text-gray-500 font-mono mt-1">{step.formula}</p>
                  <p className="text-sm text-gray-600 mt-1">{step.result}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-sm text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}