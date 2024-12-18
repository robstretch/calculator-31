import React, { useState } from 'react';
import { Construction } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateTopsoil } from '../../utils/calculators/topsoil/calculate';
import { TopsoilArea } from '../../utils/calculators/topsoil/types';

export function TopsoilCalculator() {
  const [areas, setAreas] = useState<TopsoilArea[]>([{
    length: 20,
    width: 10,
    depth: 4,
    shape: 'rectangular'
  }]);

  const result = calculateTopsoil(areas);

  const handleAreaChange = (index: number, field: keyof TopsoilArea, value: string) => {
    const newAreas = [...areas];
    if (field === 'shape') {
      newAreas[index] = { ...newAreas[index], [field]: value };
    } else {
      newAreas[index] = { ...newAreas[index], [field]: parseFloat(value) || 0 };
    }
    setAreas(newAreas);
  };

  const addArea = () => {
    setAreas([...areas, { length: 0, width: 0, depth: 4, shape: 'rectangular' }]);
  };

  const removeArea = (index: number) => {
    setAreas(areas.filter((_, i) => i !== index));
  };

  return (
    <div>
      <SEO
        title="Topsoil Calculator | Calculate Soil Needed for Landscaping"
        description="Calculate the amount of topsoil needed for your landscaping project. Get accurate measurements in cubic yards and tons, plus cost estimates and recommendations."
        keywords={[
          'topsoil calculator',
          'soil calculator',
          'landscaping calculator',
          'yard calculator',
          'garden soil calculator',
          'cubic yards calculator'
        ]}
        canonicalUrl="/topsoil-calculator"
      />

      <CalculatorLayout
        title="Topsoil Calculator"
        description="Calculate the amount of topsoil needed for your landscaping project"
        icon={<Construction />}
      >
        <div className="space-y-6">
          {areas.map((area, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Area {index + 1}</h3>
                {areas.length > 1 && (
                  <button
                    onClick={() => removeArea(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shape
                  </label>
                  <select
                    value={area.shape}
                    onChange={(e) => handleAreaChange(index, 'shape', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="rectangular">Rectangular</option>
                    <option value="circular">Circular</option>
                  </select>
                </div>

                <CalculatorInput
                  label={area.shape === 'circular' ? 'Diameter (ft)' : 'Length (ft)'}
                  value={area.length}
                  onChange={(value) => handleAreaChange(index, 'length', value)}
                  min={0}
                />

                {area.shape === 'rectangular' && (
                  <CalculatorInput
                    label="Width (ft)"
                    value={area.width}
                    onChange={(value) => handleAreaChange(index, 'width', value)}
                    min={0}
                  />
                )}

                <CalculatorInput
                  label="Depth (inches)"
                  value={area.depth}
                  onChange={(value) => handleAreaChange(index, 'depth', value)}
                  min={0}
                />

                <CalculatorInput
                  label="Slope (%)"
                  value={area.slopePercent || 0}
                  onChange={(value) => handleAreaChange(index, 'slopePercent', value)}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addArea}
            className="w-full px-4 py-2 text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
          >
            Add Another Area
          </button>

          <div className="mt-8 space-y-4">
            <CalculatorResult
              label="Total Volume Needed"
              value={`${result.cubicYards} cubic yards (${result.cubicFeet} cubic feet)`}
              helpText="Total volume of topsoil required"
            />

            <CalculatorResult
              label="Weight"
              value={`${result.tons} tons`}
              helpText="Approximate weight of soil needed"
            />

            <CalculatorResult
              label="Coverage Area"
              value={`${result.coverage} sq ft`}
              helpText="Total area coverage at specified depth"
            />

            <CalculatorResult
              label="Estimated Cost"
              value={`$${result.estimatedCost.total}`}
              helpText={`Bulk: $${result.estimatedCost.bulk} | Delivery: $${result.estimatedCost.delivery}`}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Soil Type Recommendations</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {result.soilTypes.map((type, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">{type.type}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.description}</p>
                  <div className="text-sm text-gray-500">
                    <strong>Best for:</strong>
                    <ul className="list-disc list-inside">
                      {type.bestFor.map((use, i) => (
                        <li key={i}>{use}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Installation Tips</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">{rec.category}</h4>
                  <p className="text-gray-600 text-sm">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}