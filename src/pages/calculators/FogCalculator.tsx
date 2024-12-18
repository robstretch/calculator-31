import React, { useState } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { Calculator } from 'lucide-react';
import { calculateFog } from '../../utils/calculators/fog/calculate';

export function FogCalculator() {
  const [temperature, setTemperature] = useState<string>('');
  const [dewPoint, setDewPoint] = useState<string>('');
  const [relativeHumidity, setRelativeHumidity] = useState<string>('');
  const [windSpeed, setWindSpeed] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const input = {
      temperature: parseFloat(temperature),
      dewPoint: parseFloat(dewPoint),
      relativeHumidity: parseFloat(relativeHumidity),
      windSpeed: parseFloat(windSpeed),
      unit
    };
    setResult(calculateFog(input));
  };

  return (
    <>
      <SEO
        title="Fog Calculator | Weather Visibility Calculator"
        description="Calculate fog probability and visibility conditions with our free fog calculator. Analyze temperature, dew point, and weather conditions."
        keywords={[
          'fog calculator',
          'visibility calculator',
          'weather calculator',
          'dew point calculator',
          'meteorology tools'
        ]}
        canonicalUrl="/fog-calculator"
      />

      <CalculatorLayout
        title="Fog Calculator"
        description="Calculate fog probability and visibility conditions"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature ({unit === 'metric' ? '°C' : '°F'})
                </label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter temperature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dew Point ({unit === 'metric' ? '°C' : '°F'})
                </label>
                <input
                  type="number"
                  value={dewPoint}
                  onChange={(e) => setDewPoint(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter dew point"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relative Humidity (%)
                </label>
                <input
                  type="number"
                  value={relativeHumidity}
                  onChange={(e) => setRelativeHumidity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter humidity"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wind Speed ({unit === 'metric' ? 'm/s' : 'mph'})
                </label>
                <input
                  type="number"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter wind speed"
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
                  <option value="metric">Metric (°C, m/s)</option>
                  <option value="imperial">Imperial (°F, mph)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Calculate Fog Conditions
            </button>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Fog Probability</p>
                    <p className="text-xl font-medium">{result.probability}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Visibility Category</p>
                    <p className="text-xl font-medium">{result.visibility.category}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Visibility Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Visibility (meters)</p>
                    <p className="text-lg font-medium">{result.visibility.meters}m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Visibility (feet)</p>
                    <p className="text-lg font-medium">{result.visibility.feet}ft</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Conditions Analysis</h3>
                <div className="space-y-3">
                  {result.conditions.map((condition: any, index: number) => (
                    <div key={index} className="border-b pb-3">
                      <p className="font-medium">{condition.factor}</p>
                      <p className="text-gray-600">{condition.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Timing Estimates</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Formation</p>
                    <p className="text-gray-600">{result.timing.formation}</p>
                  </div>
                  <div>
                    <p className="font-medium">Dissipation</p>
                    <p className="text-gray-600">{result.timing.dissipation}</p>
                  </div>
                  <div>
                    <p className="font-medium">Expected Duration</p>
                    <p className="text-gray-600">{result.timing.duration} hours</p>
                  </div>
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
            <h2 className="text-2xl font-bold text-gray-900">Understanding Fog Formation</h2>
            
            <div className="text-gray-600 space-y-4">
              <p>
                Fog forms when the difference between air temperature and dew point is minimal, 
                typically accompanied by high relative humidity. Understanding these conditions 
                helps predict fog formation and its potential impact on visibility.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">How to Use the Calculator</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter the current air temperature</li>
                <li>Input the dew point temperature</li>
                <li>Specify the relative humidity percentage</li>
                <li>Enter the current wind speed</li>
                <li>Select your preferred unit system</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">Understanding Results</h3>
              <div className="space-y-4">
                <p>The calculator provides:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Fog probability percentage</li>
                  <li>Expected visibility range</li>
                  <li>Condition analysis</li>
                  <li>Formation and dissipation timing</li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold text-indigo-900">Key Concepts</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold">Temperature-Dew Point Spread</dt>
                    <dd>Smaller spread increases fog likelihood</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Relative Humidity</dt>
                    <dd>Higher humidity (&gt;90%) favors fog formation</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Wind Speed</dt>
                    <dd>Light winds (&lt;5 mph) often ideal for fog development</dd>
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