import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateMaintenanceCalories } from '../../utils/calculators/maintenanceCalorie/calculate';
import type { MaintenanceCalorieInput } from '../../utils/calculators/maintenanceCalorie/types';

export function MaintenanceCalorieCalculator() {
  const [inputs, setInputs] = useState<MaintenanceCalorieInput>({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    unit: 'metric',
    goal: 'maintain'
  });

  const result = calculateMaintenanceCalories(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Maintenance Calorie Calculator | Daily Caloric Needs"
        description="Calculate your maintenance calories and daily caloric needs based on your age, weight, height, and activity level. Get personalized macro recommendations."
        keywords={[
          'maintenance calories',
          'calorie calculator',
          'TDEE calculator',
          'daily caloric needs',
          'macro calculator'
        ]}
        canonicalUrl="/maintenance-calorie-calculator"
      />

      <CalculatorLayout
        title="Maintenance Calorie Calculator"
        description="Calculate your daily maintenance calories and get personalized macro recommendations."
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
                onChange={(e) => setInputs({ ...inputs, activityLevel: e.target.value as MaintenanceCalorieInput['activityLevel'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="very-active">Very Active (physical job/training)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal
              </label>
              <select
                value={inputs.goal}
                onChange={(e) => setInputs({ ...inputs, goal: e.target.value as MaintenanceCalorieInput['goal'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="maintain">Maintain Weight</option>
                <option value="lose">Lose Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calorie Summary</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="BMR (Basal Metabolic Rate)"
                value={`${result.bmr} calories/day`}
                helpText="Calories burned at complete rest"
              />
              <CalculatorResult
                label="Maintenance Calories"
                value={`${result.maintenanceCalories} calories/day`}
                helpText="Daily calories to maintain current weight"
              />
              {inputs.goal === 'lose' && (
                <CalculatorResult
                  label="Weight Loss Range"
                  value={`${result.goals.lose.min} - ${result.goals.lose.max} calories/day`}
                  helpText="Calorie range for weight loss"
                />
              )}
              {inputs.goal === 'gain' && (
                <CalculatorResult
                  label="Weight Gain Range"
                  value={`${result.goals.gain.min} - ${result.goals.gain.max} calories/day`}
                  helpText="Calorie range for weight gain"
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Macro Breakdown</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Protein"
                value={`${result.macroBreakdown.protein.min} - ${result.macroBreakdown.protein.max}g`}
                helpText="25-35% of total calories"
              />
              <CalculatorResult
                label="Carbohydrates"
                value={`${result.macroBreakdown.carbs.min} - ${result.macroBreakdown.carbs.max}g`}
                helpText="45-65% of total calories"
              />
              <CalculatorResult
                label="Fats"
                value={`${result.macroBreakdown.fats.min} - ${result.macroBreakdown.fats.max}g`}
                helpText="20-35% of total calories"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Planning</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Recommended Meals"
                value={`${result.mealPlan.meals} meals per day`}
                helpText="Optimal meal frequency"
              />
              <CalculatorResult
                label="Calories per Meal"
                value={`${result.mealPlan.caloriesPerMeal} calories`}
                helpText="Average calories per meal"
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