import React, { useState } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { Calculator } from 'lucide-react';
import { calculateTorque } from '../../utils/calculators/torque/calculate';

export function TorqueCalculator() {
  const [force, setForce] = useState<string>('');
  const [radius, setRadius] = useState<string>('');
  const [angle, setAngle] = useState<string>('90');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const input = {
      force: parseFloat(force),
      radius: parseFloat(radius),
      angle: parseFloat(angle),
      unit
    };
    setResult(calculateTorque(input));
  };

  return (
    <>
      <SEO
        title="Torque Calculator | Force and Moment Calculator"
        description="Calculate torque, rotational force, and moment with our free online torque calculator. Convert between units and analyze force components."
        keywords={[
          'torque calculator',
          'moment calculator',
          'rotational force',
          'newton meters',
          'foot pounds'
        ]}
        canonicalUrl="/torque-calculator"
      />

      <CalculatorLayout
        title="Torque Calculator"
        description="Calculate torque, moment, and rotational force"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Force ({unit === 'metric' ? 'N' : 'lbf'})
                </label>
                <input
                  type="number"
                  value={force}
                  onChange={(e) => setForce(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter force"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Radius ({unit === 'metric' ? 'm' : 'ft'})
                </label>
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter radius"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Angle (degrees)
                </label>
                <input
                  type="number"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter angle"
                  min="0"
                  max="360"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit System
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="metric">Metric (N⋅m)</option>
                  <option value="imperial">Imperial (ft⋅lb)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Calculate Torque
            </button>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Torque</p>
                    <p className="text-xl font-medium">
                      {unit === 'metric' ? 
                        `${result.torque.toFixed(2)} N⋅m` :
                        `${result.equivalents.footPounds.toFixed(2)} ft⋅lb`}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Perpendicular Force Component</p>
                    <p className="text-xl font-medium">
                      {result.components.perpendicular.toFixed(2)} {unit === 'metric' ? 'N' : 'lbf'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Unit Conversions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600">Newton-meters (N⋅m)</p>
                    <p className="text-lg font-medium">{result.equivalents.newtonMeters.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Foot-pounds (ft⋅lb)</p>
                    <p className="text-lg font-medium">{result.equivalents.footPounds.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Inch-pounds (in⋅lb)</p>
                    <p className="text-lg font-medium">{result.equivalents.inchPounds.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Calculations</h3>
                <div className="space-y-3">
                  {result.calculations.map((calc: any, index: number) => (
                    <div key={index} className="border-b pb-3">
                      <p className="font-medium">{calc.step}</p>
                      <p className="text-gray-600">{calc.formula}</p>
                      <p className="text-sm font-mono mt-1">{calc.result.toFixed(4)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec: any, index: number) => (
                    <div key={index}>
                      <p className="font-medium">{rec.category}</p>
                      <p className="text-gray-600">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">Understanding Torque</h2>
            
            <div className="text-gray-600 space-y-4">
              <p>
                Torque, also known as moment of force, is the rotational equivalent of linear force. 
                It measures the tendency of a force to rotate an object around an axis or pivot point. 
                The magnitude of torque depends on both the force applied and the perpendicular distance 
                from the axis to the line of action of the force.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">How to Use the Calculator</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter the force magnitude in Newtons (N) or pounds-force (lbf)</li>
                <li>Input the radius (lever arm length) in meters or feet</li>
                <li>Specify the angle between force and lever arm (default 90°)</li>
                <li>Select your preferred unit system</li>
                <li>Click "Calculate" to see results</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">Understanding Results</h3>
              <div className="space-y-4">
                <p>The calculator provides:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Total torque in multiple units</li>
                  <li>Force components analysis</li>
                  <li>Step-by-step calculations</li>
                  <li>Application-specific recommendations</li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold text-indigo-900">Key Concepts</h3>
                <dl className="mt-4 space-y-4 text-indigo-800">
                  <div>
                    <dt className="font-semibold">Torque Formula</dt>
                    <dd>τ = F × r × sin(θ), where F is force, r is radius, and θ is angle</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Maximum Torque</dt>
                    <dd>Occurs when force is perpendicular to lever arm (90°)</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Applications</dt>
                    <dd>Used in engines, fasteners, tools, and mechanical systems</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}