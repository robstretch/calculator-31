import React, { useState } from 'react';
import { Trees, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateMulch, MulchArea } from '../../utils/calculators/mulch';
import { formatNumber, formatCurrency } from '../../utils/format';

export function MulchCalculator() {
  const [areas, setAreas] = useState<MulchArea[]>([
    { length: 10, width: 10, depth: 3, shape: 'rectangular' }
  ]);

  const addArea = () => {
    setAreas([...areas, { length: 10, width: 10, depth: 3, shape: 'rectangular' }]);
  };

  const removeArea = (index: number) => {
    setAreas(areas.filter((_, i) => i !== index));
  };

  const updateArea = (index: number, field: keyof MulchArea, value: string | 'rectangular' | 'circular') => {
    const newAreas = [...areas];
    if (field === 'shape') {
      newAreas[index].shape = value as 'rectangular' | 'circular';
    } else {
      newAreas[index][field] = parseFloat(value as string) || 0;
    }
    setAreas(newAreas);
  };

  const results = calculateMulch(areas);

  return (
    <CalculatorLayout
      title="Mulch Calculator"
      description="Calculate mulch needed for your landscaping projects"
      icon={<Trees />}
    >
      <SEO
        title="Mulch Calculator | Landscaping Material Calculator"
        description="Calculate mulch needed for your landscaping projects. Free mulch calculator with coverage and cost estimates."
        keywords={[
          'mulch calculator',
          'landscaping calculator',
          'garden calculator',
          'mulch coverage calculator',
          'yard material calculator',
          'landscaping material calculator'
        ]}
        canonicalUrl="/mulch-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Areas to Mulch</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="space-y-4">
            <CalculatorResult
              label="Total Coverage"
              value={`${formatNumber(results.coverage)} square feet`}
              helpText="Total area that will be covered"
            />

            <CalculatorResult
              label="Mulch Needed (Cubic Yards)"
              value={formatNumber(results.cubicYards)}
              helpText="Order this amount for bulk delivery"
            />

            <CalculatorResult
              label="Mulch Needed (Cubic Feet)"
              value={formatNumber(results.cubicFeet)}
              helpText="Total volume needed"
            />

            <CalculatorResult
              label="Number of Bags Needed"
              value={results.bags.toString()}
              helpText="Standard 2 cubic feet bags"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Estimated Cost:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bulk Delivery:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.bulk)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bagged Mulch:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.bagged)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mulch Coverage Guide</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommended Depths</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Flower beds: 2-3 inches</li>
                <li>• Trees and shrubs: 3-4 inches</li>
                <li>• Slopes: 2-4 inches</li>
                <li>• Vegetable gardens: 2-3 inches</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits of Mulching</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Retains soil moisture</li>
                <li>• Suppresses weed growth</li>
                <li>• Regulates soil temperature</li>
                <li>• Improves soil quality</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mulch Types and Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Organic Mulch</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Wood chips</li>
                <li>• Bark mulch</li>
                <li>• Pine needles</li>
                <li>• Straw</li>
                <li>• Leaves</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Inorganic Mulch</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Gravel</li>
                <li>• River rock</li>
                <li>• Landscape fabric</li>
                <li>• Rubber mulch</li>
                <li>• Plastic sheeting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Application Tips</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Remove old mulch first</li>
                <li>• Keep away from stems</li>
                <li>• Apply when soil is moist</li>
                <li>• Maintain proper depth</li>
                <li>• Edge beds properly</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}