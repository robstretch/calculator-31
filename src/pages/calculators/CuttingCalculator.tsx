import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateCutting } from '../../utils/calculators/cutting/calculate';
import type { CuttingInput } from '../../utils/calculators/cutting/types';

export function CuttingCalculator() {
  const [inputs, setInputs] = useState<CuttingInput>({
    weight: 80,
    height: 175,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    unit: 'metric',
    targetWeightLoss: 5,
    timeframe: 12
  });

  const result = calculateCutting(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Cutting Calculator | Weight Loss & Calorie Deficit"
        description="Calculate optimal calorie deficit and macros for cutting. Get personalized recommendations for sustainable fat loss while preserving muscle mass."
        keywords={[
          'cutting calculator',
          'weight loss calculator',
          'calorie deficit',
          'macro calculator',
          'fat loss calculator'
        ]}
        canonicalUrl="/cutting-calculator"
      />

      <CalculatorLayout
        title="Cutting Calculator"
        description="Calculate your optimal calorie deficit and macros for a successful cutting phase."
        icon={<Scale />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Weight"
              value={inputs.weight}
              onChange={(value) => setInputs({ ...inputs, weight: parseFloat(value) })}
              min={0}
            />

            <CalculatorInput
              label="Height"
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
                Gender
              </label>
              <select
                value={inputs.gender}
                onChange={(e) => setInputs({ ...inputs, gender: e.target.value as 'male' | 'female' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                value={inputs.activityLevel}
                onChange={(e) => setInputs({ ...inputs, activityLevel: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Activity</option>
                <option value="moderate">Moderate Activity</option>
                <option value="active">Very Active</option>
                <option value="very-active">Extremely Active</option>
              </select>
            </div>

            <CalculatorInput
              label="Target Weight Loss"
              value={inputs.targetWeightLoss}
              onChange={(value) => setInputs({ ...inputs, targetWeightLoss: parseFloat(value) })}
              min={0}
            />

            <CalculatorInput
              label="Timeframe (weeks)"
              value={inputs.timeframe}
              onChange={(value) => setInputs({ ...inputs, timeframe: parseFloat(value) })}
              min={1}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calorie Targets</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Maintenance Calories"
                value={result.maintenanceCalories}
                helpText="Daily calories to maintain current weight"
              />
              
              <CalculatorResult
                label="Target Calories"
                value={result.targetCalories}
                helpText="Daily calories for your cutting goal"
              />

              <CalculatorResult
                label="Weekly Deficit"
                value={`${result.weeklyDeficit} calories`}
                helpText="Total weekly calorie deficit"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Macro Breakdown</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-900">Protein</div>
                <div className="text-2xl font-bold text-indigo-600 my-1">
                  {result.macroBreakdown.protein.grams}g
                </div>
                <div className="text-sm text-gray-600">
                  {result.macroBreakdown.protein.calories} calories
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-900">Carbs</div>
                <div className="text-2xl font-bold text-indigo-600 my-1">
                  {result.macroBreakdown.carbs.grams}g
                </div>
                <div className="text-sm text-gray-600">
                  {result.macroBreakdown.carbs.calories} calories
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-900">Fats</div>
                <div className="text-2xl font-bold text-indigo-600 my-1">
                  {result.macroBreakdown.fats.grams}g
                </div>
                <div className="text-sm text-gray-600">
                  {result.macroBreakdown.fats.calories} calories
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <CalculatorResult
                label="Weekly Loss"
                value={`${result.timeline.weeklyLoss} ${inputs.unit === 'metric' ? 'kg' : 'lbs'}`}
                helpText="Expected weight loss per week"
              />
              
              <CalculatorResult
                label="Total Weeks"
                value={result.timeline.totalWeeks}
                helpText="Weeks to reach target weight"
              />

              <CalculatorResult
                label="Target Date"
                value={result.timeline.targetDate.toLocaleDateString()}
                helpText="Estimated completion date"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Plan</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <CalculatorResult
                label="Meals Per Day"
                value={result.mealPlan.mealsPerDay}
                helpText="Recommended meal frequency"
              />
              
              <CalculatorResult
                label="Calories Per Meal"
                value={result.mealPlan.caloriesPerMeal}
                helpText="Target calories per meal"
              />

              <CalculatorResult
                label="Protein Per Meal"
                value={`${result.mealPlan.proteinPerMeal}g`}
                helpText="Target protein per meal"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{rec.category}</div>
                  <div className="text-gray-600 mt-1">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}