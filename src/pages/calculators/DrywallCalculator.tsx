import React, { useState } from 'react';
import { Construction, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateDrywall } from '../../utils/calculators/drywall';
import { formatNumber, formatCurrency } from '../../utils/format';

export function DrywallCalculator() {
  const [dimensions, setDimensions] = useState({
    length: 20,
    width: 15,
    height: 8
  });

  const [openings, setOpenings] = useState<{ width: number; height: number; }[]>([
    { width: 3, height: 7 }  // Default door opening
  ]);

  const addOpening = () => {
    setOpenings([...openings, { width: 3, height: 3 }]);
  };

  const removeOpening = (index: number) => {
    setOpenings(openings.filter((_, i) => i !== index));
  };

  const updateOpening = (index: number, field: 'width' | 'height', value: string) => {
    const newOpenings = [...openings];
    newOpenings[index][field] = parseFloat(value) || 0;
    setOpenings(newOpenings);
  };

  const results = calculateDrywall(
    dimensions.length,
    dimensions.width,
    dimensions.height,
    openings
  );

  return (
    <CalculatorLayout
      title="Drywall Calculator"
      description="Calculate drywall materials needed"
      icon={<Construction />}
    >
      <SEO
        title="Drywall Calculator | Sheetrock Material Calculator"
        description="Calculate drywall materials needed for your construction project. Free drywall calculator with material and cost estimates."
        keywords={[
          'drywall calculator',
          'sheetrock calculator',
          'gypsum board calculator',
          'wall material calculator',
          'construction calculator',
          'drywall material estimator'
        ]}
        canonicalUrl="/drywall-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Room Dimensions</h2>
          
          <CalculatorInput
            label="Room Length (feet)"
            value={dimensions.length.toString()}
            onChange={(value) => setDimensions({ ...dimensions, length: parseFloat(value) || 0 })}
            min={0}
            step={0.5}
            placeholder="Enter room length"
          />
          
          <CalculatorInput
            label="Room Width (feet)"
            value={dimensions.width.toString()}
            onChange={(value) => setDimensions({ ...dimensions, width: parseFloat(value) || 0 })}
            min={0}
            step={0.5}
            placeholder="Enter room width"
          />
          
          <CalculatorInput
            label="Ceiling Height (feet)"
            value={dimensions.height.toString()}
            onChange={(value) => setDimensions({ ...dimensions, height: parseFloat(value) || 0 })}
            min={0}
            step={0.5}
            placeholder="Enter ceiling height"
          />

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Openings (Doors/Windows)</h3>
              <button
                onClick={addOpening}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Opening
              </button>
            </div>

            {openings.map((opening, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Opening {index + 1}</h4>
                  <button
                    onClick={() => removeOpening(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CalculatorInput
                    label="Width (feet)"
                    value={opening.width.toString()}
                    onChange={(value) => updateOpening(index, 'width', value)}
                    min={0}
                    step={0.5}
                  />
                  <CalculatorInput
                    label="Height (feet)"
                    value={opening.height.toString()}
                    onChange={(value) => updateOpening(index, 'height', value)}
                    min={0}
                    step={0.5}
                  />
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
                {results.sheets} sheets
              </div>
              <div className="text-gray-500">Total Drywall Sheets</div>
              <div className="text-sm text-gray-400 mt-1">
                Coverage: {formatNumber(results.coverage.totalArea)} sq ft
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Drywall Screws"
              value={`${formatNumber(results.screws)} screws`}
              helpText="Standard drywall screws needed"
            />
            
            <CalculatorResult
              label="Joint Tape"
              value={`${formatNumber(results.joint.tape)} feet`}
              helpText="Paper tape for joints and corners"
            />
            
            <CalculatorResult
              label="Joint Compound"
              value={`${formatNumber(results.joint.compound)} lbs`}
              helpText="All-purpose joint compound"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Estimated Costs:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Drywall Sheets:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.sheets)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Screws:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.screws)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joint Tape:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.tape)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joint Compound:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.compound)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{formatCurrency(results.estimatedCost.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Drywall Installation Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Preparation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Measure walls accurately</li>
                <li>• Check for level surfaces</li>
                <li>• Mark stud locations</li>
                <li>• Plan sheet layout</li>
                <li>• Gather proper tools</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Installation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Start with ceiling</li>
                <li>• Use proper screw spacing</li>
                <li>• Stagger joints</li>
                <li>• Leave 1/2" gap at floor</li>
                <li>• Use corner beads</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Drywall Types</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Standard (1/2")</li>
                <li>• Moisture resistant</li>
                <li>• Fire resistant</li>
                <li>• Soundproof</li>
                <li>• Ceiling specific</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tools Needed</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Utility knife</li>
                <li>• T-square</li>
                <li>• Screw gun</li>
                <li>• Tape measure</li>
                <li>• Joint knives</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Safety</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Dust mask</li>
                <li>• Safety glasses</li>
                <li>• Work gloves</li>
                <li>• Proper lifting</li>
                <li>• Ventilation</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}