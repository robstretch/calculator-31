import React, { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateStairs } from '../../utils/calculators/stair/calculate';
import { formatNumber, formatCurrency } from '../../utils/format';

export function StairCalculator() {
  const [totalRise, setTotalRise] = useState('108');
  const [totalRun, setTotalRun] = useState('144');
  const [headroom, setHeadroom] = useState('80');
  const [width, setWidth] = useState('36');

  const results = calculateStairs({
    totalRise: parseFloat(totalRise) || 0,
    totalRun: parseFloat(totalRun) || 0,
    headroom: parseFloat(headroom) || 0,
    width: parseFloat(width) || 0
  });

  return (
    <CalculatorLayout
      title="Stair Calculator"
      description="Calculate stair dimensions and materials"
      icon={<ArrowDownRight />}
    >
      <SEO
        title="Stair Calculator | Staircase Design Calculator"
        description="Calculate stair dimensions, materials, and costs for your construction project. Free stair calculator with code compliance checks."
        keywords={[
          'stair calculator',
          'staircase calculator',
          'stair rise and run',
          'stair dimensions',
          'stair building calculator',
          'construction calculator'
        ]}
        canonicalUrl="/stair-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Stair Dimensions</h2>
          
          <CalculatorInput
            label="Total Rise (inches)"
            value={totalRise}
            onChange={setTotalRise}
            min={0}
            step={0.25}
            placeholder="Enter total rise"
          />
          
          <CalculatorInput
            label="Total Run (inches)"
            value={totalRun}
            onChange={setTotalRun}
            min={0}
            step={0.25}
            placeholder="Enter total run"
          />
          
          <CalculatorInput
            label="Headroom (inches)"
            value={headroom}
            onChange={setHeadroom}
            min={0}
            step={0.25}
            placeholder="Enter headroom"
          />
          
          <CalculatorInput
            label="Stair Width (inches)"
            value={width}
            onChange={setWidth}
            min={24}
            step={0.25}
            placeholder="Enter stair width"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Stair Details</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.numberOfSteps}
              </div>
              <div className="text-gray-500">Total Steps</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Riser Height"
              value={`${formatNumber(results.riserHeight)}`}
              helpText="Height of each step in inches"
            />
            
            <CalculatorResult
              label="Tread Depth"
              value={`${formatNumber(results.treadDepth)}`}
              helpText="Depth of each step in inches"
            />
            
            <CalculatorResult
              label="Stair Angle"
              value={`${formatNumber(results.angle)}°`}
              helpText="Angle of stairs from horizontal"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Materials Needed:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Stringers:</span>
                  <span className="font-medium">{results.materials.stringers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Treads:</span>
                  <span className="font-medium">{results.materials.treads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risers:</span>
                  <span className="font-medium">{results.materials.risers}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Lumber Requirements:</h3>
              <div className="space-y-3">
                {results.materials.lumber.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{item.type}:</span>
                    <span className="font-medium">{item.amount} {item.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Estimated Costs:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lumber:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.lumber)}</span>
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

            {!results.isWithinCode && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800 mb-2">Code Violations:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  {results.codeViolations.map((violation, index) => (
                    <li key={index}>• {violation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stair Construction Basics</h2>
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