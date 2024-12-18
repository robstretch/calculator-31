import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateBulking } from '../../utils/calculators/bulking/calculate';
import type { BulkingInput } from '../../utils/calculators/bulking/types';

export function BulkingCalculator() {
  const [inputs, setInputs] = useState<BulkingInput>({
    weight: 70,
    height: 175,
    age: 25,
    gender: 'male',
    activityLevel: 'moderate',
    unit: 'metric',
    bulkingType: 'lean'
  });

  const result = calculateBulking(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Bulking Calculator | Muscle Gain Calorie Calculator"
        description="Calculate optimal calories and macros for bulking. Get personalized recommendations for lean muscle gain based on your body metrics and activity level."
        keywords={[
          'bulking calculator',
          'muscle gain calculator',
          'bulking macros',
          'lean bulk calculator',
          'weight gain calculator'
        ]}
        canonicalUrl="/bulking-calculator"
      />

      <CalculatorLayout
        title="Bulking Calculator"
        description="Calculate your optimal calorie and macro targets for muscle gain."
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bulking Type
              </label>
              <select
                value={inputs.bulkingType}
                onChange={(e) => setInputs({ ...inputs, bulkingType: e.target.value as 'lean' | 'moderate' | 'aggressive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="lean">Lean Bulk (0.25-0.5 lbs/week)</option>
                <option value="moderate">Moderate Bulk (0.5-1 lbs/week)</option>
                <option value="aggressive">Aggressive Bulk (1-1.5 lbs/week)</option>
              </select>
            </div>

            <CalculatorInput
              label={`Weight (${inputs.unit === 'metric' ? 'kg' : 'lbs'})`}
              value={inputs.weight}
              onChange={(value) => setInputs({ ...inputs, weight: parseFloat(value) })}
              min={0}
            />

            <CalculatorInput
              label={`Height (${inputs.unit === 'metric' ? 'cm' : 'inches'})`}
              value={inputs.height}
              onChange={(value) => setInputs({ ...inputs, height: parseFloat(value) })}
              min={0}
            />

            <CalculatorInput
              label="Age"
              value={inputs.age}
              onChange={(value) => setInputs({ ...inputs, age: parseFloat(value) })}
              min={0}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                value={inputs.activityLevel}
                onChange={(e) => setInputs({ ...inputs, activityLevel: e.target.value as BulkingInput['activityLevel'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="very-active">Very Active (physical job/training)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calorie Targets</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Maintenance Calories"
                value={`${result.maintenanceCalories} calories/day`}
                helpText="Base calories to maintain current weight"
              />
              <CalculatorResult
                label="Bulking Calories"
                value={`${result.bulkingCalories} calories/day`}
                helpText="Target calories for muscle gain"
              />
              <CalculatorResult
                label="Weekly Weight Gain"
                value={`${result.weeklyGain} ${inputs.unit === 'metric' ? 'kg' : 'lbs'}/week`}
                helpText="Expected rate of weight gain"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Macro Breakdown</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Protein"
                value={`${result.macroBreakdown.protein.grams}g (${result.macroBreakdown.protein.calories} calories)`}
                helpText="For muscle growth and recovery"
              />
              <CalculatorResult
                label="Carbohydrates"
                value={`${result.macroBreakdown.carbs.grams}g (${result.macroBreakdown.carbs.calories} calories)`}
                helpText="For energy and performance"
              />
              <CalculatorResult
                label="Fats"
                value={`${result.macroBreakdown.fats.grams}g (${result.macroBreakdown.fats.calories} calories)`}
                helpText="For hormonal function"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Planning</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Meals Per Day"
                value={`${result.mealPlan.mealsPerDay} meals`}
                helpText="Optimal meal frequency"
              />
              <CalculatorResult
                label="Per Meal"
                value={`${result.mealPlan.caloriesPerMeal} calories, ${result.mealPlan.proteinPerMeal}g protein`}
                helpText="Target nutrients per meal"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Monthly Gain"
                value={`${result.timeline.monthlyGain} ${inputs.unit === 'metric' ? 'kg' : 'lbs'}`}
                helpText="Expected monthly weight gain"
              />
              <CalculatorResult
                label="Target Weight"
                value={`${result.timeline.targetWeight} ${inputs.unit === 'metric' ? 'kg' : 'lbs'}`}
                helpText={`In ${result.timeline.weeks} weeks`}
              />
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