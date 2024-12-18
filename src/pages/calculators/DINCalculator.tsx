import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateDIN } from '../../utils/calculators/din/calculate';
import type { DINInput } from '../../utils/calculators/din/types';

export function DINCalculator() {
  const [inputs, setInputs] = useState<DINInput>({
    weight: 70,
    height: 170,
    age: 30,
    skierType: 'intermediate',
    bootLength: 305,
    unit: 'metric'
  });

  const result = calculateDIN(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="DIN Calculator | Ski Binding Settings Calculator"
        description="Calculate ski binding DIN settings based on weight, height, age, and ability level. Get accurate binding release values for safe skiing."
        keywords={[
          'din calculator',
          'ski binding calculator',
          'binding settings',
          'ski safety',
          'binding release values'
        ]}
        canonicalUrl="/din-calculator"
      />

      <CalculatorLayout
        title="DIN Calculator"
        description="Calculate ski binding release settings based on your weight, height, age, and skiing ability."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit System
              </label>
              <select
                value={inputs.unit}
                onChange={(e) => setInputs({ ...inputs, unit: e.target.value as 'metric' | 'imperial' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="metric">Metric (kg/cm)</option>
                <option value="imperial">Imperial (lbs/in)</option>
              </select>
            </div>

            <CalculatorInput
              label={`Weight (${inputs.unit === 'metric' ? 'kg' : 'lbs'})`}
              value={inputs.weight}
              onChange={(value) => setInputs({ ...inputs, weight: parseFloat(value) || 0 })}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label={`Height (${inputs.unit === 'metric' ? 'cm' : 'inches'})`}
              value={inputs.height}
              onChange={(value) => setInputs({ ...inputs, height: parseFloat(value) || 0 })}
              min={0}
              step={0.1}
            />

            <CalculatorInput
              label="Age"
              value={inputs.age}
              onChange={(value) => setInputs({ ...inputs, age: parseInt(value) || 0 })}
              min={0}
              step={1}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skier Type
              </label>
              <select
                value={inputs.skierType}
                onChange={(e) => setInputs({ ...inputs, skierType: e.target.value as DINInput['skierType'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="beginner">Type I - Beginner</option>
                <option value="intermediate">Type II - Intermediate</option>
                <option value="advanced">Type III - Advanced</option>
              </select>
            </div>

            <CalculatorInput
              label="Boot Sole Length (mm)"
              value={inputs.bootLength}
              onChange={(value) => setInputs({ ...inputs, bootLength: parseInt(value) || 0 })}
              min={0}
              step={1}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">DIN Settings</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">DIN Setting</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {result.dinSetting.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Toe Release</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {result.toeRelease.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Heel Release</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {result.heelRelease.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Checks</h3>
            <div className="space-y-4">
              {result.safetyChecks.map((check, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`
                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                    ${check.status === 'pass' ? 'bg-green-100 text-green-600' :
                      check.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'}
                  `}>
                    {check.status === 'pass' ? '✓' : '!'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{check.check}</div>
                    <div className="text-sm text-gray-600">{check.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.maintenanceSchedule.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{item.component}</div>
                  <div className="text-sm text-indigo-600 mt-1">{item.interval}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{rec.category}</div>
                  <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding DIN Settings</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              DIN settings determine when your ski bindings will release to prevent injury. The setting is based on your:
            </p>
            
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Key Factors</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• Weight and height</li>
                  <li>• Age and skiing ability</li>
                  <li>• Boot sole length</li>
                  <li>• Skiing style and terrain</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Safety Considerations</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• Have settings professionally verified</li>
                  <li>• Test releases before skiing</li>
                  <li>• Regular binding maintenance</li>
                  <li>• Update settings with changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skier Types Explained</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Type I - Beginner</h3>
              <p className="mt-2 text-gray-600">
                Cautious skiing on smooth slopes. Prefer slower speeds. Learning basic techniques.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Type II - Intermediate</h3>
              <p className="mt-2 text-gray-600">
                Moderate speeds on varied terrain. Comfortable on most slopes. Some experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Type III - Advanced</h3>
              <p className="mt-2 text-gray-600">
                Fast skiing on challenging terrain. Experienced on steep slopes. Aggressive style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}