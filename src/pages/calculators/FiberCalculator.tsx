import React, { useState } from 'react';
import { Apple } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateFiber } from '../../utils/calculators/fiber/calculate';

export function FiberCalculator() {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('70');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [pregnant, setPregnant] = useState(false);
  const [breastfeeding, setBreastfeeding] = useState(false);

  const result = calculateFiber({
    age: parseInt(age) || 0,
    gender,
    weight: parseFloat(weight) || 0,
    unit,
    activityLevel,
    pregnant,
    breastfeeding
  });

  return (
    <>
      <SEO 
        title="Daily Fiber Calculator | Dietary Fiber Requirements"
        description="Calculate your daily fiber needs based on age, gender, and activity level. Get personalized recommendations for fiber intake and food sources."
        keywords={[
          'fiber calculator',
          'dietary fiber',
          'daily fiber needs',
          'fiber intake',
          'nutrition calculator'
        ]}
        canonicalUrl="/fiber-calculator"
      />

      <CalculatorLayout
        title="Daily Fiber Calculator"
        description="Calculate your recommended daily fiber intake and get personalized recommendations"
        icon={<Apple />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Age"
              value={age}
              onChange={setAge}
              type="number"
              min="0"
              max="120"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={`px-4 py-2 rounded-md ${
                    gender === 'male'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`px-4 py-2 rounded-md ${
                    gender === 'female'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <CalculatorInput
              label="Weight"
              value={weight}
              onChange={setWeight}
              type="number"
              min="0"
              placeholder={`Weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="sedentary">Sedentary</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
              </select>
            </div>

            {gender === 'female' && (
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pregnant}
                    onChange={(e) => setPregnant(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Pregnant</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={breastfeeding}
                    onChange={(e) => setBreastfeeding(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Breastfeeding</label>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Recommended Daily Fiber"
              value={`${result.dailyNeeds.recommended}g`}
              helpText="Based on your age, gender, and activity level"
            />

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiber Sources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.sources.map((source, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{source.food}</div>
                    <div className="text-sm text-gray-600">
                      {source.servingSize} = {source.fiberContent}g fiber
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Need {source.servingsNeeded} servings for daily goal
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiber Types</h3>
              <div className="space-y-4">
                {result.breakdown.map((type, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-medium text-gray-900">
                      <span>{type.category}</span>
                      <span>{type.amount}g ({type.percentage}%)</span>
                    </div>
                    <div className="mt-1 relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          className="bg-indigo-600 rounded"
                          style={{ width: `${type.percentage}%` }}
                        />
                      </div>
                    </div>
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
        </div>
      </CalculatorLayout>
    </>
  );
}