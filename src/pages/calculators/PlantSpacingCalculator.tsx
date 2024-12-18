import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculatePlantSpacing } from '../../utils/calculators/plantSpacing/calculate';
import type { PlantSpacingInput } from '../../utils/calculators/plantSpacing/types';

export function PlantSpacingCalculator() {
  const [inputs, setInputs] = useState<PlantSpacingInput>({
    plotLength: 20,
    plotWidth: 10,
    plantSpacing: 2,
    rowSpacing: 3,
    unit: 'feet'
  });

  const result = calculatePlantSpacing(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Plant Spacing Calculator | Garden Planning Tool"
        description="Calculate optimal plant spacing, row spacing, and total plants for your garden plot. Get recommendations for different planting patterns and spacing requirements."
        keywords={[
          'plant spacing calculator',
          'garden planning',
          'row spacing',
          'plant layout',
          'garden design',
          'plant density'
        ]}
        canonicalUrl="/plant-spacing-calculator"
      />

      <CalculatorLayout
        title="Plant Spacing Calculator"
        description="Calculate optimal plant spacing and layout for your garden plot."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Plot Length"
              value={inputs.plotLength}
              onChange={(value) => setInputs({ ...inputs, plotLength: parseFloat(value) })}
              min={1}
            />
            <CalculatorInput
              label="Plot Width"
              value={inputs.plotWidth}
              onChange={(value) => setInputs({ ...inputs, plotWidth: parseFloat(value) })}
              min={1}
            />
            <CalculatorInput
              label="Plant Spacing"
              value={inputs.plantSpacing}
              onChange={(value) => setInputs({ ...inputs, plantSpacing: parseFloat(value) })}
              min={0.1}
            />
            <CalculatorInput
              label="Row Spacing"
              value={inputs.rowSpacing}
              onChange={(value) => setInputs({ ...inputs, rowSpacing: parseFloat(value) })}
              min={0.1}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalculatorResult
                label="Total Plants"
                value={result.totalPlants}
                helpText="Maximum number of plants for your plot"
              />
              <CalculatorResult
                label="Plants per Row"
                value={result.plantsPerRow}
                helpText="Number of plants in each row"
              />
              <CalculatorResult
                label="Number of Rows"
                value={result.numberOfRows}
                helpText="Total number of rows"
              />
              <CalculatorResult
                label="Space Utilization"
                value={`${Math.round(result.coverage.percentageUsed)}%`}
                helpText="Percentage of plot space utilized"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Planting Patterns</h3>
            <div className="grid gap-4">
              {result.plantingPattern.map((pattern, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{pattern.type}</div>
                    <div className="text-sm text-gray-600">{pattern.description}</div>
                  </div>
                  <div className="text-indigo-600 font-medium">
                    {pattern.efficiency}% efficient
                  </div>
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