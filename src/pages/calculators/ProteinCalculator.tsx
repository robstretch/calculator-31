import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateProtein } from '../../utils/calculators/protein/calculate';
import type { ProteinInput } from '../../utils/calculators/protein/types';

export function ProteinCalculator() {
  const [inputs, setInputs] = useState<ProteinInput>({
    weight: 70,
    unit: 'kg',
    activityLevel: 'moderate',
    goal: 'maintenance',
    dietType: 'standard'
  });

  const result = calculateProtein(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Protein Calculator | Daily Protein Intake Calculator"
        description="Calculate your optimal daily protein intake based on weight, activity level, and fitness goals. Get personalized recommendations for protein timing and sources."
        keywords={[
          'protein calculator',
          'protein intake',
          'daily protein needs',
          'muscle building',
          'protein requirements',
          'nutrition calculator'
        ]}
        canonicalUrl="/protein-calculator"
      />

      <CalculatorLayout
        title="Protein Calculator"
        description="Calculate your optimal daily protein intake and get personalized recommendations."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Weight"
              value={inputs.weight}
              onChange={(value) => setInputs({ ...inputs, weight: parseFloat(value) })}
              min={0}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={inputs.unit}
                onChange={(e) => setInputs({ ...inputs, unit: e.target.value as 'kg' | 'lbs' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                value={inputs.activityLevel}
                onChange={(e) => setInputs({ ...inputs, activityLevel: e.target.value as ProteinInput['activityLevel'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="sedentary">Sedentary</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="athlete">Athlete</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal
              </label>
              <select
                value={inputs.goal}
                onChange={(e) => setInputs({ ...inputs, goal: e.target.value as ProteinInput['goal'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="maintenance">Maintenance</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="fat-loss">Fat Loss</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diet Type
              </label>
              <select
                value={inputs.dietType}
                onChange={(e) => setInputs({ ...inputs, dietType: e.target.value as ProteinInput['dietType'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="standard">Standard</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Protein Requirements</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Optimal Daily Protein"
                value={`${result.dailyProtein.optimal}g`}
                helpText="Recommended daily protein intake"
              />
              <CalculatorResult
                label="Range"
                value={`${result.dailyProtein.min}g - ${result.dailyProtein.max}g`}
                helpText="Acceptable range based on your goals"
              />
              <CalculatorResult
                label="Per Meal"
                value={`${result.mealsPerDay.proteinPerMeal}g × ${result.mealsPerDay.recommended} meals`}
                helpText="Recommended protein per meal"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Protein Sources</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serving</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.sources.map((source, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{source.food}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.servingSize}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.protein}g</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.calories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="font-medium text-gray-700">{rec.category}:</div>
                  <div className="text-gray-600">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}