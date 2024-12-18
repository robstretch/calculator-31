import React, { useState } from 'react';
import { Ruler, Wind, Gauge, Settings } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateDuct } from '../../utils/calculators/duct/calculate';
import type { DuctInput } from '../../utils/calculators/duct/types';

export function DuctCalculator() {
  const [inputs, setInputs] = useState<DuctInput>({
    airflow: 1000,
    velocity: 800,
    shape: 'round',
    maxAspectRatio: 4
  });

  const result = calculateDuct(inputs);

  return (
    <CalculatorLayout
      title="Duct Size Calculator"
      description="Calculate optimal duct sizes for HVAC systems based on airflow requirements."
      icon={<Ruler />}
    >
      <SEO
        title="Duct Size Calculator | HVAC Duct Sizing Tool"
        description="Calculate the optimal duct size for your HVAC system. Free online duct calculator for round and rectangular ducts based on airflow and velocity."
        keywords={[
          'duct calculator',
          'duct sizing',
          'HVAC calculator',
          'ductwork sizing',
          'air velocity',
          'CFM calculator'
        ]}
        canonicalUrl="/duct-calculator"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Airflow Parameters</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <CalculatorInput
                label="Airflow (CFM)"
                value={inputs.airflow}
                onChange={(value) => setInputs(prev => ({ ...prev, airflow: Number(value) }))}
                min={0}
                step={50}
              />

              <CalculatorInput
                label="Air Velocity (FPM)"
                value={inputs.velocity}
                onChange={(value) => setInputs(prev => ({ ...prev, velocity: Number(value) }))}
                min={0}
                step={50}
              />
            </div>
          </div>

          {/* Shape Selection */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Duct Configuration</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duct Shape
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setInputs(prev => ({ ...prev, shape: 'round' }))}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                      inputs.shape === 'round'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    Round
                  </button>
                  <button
                    onClick={() => setInputs(prev => ({ ...prev, shape: 'rectangular' }))}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                      inputs.shape === 'rectangular'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    Rectangular
                  </button>
                </div>
              </div>

              {inputs.shape === 'rectangular' && (
                <CalculatorInput
                  label="Maximum Aspect Ratio"
                  value={inputs.maxAspectRatio || 4}
                  onChange={(value) => setInputs(prev => ({ ...prev, maxAspectRatio: Number(value) }))}
                  min={1}
                  max={8}
                  step={0.5}
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Size Results */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Duct Dimensions</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {inputs.shape === 'round' ? (
                <CalculatorResult
                  label="Duct Diameter"
                  value={`${result.size.diameter?.toFixed(1)} inches`}
                  helpText="Recommended round duct diameter"
                />
              ) : (
                <>
                  <CalculatorResult
                    label="Duct Width"
                    value={`${result.size.width} inches`}
                    helpText="Recommended rectangular duct width"
                  />
                  <CalculatorResult
                    label="Duct Height"
                    value={`${result.size.height} inches`}
                    helpText="Recommended rectangular duct height"
                  />
                </>
              )}
            </div>
          </div>

          {/* Performance Results */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorResult
                label="Actual Velocity"
                value={`${Math.round(result.velocity.actual)} FPM`}
                helpText="Actual air velocity based on calculated size"
              />
              <CalculatorResult
                label="Pressure Loss"
                value={`${result.pressure.totalPressure.toFixed(3)} in. w.g. per 100 ft`}
                helpText="Total pressure loss including friction"
              />
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <h3 className="font-medium text-gray-900">{rec.category}</h3>
                    <p className="text-gray-600 text-sm mt-1">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900">Understanding Duct Sizing</h2>
          </div>
          
          <div className="p-6 prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Proper duct sizing is crucial for HVAC system efficiency and performance. This calculator helps you determine 
              the optimal duct size based on your airflow requirements and desired air velocity. Whether you're working 
              with round or rectangular ducts, accurate sizing ensures proper air distribution while minimizing noise 
              and energy loss.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Concepts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Airflow (CFM)</h4>
                <p className="text-gray-600">
                  Cubic Feet per Minute (CFM) measures the volume of air flowing through the duct. Higher CFM values 
                  indicate greater air movement and typically require larger duct sizes.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Air Velocity (FPM)</h4>
                <p className="text-gray-600">
                  Feet per Minute (FPM) measures how fast air moves through the duct. Balancing velocity is crucial - 
                  too slow allows debris settling, too fast creates noise and wastes energy.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Using the Calculator</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>Enter your required airflow in CFM</li>
              <li>Input the desired air velocity in FPM</li>
              <li>Select between round or rectangular duct shape</li>
              <li>For rectangular ducts, specify the maximum aspect ratio if needed</li>
              <li>Review the calculated dimensions and recommendations</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Important Considerations</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Velocity Ranges:</strong> Residential ducts typically use 600-1000 FPM, commercial 
                1000-1500 FPM, and industrial 1500-2500 FPM
              </li>
              <li>
                <strong>Aspect Ratio:</strong> For rectangular ducts, maintain a width-to-height ratio below 4:1 
                for optimal performance
              </li>
              <li>
                <strong>Pressure Loss:</strong> Consider pressure drops when designing longer duct runs or systems 
                with multiple fittings
              </li>
              <li>
                <strong>Installation:</strong> Ensure proper sealing and insulation to maintain system efficiency
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Design</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Minimize the use of flexible ducts</li>
                  <li>• Use gradual transitions and turns</li>
                  <li>• Account for future system expansion</li>
                  <li>• Consider noise requirements</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Installation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Properly support ductwork</li>
                  <li>• Seal all joints and seams</li>
                  <li>• Insulate when necessary</li>
                  <li>• Follow local codes</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Regular inspections</li>
                  <li>• Clean ducts periodically</li>
                  <li>• Check for air leaks</li>
                  <li>• Monitor system performance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}