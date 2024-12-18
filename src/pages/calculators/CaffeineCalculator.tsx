import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateCaffeine } from '../../utils/calculators/caffeine/calculate';

export function CaffeineCalculator() {
  const [weight, setWeight] = useState('70');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [sensitivity, setSensitivity] = useState<'low' | 'normal' | 'high'>('normal');
  const [consumptions, setConsumptions] = useState([
    { source: 'Coffee', amount: 95, time: '08:00' }
  ]);

  const result = calculateCaffeine({
    weight: parseFloat(weight) || 0,
    unit,
    consumptions,
    sensitivity
  });

  return (
    <>
      <SEO 
        title="Caffeine Calculator | Track Caffeine Intake and Metabolism"
        description="Calculate caffeine levels in your body, track consumption, and get personalized recommendations for optimal caffeine intake."
        keywords={[
          'caffeine calculator',
          'caffeine metabolism',
          'coffee calculator',
          'caffeine tracking',
          'caffeine half life'
        ]}
        canonicalUrl="/caffeine-calculator"
      />

      <CalculatorLayout
        title="Caffeine Calculator"
        description="Track your caffeine intake and metabolism throughout the day"
        icon={<Coffee />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Weight"
              value={weight}
              onChange={setWeight}
              type="number"
              min="0"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUnit('kg')}
                  className={`px-4 py-2 rounded-md ${
                    unit === 'kg'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Kilograms
                </button>
                <button
                  onClick={() => setUnit('lbs')}
                  className={`px-4 py-2 rounded-md ${
                    unit === 'lbs'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pounds
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caffeine Sensitivity
              </label>
              <select
                value={sensitivity}
                onChange={(e) => setSensitivity(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Caffeine Sources</h3>
            <div className="space-y-4">
              {consumptions.map((consumption, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <select
                    value={consumption.source}
                    onChange={(e) => {
                      const newConsumptions = [...consumptions];
                      newConsumptions[index] = {
                        ...consumption,
                        source: e.target.value,
                        amount: result.sources.find(s => s.name === e.target.value)?.caffeineContent || 0
                      };
                      setConsumptions(newConsumptions);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {result.sources.map(source => (
                      <option key={source.name} value={source.name}>
                        {source.name} ({source.servingSize})
                      </option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={consumption.time}
                    onChange={(e) => {
                      const newConsumptions = [...consumptions];
                      newConsumptions[index] = {
                        ...consumption,
                        time: e.target.value
                      };
                      setConsumptions(newConsumptions);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={() => {
                      const newConsumptions = consumptions.filter((_, i) => i !== index);
                      setConsumptions(newConsumptions);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setConsumptions([...consumptions, { source: 'Coffee', amount: 95, time: '08:00' }])}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add Consumption
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-500">Current Caffeine Level</div>
                <div className="text-2xl font-bold text-indigo-600">{result.currentLevel} mg</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Peak Level</div>
                <div className="text-2xl font-bold text-indigo-600">{result.peakLevel} mg</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Half-life</div>
                <div className="text-2xl font-bold text-indigo-600">{result.halfLife} hours</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Metabolism Rate</div>
                <div className="text-2xl font-bold text-indigo-600">{result.metabolismRate} mg/hour</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-2">
              {result.timeline.filter((_, i) => i % 4 === 0).map((point, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">{point.time}</div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className={`h-full rounded ${
                          point.status === 'Low' ? 'bg-green-500' :
                          point.status === 'Moderate' ? 'bg-yellow-500' :
                          point.status === 'High' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (point.level / 400) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{point.level} mg</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-sm text-gray-600 mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}