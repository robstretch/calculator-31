import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateMidpoint } from '../../utils/calculators/midpoint/calculate';
import { Point } from '../../utils/calculators/midpoint/types';

export function MidpointCalculator() {
  const [point1, setPoint1] = useState<Point>({ x: 0, y: 0 });
  const [point2, setPoint2] = useState<Point>({ x: 0, y: 0 });
  const [use3D, setUse3D] = useState(false);

  const result = calculateMidpoint(point1, point2);

  return (
    <div>
      <SEO
        title="Midpoint Calculator | Calculate Point Between Coordinates"
        description="Calculate the midpoint between two points in 2D or 3D space. Find distance, slope, and see step-by-step calculations."
        keywords={[
          'midpoint calculator',
          'coordinate calculator',
          'distance calculator',
          'slope calculator',
          'geometry calculator',
          'math calculator'
        ]}
        canonicalUrl="/midpoint-calculator"
      />

      <CalculatorLayout
        title="Midpoint Calculator"
        description="Calculate the midpoint between two points and related measurements"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="flex justify-end">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={use3D}
                onChange={(e) => setUse3D(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Use 3D coordinates</span>
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Point 1</h3>
              <div className="space-y-4">
                <CalculatorInput
                  label="X₁"
                  value={point1.x}
                  onChange={(value) => setPoint1({ ...point1, x: parseFloat(value) || 0 })}
                />
                <CalculatorInput
                  label="Y₁"
                  value={point1.y}
                  onChange={(value) => setPoint1({ ...point1, y: parseFloat(value) || 0 })}
                />
                {use3D && (
                  <CalculatorInput
                    label="Z₁"
                    value={point1.z || 0}
                    onChange={(value) => setPoint1({ ...point1, z: parseFloat(value) || 0 })}
                  />
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Point 2</h3>
              <div className="space-y-4">
                <CalculatorInput
                  label="X₂"
                  value={point2.x}
                  onChange={(value) => setPoint2({ ...point2, x: parseFloat(value) || 0 })}
                />
                <CalculatorInput
                  label="Y₂"
                  value={point2.y}
                  onChange={(value) => setPoint2({ ...point2, y: parseFloat(value) || 0 })}
                />
                {use3D && (
                  <CalculatorInput
                    label="Z₂"
                    value={point2.z || 0}
                    onChange={(value) => setPoint2({ ...point2, z: parseFloat(value) || 0 })}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Midpoint"
                value={use3D ? 
                  `(${result.midpoint.x}, ${result.midpoint.y}, ${result.midpoint.z})` :
                  `(${result.midpoint.x}, ${result.midpoint.y})`}
                helpText="Coordinates of the point exactly between the two given points"
              />
              <CalculatorResult
                label="Distance"
                value={`${result.distance.toFixed(4)} units`}
                helpText="Distance between the two points"
              />
              {result.slope !== undefined && (
                <CalculatorResult
                  label="Slope"
                  value={result.slope.toFixed(4)}
                  helpText="Rate of change between the points"
                />
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Step-by-Step Solution</h3>
            <div className="space-y-4">
              {result.calculations.map((step, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-700">{step.step}</h4>
                  <p className="text-sm text-gray-500 mt-1">Formula: {step.formula}</p>
                  <p className="text-sm text-gray-900 mt-1">Result: {step.result}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Understanding Midpoint Formula</h3>
            <div className="prose max-w-none">
              <p>
                The midpoint formula finds the point exactly halfway between two given points. For two points (x₁, y₁) and (x₂, y₂), the midpoint is calculated as:
              </p>
              <ul>
                <li>x-coordinate: (x₁ + x₂) ÷ 2</li>
                <li>y-coordinate: (y₁ + y₂) ÷ 2</li>
                {use3D && <li>z-coordinate: (z₁ + z₂) ÷ 2</li>}
              </ul>
              <p>
                The distance between points is calculated using the distance formula:
                √[(x₂ - x₁)² + (y₂ - y₁)² {use3D ? '+ (z₂ - z₁)²' : ''}]
              </p>
              {!use3D && (
                <p>
                  The slope between points is calculated as: (y₂ - y₁) ÷ (x₂ - x₁)
                </p>
              )}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}