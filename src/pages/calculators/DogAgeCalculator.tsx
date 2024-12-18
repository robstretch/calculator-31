import React, { useState } from 'react';
import { Dog } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { calculateDogAge } from '../../utils/calculators/dogAge/calculate';

export function DogAgeCalculator() {
  const [input, setInput] = useState({
    age: 1,
    ageUnit: 'years' as const,
    breed: '',
    size: 'medium' as const,
    weight: 30
  });

  const result = calculateDogAge(input);

  return (
    <>
      <SEO 
        title="Dog Age Calculator | Convert Dog Years to Human Years"
        description="Calculate your dog's age in human years with our accurate dog age calculator. Get personalized results based on breed size and weight."
        keywords={[
          'dog age calculator',
          'dog years to human years',
          'pet age calculator',
          'dog life expectancy',
          'puppy age calculator'
        ]}
      />

      <CalculatorLayout
        title="Dog Age Calculator"
        description="Calculate your dog's age in human years based on size, breed, and weight"
        icon={<Dog />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={input.age}
                  onChange={(e) => setInput(prev => ({ ...prev, age: parseFloat(e.target.value) || 0 }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <select
                  value={input.ageUnit}
                  onChange={(e) => setInput(prev => ({ ...prev, ageUnit: e.target.value as 'years' | 'months' }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Size Category</label>
              <select
                value={input.size}
                onChange={(e) => setInput(prev => ({ ...prev, size: e.target.value as 'small' | 'medium' | 'large' | 'giant' }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="small">Small (up to 20 lbs)</option>
                <option value="medium">Medium (21-50 lbs)</option>
                <option value="large">Large (51-100 lbs)</option>
                <option value="giant">Giant (over 100 lbs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
              <input
                type="number"
                value={input.weight}
                onChange={(e) => setInput(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Human Age:</span>
                  <span className="font-medium">{result.humanAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Life Stage:</span>
                  <span className="font-medium">{result.ageCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Life Expectancy:</span>
                  <span className="font-medium">{result.lifeExpectancy} years</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Recommendations</h3>
              <div className="space-y-3">
                {result.healthRecommendations.map((rec, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900">{rec.category}</h4>
                    <p className="text-sm text-gray-600">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Milestones</h3>
              <div className="space-y-3">
                {result.milestones.map((milestone, index) => (
                  <div key={index} className="border-l-2 border-indigo-200 pl-4">
                    <h4 className="font-medium text-gray-900">{milestone.stage}</h4>
                    <p className="text-sm text-gray-600">
                      {milestone.dogAge} dog years = {milestone.humanAge} human years
                    </p>
                    <p className="text-xs text-gray-500">{milestone.description}</p>
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