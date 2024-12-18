import React, { useState } from 'react';
import { Cone } from 'lucide-react';
import { calculateCone } from '../../utils/calculators/cone/calculate';
import { ConeInput } from '../../utils/calculators/cone/types';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { SEO } from '../../components/SEO/SEO';

export function ConeCalculator() {
  const [inputs, setInputs] = useState<ConeInput>({
    radius: 0,
    height: 0,
    unit: 'inches',
    type: 'right'
  });
  const [result, setResult] = useState<ReturnType<typeof calculateCone>>();

  const handleCalculate = () => {
    if (inputs.radius > 0 && inputs.height > 0) {
      setResult(calculateCone(inputs));
    }
  };

  return (
    <>
      <SEO 
        title="Cone Calculator | Volume, Surface Area & Dimensions"
        description="Calculate cone volume, surface area, and dimensions with our free cone calculator. Get accurate measurements for right and oblique cones."
        keywords={[
          'cone calculator',
          'cone volume',
          'surface area',
          'slant height',
          'geometric calculator',
          '3D shapes'
        ]}
        canonicalUrl="/cone-calculator"
      />

      <CalculatorLayout
        title="Cone Calculator"
        description="Calculate volume, surface area, and dimensions of a cone"
        icon={<Cone />}
      >
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Radius</label>
                <input
                  type="number"
                  value={inputs.radius || ''}
                  onChange={(e) => setInputs({ ...inputs, radius: parseFloat(e.target.value) })}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors duration-200"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cone Height</label>
                <input
                  type="number"
                  value={inputs.height || ''}
                  onChange={(e) => setInputs({ ...inputs, height: parseFloat(e.target.value) })}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors duration-200"
                  min="0"
                  step="0.1"
                  placeholder="Enter height"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <select
                  value={inputs.unit}
                  onChange={(e) => setInputs({ ...inputs, unit: e.target.value as ConeInput['unit'] })}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors duration-200"
                >
                  <option value="inches">Inches</option>
                  <option value="feet">Feet</option>
                  <option value="meters">Meters</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cone Type</label>
                <select
                  value={inputs.type}
                  onChange={(e) => setInputs({ ...inputs, type: e.target.value as ConeInput['type'] })}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors duration-200"
                >
                  <option value="right">Right Cone</option>
                  <option value="oblique">Oblique Cone</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleCalculate}
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-md hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium text-lg shadow-md"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Volume</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Cubic {inputs.unit}</p>
                    <p className="text-2xl font-semibold text-indigo-600">
                      {inputs.unit === 'meters' ? result.volume.cubicMeters.toFixed(2) :
                       inputs.unit === 'feet' ? result.volume.cubicFeet.toFixed(2) :
                       result.volume.cubicInches.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Liters</p>
                    <p className="text-2xl font-semibold text-indigo-600">{result.volume.liters.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Surface Area</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Lateral Area</p>
                    <p className="text-2xl font-semibold text-indigo-600">{result.surfaceArea.lateral.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Base Area</p>
                    <p className="text-2xl font-semibold text-indigo-600">{result.surfaceArea.base.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Total Area</p>
                    <p className="text-2xl font-semibold text-indigo-600">{result.surfaceArea.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Dimensions</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Slant Height</p>
                    <p className="text-2xl font-semibold text-indigo-600">{result.dimensions.slantHeight.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Base Circumference</p>
                    <p className="text-2xl font-semibold text-indigo-600">{result.dimensions.baseCircumference.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Sector Angle</p>
                    <p className="text-2xl font-semibold text-indigo-600">{result.dimensions.sectorAngle.toFixed(2)}°</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Recommendations</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-indigo-900 mb-2">{rec.category}</h3>
                      <p className="text-gray-700">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="prose max-w-none mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Use the Cone Calculator</h2>
            <p>
              Our cone calculator helps you determine the volume, surface area, and other important measurements
              of a cone. Whether you're working on a geometry problem, designing a funnel, or calculating material
              needs for a construction project, this calculator provides accurate results with detailed breakdowns.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Input Parameters</h3>
            <ul>
              <li><strong>Radius:</strong> The distance from the center of the base to its edge</li>
              <li><strong>Height:</strong> The perpendicular distance from the base to the apex</li>
              <li><strong>Unit:</strong> Choose between inches, feet, or meters</li>
              <li><strong>Type:</strong> Select right cone (perpendicular apex) or oblique cone (tilted apex)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding the Results</h3>
            <p>
              The calculator provides comprehensive results including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Volume:</strong> The space inside the cone in various units</li>
              <li><strong>Surface Area:</strong> Both lateral (side) and total surface area</li>
              <li><strong>Dimensions:</strong> Including slant height and base circumference</li>
              <li><strong>Recommendations:</strong> Practical suggestions for construction or application</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Applications</h3>
            <p>
              Cone calculations are essential for various applications:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Engineering and construction projects</li>
              <li>Container and packaging design</li>
              <li>Educational geometry problems</li>
              <li>Material requirement calculations</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tips for Accurate Measurements</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Measure the radius at the widest part of the base</li>
              <li>Ensure height measurement is perpendicular to the base</li>
              <li>For oblique cones, consider the true vertical height</li>
              <li>Double-check your measurements before calculating</li>
            </ul>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}