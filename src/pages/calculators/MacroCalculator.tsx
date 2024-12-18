import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateMacros } from '../../utils/calculators/macro/calculate';
import { Goal, ActivityLevel } from '../../utils/calculators/macro/types';
import { formatNumber } from '../../utils/format';

export function MacroCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [mealsPerDay, setMealsPerDay] = useState('4');

  const results = calculateMacros(
    parseFloat(weight) || 0,
    parseFloat(height) || 0,
    parseFloat(age) || 0,
    gender,
    activityLevel,
    goal,
    parseInt(mealsPerDay) || 4,
    unit
  );

  return (
    <CalculatorLayout
      title="Macro Calculator"
      description="Calculate your optimal macronutrient ratios based on your goals"
      icon={<Scale />}
    >
      <SEO
        title="Macro Calculator | Macronutrient Ratio Calculator"
        description="Calculate your optimal macronutrient ratios for protein, carbs, and fats. Free macro calculator with meal planning recommendations."
        keywords={[
          'macro calculator',
          'macronutrient calculator',
          'protein calculator',
          'carb calculator',
          'diet ratio calculator',
          'nutrition calculator'
        ]}
        canonicalUrl="/macro-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit System</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setUnit('metric')}
                className={`px-4 py-2 rounded-md ${
                  unit === 'metric'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-4 py-2 rounded-md ${
                  unit === 'imperial'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <div className="flex space-x-4">
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
            label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
            value={weight}
            onChange={setWeight}
            min={0}
            step={0.1}
            placeholder="Enter weight"
          />

          <CalculatorInput
            label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
            value={height}
            onChange={setHeight}
            min={0}
            step={0.1}
            placeholder="Enter height"
          />

          <CalculatorInput
            label="Age"
            value={age}
            onChange={setAge}
            min={0}
            max={120}
            step={1}
            placeholder="Enter age"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 times/week)</option>
              <option value="moderate">Moderate (exercise 3-5 times/week)</option>
              <option value="active">Active (exercise 6-7 times/week)</option>
              <option value="very-active">Very Active (hard exercise daily)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <div className="grid grid-cols-3 gap-2">
              {(['lose', 'maintain', 'gain'] as Goal[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`px-4 py-2 rounded-md ${
                    goal === g
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <CalculatorInput
            label="Meals per Day"
            value={mealsPerDay}
            onChange={setMealsPerDay}
            min={1}
            max={8}
            step={1}
            placeholder="Enter number of meals"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Macro Breakdown</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.calories)} calories
              </div>
              <div className="text-gray-500">Daily Target</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Daily Macros:</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-medium">{results.macros.protein.grams}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${results.macros.protein.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {results.macros.protein.calories} calories ({results.macros.protein.percentage}%)
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Carbohydrates</span>
                  <span className="font-medium">{results.macros.carbs.grams}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${results.macros.carbs.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {results.macros.carbs.calories} calories ({results.macros.carbs.percentage}%)
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Fats</span>
                  <span className="font-medium">{results.macros.fats.grams}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${results.macros.fats.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {results.macros.fats.calories} calories ({results.macros.fats.percentage}%)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Per Meal Breakdown:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Calories:</span>
                <span className="font-medium">{results.mealPlan.perMeal.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Protein:</span>
                <span className="font-medium">{results.mealPlan.perMeal.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carbs:</span>
                <span className="font-medium">{results.mealPlan.perMeal.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fats:</span>
                <span className="font-medium">{results.mealPlan.perMeal.fats}g</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Food Recommendations:</h3>
            <div className="space-y-4">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{rec.category}</div>
                  <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                  <div className="text-sm text-indigo-600 mt-1">{rec.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Macronutrients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Protein</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Essential for muscle growth</li>
                <li>• 4 calories per gram</li>
                <li>• Helps with satiety</li>
                <li>• Supports recovery</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Carbohydrates</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Primary energy source</li>
                <li>• 4 calories per gram</li>
                <li>• Fuels brain function</li>
                <li>• Spares protein</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Fats</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Hormone production</li>
                <li>• 9 calories per gram</li>
                <li>• Essential nutrients</li>
                <li>• Energy storage</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meal Planning Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Timing</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Space meals evenly</li>
                <li>• Pre/post workout nutrition</li>
                <li>• Consistent meal times</li>
                <li>• Night-time protein</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Preparation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Meal prep in advance</li>
                <li>• Measure portions</li>
                <li>• Track macros</li>
                <li>• Stay hydrated</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}