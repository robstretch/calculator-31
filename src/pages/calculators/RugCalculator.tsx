import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateRugSize } from '../../utils/calculators/rug/calculate';
import { RoomDimensions, RoomLayout } from '../../utils/calculators/rug/types';

export function RugCalculator() {
  const [dimensions, setDimensions] = useState<RoomDimensions>({
    length: 12,
    width: 10,
    unit: 'feet'
  });

  const [layout, setLayout] = useState<RoomLayout>({
    type: 'living',
    furniture: [
      {
        type: 'sofa',
        dimensions: { length: 7, width: 3 }
      }
    ]
  });

  const result = calculateRugSize(dimensions, layout);

  return (
    <>
      <SEO 
        title="Rug Size Calculator | Find Perfect Rug Dimensions"
        description="Calculate the ideal rug size for any room based on room dimensions, furniture layout, and design principles. Get expert recommendations for rug placement and sizing."
        keywords={[
          'rug size calculator',
          'area rug dimensions',
          'rug placement guide',
          'room layout calculator',
          'furniture placement'
        ]}
      />

      <CalculatorLayout
        title="Rug Size Calculator"
        description="Find the perfect rug size for your room based on dimensions and layout"
        icon={<Calculator />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Room Dimensions</h2>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Length"
                value={dimensions.length}
                onChange={(value) => setDimensions(prev => ({
                  ...prev,
                  length: parseFloat(value) || 0
                }))}
                min={1}
                max={100}
              />
              <CalculatorInput
                label="Width"
                value={dimensions.width}
                onChange={(value) => setDimensions(prev => ({
                  ...prev,
                  width: parseFloat(value) || 0
                }))}
                min={1}
                max={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={dimensions.unit}
                onChange={(e) => setDimensions(prev => ({
                  ...prev,
                  unit: e.target.value as 'feet' | 'meters'
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="feet">Feet</option>
                <option value="meters">Meters</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                value={layout.type}
                onChange={(e) => setLayout(prev => ({
                  ...prev,
                  type: e.target.value as 'living' | 'dining' | 'bedroom' | 'office'
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="living">Living Room</option>
                <option value="dining">Dining Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="office">Office</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Sizes</h3>
              <div className="space-y-4">
                {result.recommendedSizes.map((size, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{size.size}</span>
                      <span className="text-sm text-gray-500">{size.coverage}% coverage</span>
                    </div>
                    <p className="text-sm text-gray-600">{size.layout} placement</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Analysis</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Area:</span>
                  <span className="font-medium">{result.roomAnalysis.totalArea} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ideal Coverage:</span>
                  <span className="font-medium">{result.roomAnalysis.idealCoverage} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Size:</span>
                  <span className="font-medium">
                    {result.roomAnalysis.minimumSize.length}' x {result.roomAnalysis.minimumSize.width}'
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Guidelines</h3>
            <div className="space-y-4">
              {result.guidelines.map((guideline, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{guideline.category}</h4>
                  <p className="text-sm text-gray-500 font-medium mt-1">{guideline.rule}</p>
                  <p className="text-sm text-gray-600">{guideline.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-sm text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}