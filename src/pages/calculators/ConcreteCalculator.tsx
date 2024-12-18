import React, { useState } from 'react';
import { Construction } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateConcrete } from '../../utils/calculators/concrete';
import { formatNumber, formatCurrency } from '../../utils/format';

type CalculationType = 'slab' | 'circular' | 'cylindrical';

export function ConcreteCalculator() {
  const [type, setType] = useState<CalculationType>('slab');
  const [length, setLength] = useState('20');
  const [width, setWidth] = useState('20');
  const [diameter, setDiameter] = useState('10');
  const [height, setHeight] = useState('6');
  const [thickness, setThickness] = useState('4');
  const [pricePerYard, setPricePerYard] = useState('125');

  const dimensions = type === 'slab' 
    ? { length: parseFloat(length), width: parseFloat(width), thickness: parseFloat(thickness) }
    : type === 'circular'
    ? { diameter: parseFloat(diameter), thickness: parseFloat(thickness) }
    : { diameter: parseFloat(diameter), height: parseFloat(height), thickness: parseFloat(thickness) };

  const results = calculateConcrete(dimensions, parseFloat(pricePerYard), type);

  return (
    <CalculatorLayout
      title="Concrete Calculator"
      description="Calculate concrete volume, materials needed, and cost for your construction project"
      icon={<Construction />}
    >
      <SEO
        title="Concrete Calculator | Concrete Volume Calculator"
        description="Calculate concrete volume, materials needed, and cost estimates for your construction project. Free concrete calculator with detailed breakdowns."
        keywords={[
          'concrete calculator',
          'concrete volume calculator',
          'concrete materials calculator',
          'concrete cost calculator',
          'construction calculator',
          'building materials calculator'
        ]}
        canonicalUrl="/concrete-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'slab', label: 'Concrete Slab' },
                { value: 'circular', label: 'Circular Pad' },
                { value: 'cylindrical', label: 'Cylindrical Form' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setType(option.value as CalculationType)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    type === option.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {type === 'slab' && (
            <>
              <CalculatorInput
                label="Length (feet)"
                value={length}
                onChange={setLength}
                min={0}
                step={0.5}
                placeholder="Enter length"
              />
              <CalculatorInput
                label="Width (feet)"
                value={width}
                onChange={setWidth}
                min={0}
                step={0.5}
                placeholder="Enter width"
              />
            </>
          )}

          {(type === 'circular' || type === 'cylindrical') && (
            <CalculatorInput
              label="Diameter (feet)"
              value={diameter}
              onChange={setDiameter}
              min={0}
              step={0.5}
              placeholder="Enter diameter"
            />
          )}

          {type === 'cylindrical' && (
            <CalculatorInput
              label="Height (feet)"
              value={height}
              onChange={setHeight}
              min={0}
              step={0.5}
              placeholder="Enter height"
            />
          )}

          <CalculatorInput
            label={type === 'cylindrical' ? 'Wall Thickness (inches)' : 'Thickness (inches)'}
            value={thickness}
            onChange={setThickness}
            min={0}
            step={0.5}
            placeholder="Enter thickness"
          />

          <CalculatorInput
            label="Price per Cubic Yard ($)"
            value={pricePerYard}
            onChange={setPricePerYard}
            min={0}
            step={5}
            placeholder="Enter price per cubic yard"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Materials Needed</h2>
          
          <CalculatorResult
            label="Concrete Volume"
            value={`${formatNumber(results.cubicYards)} cubic yards`}
            helpText="Total volume of concrete needed"
          />
          <CalculatorResult
            label="80lb Concrete Bags"
            value={results.bags80lb}
            helpText="Number of 80lb bags if mixing yourself"
          />
          <CalculatorResult
            label="60lb Concrete Bags"
            value={results.bags60lb}
            helpText="Number of 60lb bags if mixing yourself"
          />
          <CalculatorResult
            label="Sand Needed"
            value={`${formatNumber(results.sand)} cubic yards`}
            helpText="Amount of sand for mixing"
          />
          <CalculatorResult
            label="Gravel Needed"
            value={`${formatNumber(results.gravel)} cubic yards`}
            helpText="Amount of gravel for mixing"
          />
          <CalculatorResult
            label="Estimated Cost"
            value={formatCurrency(results.estimatedCost)}
            helpText="Approximate cost for ready-mix concrete"
          />
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Concrete Mixtures</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Concrete is a mixture of cement, water, sand (fine aggregate), and gravel (coarse aggregate).
              The proper ratio of these materials is crucial for achieving the desired strength and durability.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Standard Mix Ratios</h3>
                <ul className="space-y-2">
                  <li>• 1 part Portland cement</li>
                  <li>• 2 parts sand</li>
                  <li>• 3 parts gravel</li>
                  <li>• 0.5-0.6 parts water</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Strength Factors</h3>
                <ul className="space-y-2">
                  <li>• Water-cement ratio</li>
                  <li>• Aggregate quality</li>
                  <li>• Curing conditions</li>
                  <li>• Mix consistency</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Planning Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Site Preparation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Clear and level area</li>
                <li>• Compact soil properly</li>
                <li>• Install proper forms</li>
                <li>• Add gravel base if needed</li>
                <li>• Check drainage</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Weather Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Ideal temp: 50-85°F</li>
                <li>• Avoid freezing conditions</li>
                <li>• Protect from rain</li>
                <li>• Consider wind effects</li>
                <li>• Plan for curing time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tools Needed</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Wheelbarrow</li>
                <li>• Shovel and rake</li>
                <li>• Float and trowel</li>
                <li>• Edger tool</li>
                <li>• Safety equipment</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Applications & Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommended Thicknesses</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Sidewalks:</strong> 4 inches</p>
                <p><strong>Driveways:</strong> 4-6 inches</p>
                <p><strong>Patios:</strong> 4 inches</p>
                <p><strong>Garage Floors:</strong> 4-6 inches</p>
                <p><strong>Foundation Walls:</strong> 6-8 inches</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Reinforcement Guidelines</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Wire Mesh:</strong> For crack control in slabs</p>
                <p><strong>Rebar:</strong> For structural strength</p>
                <p><strong>Fiber:</strong> For added durability</p>
                <p><strong>Spacing:</strong> 12-18 inches typically</p>
                <p><strong>Coverage:</strong> 2-3 inches minimum</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cost Considerations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Material Costs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Ready-mix concrete</li>
                <li>• Reinforcement materials</li>
                <li>• Forms and stakes</li>
                <li>• Finishing tools</li>
                <li>• Curing compounds</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Labor Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Site preparation</li>
                <li>• Form setup</li>
                <li>• Concrete placement</li>
                <li>• Finishing work</li>
                <li>• Cleanup</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Expenses</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Permits</li>
                <li>• Equipment rental</li>
                <li>• Site access</li>
                <li>• Waste disposal</li>
                <li>• Weather protection</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}