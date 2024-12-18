import React, { useState } from 'react';
import { Construction, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateSand } from '../../utils/calculators/sand/calculate';
import { SandArea } from '../../utils/calculators/sand/types';
import { formatNumber, formatCurrency } from '../../utils/format';

export function SandCalculator() {
  const [areas, setAreas] = useState<SandArea[]>([
    { length: 20, width: 20, depth: 2, shape: 'rectangular' }
  ]);

  const addArea = () => {
    setAreas([...areas, { length: 20, width: 20, depth: 2, shape: 'rectangular' }]);
  };

  const removeArea = (index: number) => {
    setAreas(areas.filter((_, i) => i !== index));
  };

  const updateArea = (index: number, field: keyof SandArea, value: string | 'rectangular' | 'circular') => {
    const newAreas = [...areas];
    if (field === 'shape') {
      newAreas[index].shape = value as 'rectangular' | 'circular';
    } else {
      newAreas[index][field] = parseFloat(value as string) || 0;
    }
    setAreas(newAreas);
  };

  const results = calculateSand(areas);

  return (
    <CalculatorLayout
      title="Sand Calculator"
      description="Calculate sand needed for your project"
      icon={<Construction />}
    >
      <SEO
        title="Sand Calculator | Sand Coverage Calculator"
        description="Calculate sand needed for your landscaping or construction project. Free sand calculator with material and cost estimates."
        keywords={[
          'sand calculator',
          'sand coverage calculator',
          'masonry sand calculator',
          'landscaping calculator',
          'construction calculator',
          'material estimator'
        ]}
        canonicalUrl="/sand-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Areas to Cover</h2>
              <button
                onClick={addArea}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Area
              </button>
            </div>

            {areas.map((area, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Area {index + 1}</h3>
                  {areas.length > 1 && (
                    <button
                      onClick={() => removeArea(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area Shape</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['rectangular', 'circular'] as const).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => updateArea(index, 'shape', shape)}
                        className={`px-4 py-2 rounded-md ${
                          area.shape === shape
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {shape.charAt(0).toUpperCase() + shape.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <CalculatorInput
                  label={area.shape === 'circular' ? 'Diameter (feet)' : 'Length (feet)'}
                  value={area.length.toString()}
                  onChange={(value) => updateArea(index, 'length', value)}
                  min={0}
                  step={0.1}
                />

                {area.shape === 'rectangular' && (
                  <CalculatorInput
                    label="Width (feet)"
                    value={area.width.toString()}
                    onChange={(value) => updateArea(index, 'width', value)}
                    min={0}
                    step={0.1}
                  />
                )}

                <CalculatorInput
                  label="Depth (inches)"
                  value={area.depth.toString()}
                  onChange={(value) => updateArea(index, 'depth', value)}
                  min={0}
                  step={0.5}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Materials Needed</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.tons)} tons
              </div>
              <div className="text-gray-500">Total Sand Needed</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Cubic Yards"
              value={formatNumber(results.cubicYards)}
              helpText="Volume in cubic yards"
            />

            <CalculatorResult
              label="Cubic Feet"
              value={formatNumber(results.cubicFeet)}
              helpText="Volume in cubic feet"
            />

            <CalculatorResult
              label="Coverage Area"
              value={`${formatNumber(results.coverage)} sq ft`}
              helpText="Total area covered"
            />

            <CalculatorResult
              label="50lb Bags Needed"
              value={results.bagsNeeded.toString()}
              helpText="If purchasing bagged sand"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Estimated Costs:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bulk Sand:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.bulk)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bagged Sand:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.bagged)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.delivery)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Best Option Total:</span>
                    <span>{formatCurrency(results.estimatedCost.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Recommendations:</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Sand Types</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Types</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Mason Sand: Fine, uniform particles</li>
                <li>• Concrete Sand: Coarse, sharp particles</li>
                <li>• Play Sand: Clean, screened fine sand</li>
                <li>• Fill Sand: General purpose</li>
                <li>• Beach Sand: Soft, fine particles</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Applications</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Paver base: 1-inch depth</li>
                <li>• Sandbox: 12-inch depth</li>
                <li>• Pool base: 2-inch depth</li>
                <li>• Concrete mix: Varies</li>
                <li>• Landscaping: 2-4 inch depth</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Preparation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Clear area thoroughly</li>
                <li>• Level the surface</li>
                <li>• Install edging</li>
                <li>• Add landscape fabric</li>
                <li>• Plan for drainage</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Installation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Spread evenly</li>
                <li>• Compact layers</li>
                <li>• Check levels</li>
                <li>• Water lightly</li>
                <li>• Final grading</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Maintenance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular raking</li>
                <li>• Weed control</li>
                <li>• Top up as needed</li>
                <li>• Edge maintenance</li>
                <li>• Drainage checks</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}