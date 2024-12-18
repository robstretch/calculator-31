import React, { useState } from 'react';
import { Ruler } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateRoofPitch } from '../../utils/calculators/roofPitch/calculate';

export function RoofPitchCalculator() {
  const [input, setInput] = useState({
    run: 12,
    rise: 6,
    unit: 'inches',
    roofWidth: 30,
    roofLength: 40
  });

  const result = calculateRoofPitch(input);

  return (
    <>
      <SEO 
        title="Roof Pitch Calculator | Calculate Roof Slope and Materials"
        description="Calculate roof pitch, slope angle, and required materials. Free calculator for roofing projects and construction planning."
        keywords={[
          'roof pitch calculator',
          'roof slope calculator',
          'roofing calculator',
          'construction calculator',
          'roof angle calculator'
        ]}
      />

      <CalculatorLayout
        title="Roof Pitch Calculator"
        description="Calculate roof pitch, slope, and material requirements"
        icon={<Ruler />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit of Measurement
              </label>
              <select
                value={input.unit}
                onChange={(e) => setInput(prev => ({ ...prev, unit: e.target.value as 'inches' | 'feet' | 'meters' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="inches">Inches</option>
                <option value="feet">Feet</option>
                <option value="meters">Meters</option>
              </select>
            </div>

            <CalculatorInput
              label="Rise"
              value={input.rise}
              onChange={(value) => setInput(prev => ({ ...prev, rise: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Run"
              value={input.run}
              onChange={(value) => setInput(prev => ({ ...prev, run: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Roof Width"
              value={input.roofWidth}
              onChange={(value) => setInput(prev => ({ ...prev, roofWidth: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Roof Length"
              value={input.roofLength}
              onChange={(value) => setInput(prev => ({ ...prev, roofLength: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pitch Measurements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Angle:</span>
                  <span className="font-medium">{result.angle}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ratio:</span>
                  <span className="font-medium">{result.ratio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Slope:</span>
                  <span className="font-medium">{result.slope}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Surface Measurements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Actual Length:</span>
                  <span className="font-medium">{result.measurements.actualLength} ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Surface Area:</span>
                  <span className="font-medium">{result.measurements.surfaceArea} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vertical Rise:</span>
                  <span className="font-medium">{result.measurements.verticalRise} ft</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Materials Required</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shingle Bundles:</span>
                  <span className="font-medium">{result.materials.shingles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Underlayment Rolls:</span>
                  <span className="font-medium">{result.materials.underlayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nails Needed:</span>
                  <span className="font-medium">{result.materials.nails}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span className="font-medium">${result.materials.estimatedCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="space-y-4">
              {result.specifications.map((spec, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{spec.metric}</h4>
                  <p className="text-sm text-gray-500 mt-1">{spec.description}</p>
                  <p className="text-sm text-gray-600 mt-1">{spec.value}</p>
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