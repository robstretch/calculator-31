import React, { useState } from 'react';
import { Waves } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateAquarium } from '../../utils/calculators/aquarium/calculate';
import type { AquariumDimensions } from '../../utils/calculators/aquarium/types';

export function AquariumCalculator() {
  const [dimensions, setDimensions] = useState<AquariumDimensions>({
    length: 30,
    width: 12,
    height: 18,
    unit: 'inches'
  });

  const result = calculateAquarium(dimensions);

  return (
    <CalculatorLayout
      title="Aquarium Calculator"
      description="Calculate aquarium volume, stocking levels, and maintenance requirements"
      icon={<Waves />}
    >
      <SEO
        title="Aquarium Calculator | Volume & Stocking Calculator"
        description="Calculate aquarium volume, appropriate fish stocking levels, and maintenance requirements. Get personalized recommendations for your tank setup."
        keywords={[
          'aquarium calculator',
          'fish tank calculator',
          'aquarium volume',
          'fish stocking calculator',
          'aquarium maintenance'
        ]}
        canonicalUrl="/aquarium-calculator"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tank Dimensions</h2>
            
            <div className="space-y-4">
              <CalculatorInput
                label="Length"
                value={dimensions.length}
                onChange={(value) => setDimensions({ ...dimensions, length: Number(value) })}
                min={0}
              />
              
              <CalculatorInput
                label="Width"
                value={dimensions.width}
                onChange={(value) => setDimensions({ ...dimensions, width: Number(value) })}
                min={0}
              />
              
              <CalculatorInput
                label="Height"
                value={dimensions.height}
                onChange={(value) => setDimensions({ ...dimensions, height: Number(value) })}
                min={0}
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setDimensions({ ...dimensions, unit: 'inches' })}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    dimensions.unit === 'inches'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setDimensions({ ...dimensions, unit: 'centimeters' })}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    dimensions.unit === 'centimeters'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tank Volume</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{result.volume.gallons}</div>
                <div className="text-sm text-gray-600">Gallons</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{result.volume.liters}</div>
                <div className="text-sm text-gray-600">Liters</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stocking Guidelines</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Small Fish (1-2")</span>
                <span className="font-semibold">{result.stocking.smallFish}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medium Fish (2-4")</span>
                <span className="font-semibold">{result.stocking.mediumFish}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Large Fish (4"+)</span>
                <span className="font-semibold">{result.stocking.largeFish}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Maintenance Requirements</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Weekly Water Change</span>
                <span className="font-semibold">{Math.round(result.maintenance.waterChangeVolume)} gal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Filter Flow Rate</span>
                <span className="font-semibold">{Math.round(result.maintenance.filterSize)} GPH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Heater Size</span>
                <span className="font-semibold">{result.maintenance.heaterWattage}W</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Water Parameters Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {result.waterParameters.map((param) => (
              <div key={param.parameter} className="space-y-2">
                <h3 className="font-semibold text-gray-800">{param.parameter}</h3>
                <div className="text-sm text-gray-600">Ideal Range: {param.idealRange}</div>
                <div className="text-sm text-gray-600">{param.recommendation}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {result.recommendations.map((rec) => (
              <div key={rec.category} className="space-y-2">
                <h3 className="font-semibold text-indigo-800">{rec.category}</h3>
                <p className="text-indigo-700">{rec.suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              The Aquarium Calculator helps you plan and maintain a healthy aquatic environment. Here's how to use it:
            </p>
            
            <ol className="list-decimal pl-4 space-y-2 mt-4">
              <li>Enter your tank dimensions in either inches or centimeters</li>
              <li>Review the calculated volume in both gallons and liters</li>
              <li>Check the recommended stocking levels based on fish size</li>
              <li>Note the maintenance requirements for proper tank care</li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Important Notes</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Stocking levels are guidelines based on the "inch per gallon" rule</li>
              <li>Consider fish species compatibility and territorial behavior</li>
              <li>Regular water testing is essential for fish health</li>
              <li>Maintain consistent maintenance schedules</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Best Practices</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Cycle your tank before adding fish</li>
              <li>Add fish gradually to maintain water quality</li>
              <li>Keep consistent maintenance schedules</li>
              <li>Monitor water parameters regularly</li>
              <li>Research specific needs of your chosen fish species</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}