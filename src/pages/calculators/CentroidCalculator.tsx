import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateCentroid } from '../../utils/calculators/centroid/calculate';
import { Shape } from '../../utils/calculators/centroid/types';

export function CentroidCalculator() {
  const [shape, setShape] = useState<Shape>({
    type: 'rectangle',
    width: 10,
    height: 5
  });

  const result = calculateCentroid(shape);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Centroid Calculator | Center of Mass Calculator"
        description="Calculate the centroid (geometric center) of various shapes. Free online calculator for finding centers of mass and geometric centers."
        keywords={[
          'centroid calculator',
          'center of mass',
          'geometric center',
          'shape calculator',
          'physics calculator',
          'engineering calculator'
        ]}
        canonicalUrl="/centroid-calculator"
      />

      <CalculatorLayout
        title="Centroid Calculator"
        description="Calculate the centroid and geometric properties of various shapes"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid gap-4">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={shape.type}
              onChange={(e) => setShape({ type: e.target.value as Shape['type'] })}
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="triangle">Triangle</option>
            </select>

            {shape.type === 'rectangle' && (
              <>
                <CalculatorInput
                  label="Width"
                  value={shape.width || 0}
                  onChange={(value) => setShape({ ...shape, width: parseFloat(value) })}
                />
                <CalculatorInput
                  label="Height"
                  value={shape.height || 0}
                  onChange={(value) => setShape({ ...shape, height: parseFloat(value) })}
                />
              </>
            )}

            {shape.type === 'circle' && (
              <CalculatorInput
                label="Radius"
                value={shape.radius || 0}
                onChange={(value) => setShape({ ...shape, radius: parseFloat(value) })}
              />
            )}
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Centroid X"
              value={result.centroid.x.toFixed(2)}
            />
            <CalculatorResult
              label="Centroid Y"
              value={result.centroid.y.toFixed(2)}
            />
            <CalculatorResult
              label="Area"
              value={result.area.toFixed(2)}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Calculations</h3>
            <div className="space-y-2">
              {result.calculations.map((calc, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{calc.step}</span>
                  <span className="font-mono">{calc.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}