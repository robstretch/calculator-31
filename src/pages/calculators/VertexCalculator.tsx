import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateVertex } from '../../utils/calculators/vertex/calculate';

export function VertexCalculator() {
  const [spectaclePower, setSpectaclePower] = useState('');
  const [vertexDistance, setVertexDistance] = useState('12');
  const [direction, setDirection] = useState<'spectacle-to-contact' | 'contact-to-spectacle'>('spectacle-to-contact');

  const result = calculateVertex({
    spectaclePower: parseFloat(spectaclePower) || 0,
    vertexDistance: parseFloat(vertexDistance) || 12,
    direction
  });

  return (
    <>
      <SEO 
        title="Contact Lens Vertex Calculator | Power Conversion Tool"
        description="Convert between spectacle and contact lens powers with our vertex calculator. Account for vertex distance in vision correction calculations."
        keywords={[
          'vertex calculator',
          'contact lens power',
          'spectacle prescription',
          'vertex distance',
          'power conversion'
        ]}
        canonicalUrl="/vertex-calculator"
      />
      
      <CalculatorLayout
        title="Contact Lens Vertex Calculator"
        description="Convert between spectacle and contact lens powers based on vertex distance"
        icon={<Eye />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conversion Direction
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDirection('spectacle-to-contact')}
                  className={`px-4 py-2 rounded-md ${
                    direction === 'spectacle-to-contact'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Spectacle to Contact
                </button>
                <button
                  onClick={() => setDirection('contact-to-spectacle')}
                  className={`px-4 py-2 rounded-md ${
                    direction === 'contact-to-spectacle'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Contact to Spectacle
                </button>
              </div>
            </div>

            <CalculatorInput
              label={direction === 'spectacle-to-contact' ? 'Spectacle Power (D)' : 'Contact Lens Power (D)'}
              value={spectaclePower}
              onChange={setSpectaclePower}
              type="number"
              step="0.25"
              placeholder="Enter power in diopters"
            />

            <CalculatorInput
              label="Vertex Distance (mm)"
              value={vertexDistance}
              onChange={setVertexDistance}
              type="number"
              min="8"
              max="20"
              placeholder="Enter vertex distance"
            />
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label={direction === 'spectacle-to-contact' ? 'Contact Lens Power' : 'Spectacle Power'}
              value={`${result.contactLensPower.toFixed(2)} D`}
              helpText="Calculated equivalent power"
            />
            
            <CalculatorResult
              label="Power Difference"
              value={`${result.difference.toFixed(2)} D`}
              helpText="Change in power due to vertex distance"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculations</h3>
            <div className="space-y-3">
              {result.calculations.map((calc, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{calc.step}:</span>
                  <span className="font-mono text-gray-900">{calc.formula} = {calc.result.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-gray-600 text-sm mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}