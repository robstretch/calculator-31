import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateSlope } from '../../utils/calculators/slope/calculate';
import { Point } from '../../utils/calculators/slope/types';

export function SlopeCalculator() {
  const [point1, setPoint1] = useState<Point>({ x: 0, y: 0 });
  const [point2, setPoint2] = useState<Point>({ x: 1, y: 1 });

  const result = calculateSlope(point1, point2);

  return (
    <div>
      <SEO
        title="Slope Calculator | Calculate Line Slope and Angle"
        description="Calculate slope, angle, and equation of a line between two points. Get step-by-step calculations and visualize results."
        keywords={[
          'slope calculator',
          'line slope',
          'angle calculator',
          'linear equation',
          'math calculator',
          'geometry calculator'
        ]}
        canonicalUrl="/slope-calculator"
      />

      <CalculatorLayout
        title="Slope Calculator"
        description="Calculate the slope, angle, and equation of a line between two points"
        icon={<Calculator />}
      >
        <div className="space-y-6">
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
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Slope"
                value={result.slope === undefined ? 'Undefined (vertical line)' : result.slope.toFixed(4)}
                helpText="Rise over run (Δy/Δx)"
              />
              <CalculatorResult
                label="Angle"
                value={`${result.angle?.toFixed(2)}°`}
                helpText="Angle of the line from horizontal"
              />
              <CalculatorResult
                label="Equation"
                value={result.equation}
                helpText="Line equation in slope-intercept form (y = mx + b)"
              />
              {result.perpendicular !== undefined && (
                <CalculatorResult
                  label="Perpendicular Slope"
                  value={result.perpendicular === undefined ? 'Undefined' : result.perpendicular.toFixed(4)}
                  helpText="Slope of a line perpendicular to this line"
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
            <h3 className="text-lg font-semibold mb-4">Understanding Slope</h3>
            <div className="prose max-w-none">
              <p>
                The slope of a line represents its steepness and direction. It is calculated as the change in y-coordinates (rise) divided by the change in x-coordinates (run) between two points.
              </p>
              <ul>
                <li>Positive slope: Line goes up from left to right</li>
                <li>Negative slope: Line goes down from left to right</li>
                <li>Zero slope: Horizontal line</li>
                <li>Undefined slope: Vertical line</li>
              </ul>
              <p>
                The slope-intercept form of a line equation is y = mx + b, where:
              </p>
              <ul>
                <li>m is the slope</li>
                <li>b is the y-intercept (where the line crosses the y-axis)</li>
              </ul>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}