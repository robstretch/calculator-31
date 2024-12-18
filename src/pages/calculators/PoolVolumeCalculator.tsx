import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculatePoolVolume } from '../../utils/calculators/poolVolume/calculate';

export function PoolVolumeCalculator() {
  const [dimensions, setDimensions] = useState({
    length: 20,
    width: 10,
    averageDepth: 5,
    shape: 'rectangular' as const,
    unit: 'feet' as const
  });

  const result = calculatePoolVolume(dimensions);

  return (
    <>
      <SEO 
        title="Pool Volume Calculator | Calculate Pool Water and Chemical Requirements"
        description="Calculate swimming pool volume, chemical requirements, and maintenance needs. Get accurate measurements in gallons, liters, and cubic feet."
        keywords={[
          'pool volume calculator',
          'swimming pool volume',
          'pool chemical calculator',
          'pool maintenance calculator',
          'pool water volume'
        ]}
      />

      <CalculatorLayout
        title="Pool Volume Calculator"
        description="Calculate pool volume and maintenance requirements"
        icon={<Calculator />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pool Shape</label>
              <select
                value={dimensions.shape}
                onChange={(e) => setDimensions(prev => ({ 
                  ...prev, 
                  shape: e.target.value as 'rectangular' | 'circular' | 'oval'
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="rectangular">Rectangular</option>
                <option value="circular">Circular</option>
                <option value="oval">Oval</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
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

            <CalculatorInput
              label="Length"
              value={dimensions.length}
              onChange={(value) => setDimensions(prev => ({ ...prev, length: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Width"
              value={dimensions.width}
              onChange={(value) => setDimensions(prev => ({ ...prev, width: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Average Depth"
              value={dimensions.averageDepth}
              onChange={(value) => setDimensions(prev => ({ ...prev, averageDepth: parseFloat(value) || 0 }))}
              min={0}
              step={0.1}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pool Volume</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Gallons</div>
                  <div className="font-medium">{result.volume.gallons.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Liters</div>
                  <div className="font-medium">{result.volume.liters.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Cubic Feet</div>
                  <div className="font-medium">{result.volume.cubicFeet.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Cubic Meters</div>
                  <div className="font-medium">{result.volume.cubicMeters.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chemical Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Chlorine:</span>
                  <span className="font-medium">{result.chemicals.chlorine} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alkalinity:</span>
                  <span className="font-medium">{result.chemicals.alkalinity} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stabilizer:</span>
                  <span className="font-medium">{result.chemicals.stabilizer} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shock:</span>
                  <span className="font-medium">{result.chemicals.shock} lbs</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance</h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900">{rec.category}</h4>
                    <p className="text-sm text-gray-600">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}