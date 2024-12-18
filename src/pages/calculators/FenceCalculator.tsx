import React, { useState } from 'react';
import { Construction, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateFence } from '../../utils/calculators/fence/calculate';
import { FenceSection } from '../../utils/calculators/fence/types';
import { formatNumber, formatCurrency } from '../../utils/format';

export function FenceCalculator() {
  const [sections, setSections] = useState<FenceSection[]>([
    { length: 50, height: 6 }
  ]);

  const addSection = () => {
    setSections([...sections, { length: 50, height: 6 }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: keyof FenceSection, value: string) => {
    const newSections = [...sections];
    newSections[index] = {
      ...newSections[index],
      [field]: parseFloat(value) || 0
    };
    setSections(newSections);
  };

  const results = calculateFence(sections);

  return (
    <CalculatorLayout
      title="Fence Calculator"
      description="Calculate fence materials and costs"
      icon={<Construction />}
    >
      <SEO
        title="Fence Calculator | Fencing Material Calculator"
        description="Calculate fence materials, costs, and requirements for your project. Free fence calculator with detailed material breakdowns."
        keywords={[
          'fence calculator',
          'fencing calculator',
          'fence material calculator',
          'fence cost calculator',
          'fence estimator',
          'construction calculator'
        ]}
        canonicalUrl="/fence-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Fence Sections</h2>
              <button
                onClick={addSection}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Section
              </button>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Section {index + 1}</h3>
                  {sections.length > 1 && (
                    <button
                      onClick={() => removeSection(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <CalculatorInput
                  label="Length (feet)"
                  value={section.length.toString()}
                  onChange={(value) => updateSection(index, 'length', value)}
                  min={0}
                  step={0.5}
                />

                <CalculatorInput
                  label="Height (feet)"
                  value={section.height.toString()}
                  onChange={(value) => updateSection(index, 'height', value)}
                  min={0}
                  step={0.5}
                />

                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!section.gateWidth}
                      onChange={(e) => updateSection(index, 'gateWidth', e.target.checked ? '4' : '0')}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Include Gate</span>
                  </label>
                  {section.gateWidth && (
                    <CalculatorInput
                      label="Gate Width (feet)"
                      value={section.gateWidth.toString()}
                      onChange={(value) => updateSection(index, 'gateWidth', value)}
                      min={3}
                      max={16}
                      step={0.5}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Materials Needed</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.totalLength)} ft
              </div>
              <div className="text-gray-500">Total Fence Length</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Posts Needed"
              value={results.postCount}
              helpText="4x4 pressure-treated posts"
            />

            <CalculatorResult
              label="Rails Needed"
              value={results.railCount}
              helpText="2x4 horizontal rails"
            />

            <CalculatorResult
              label="Pickets Needed"
              value={results.picketCount}
              helpText="Vertical fence pickets"
            />

            {results.gateCount > 0 && (
              <CalculatorResult
                label="Gates"
                value={results.gateCount}
                helpText="Including hardware"
              />
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Materials List:</h3>
              <div className="space-y-3">
                {results.materials.map((material, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{material.type}:</span>
                    <span className="font-medium">{material.amount} {material.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Estimated Costs:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Materials:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.materials)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hardware:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.hardware)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fence Construction Basics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Components</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Posts: Main support structure</li>
                <li>• Rails: Horizontal support members</li>
                <li>• Pickets: Vertical boards</li>
                <li>• Gates: Access points</li>
                <li>• Hardware: Fasteners and hinges</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Check property lines</li>
                <li>• Locate utilities</li>
                <li>• Review local codes</li>
                <li>• Consider drainage</li>
                <li>• Plan for gates</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Post Installation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Dig proper depth</li>
                <li>• Use concrete footings</li>
                <li>• Check for plumb</li>
                <li>• Space correctly</li>
                <li>• Allow concrete to cure</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Rail Mounting</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Level installation</li>
                <li>• Proper fasteners</li>
                <li>• Correct spacing</li>
                <li>• Support blocking</li>
                <li>• Weather protection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Finishing</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Seal all cuts</li>
                <li>• Apply preservative</li>
                <li>• Paint or stain</li>
                <li>• Install caps</li>
                <li>• Regular maintenance</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}